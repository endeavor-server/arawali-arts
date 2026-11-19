#!/usr/bin/env python3
"""
Arawali Arts lead + analytics service.

Endpoints (same origin, proxied by nginx under /api/):
  POST /api/lead   -> store an RFQ / trade application / sample request
  POST /api/pv     -> first-party pageview counter (no cookies, no IP stored)
  GET  /api/health -> liveness
  GET  /api/leads  -> last 200 leads (requires X-Admin-Token)

Storage: /data/leads.jsonl and /data/pv-YYYY-MM-DD.log
Stdlib only. No third-party calls except an optional ntfy push.
"""
import json
import os
import re
import sys
import time
import uuid
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse
from urllib.request import Request, urlopen

DATA = os.environ.get("DATA_DIR", "/data")
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")
NTFY_URL = os.environ.get("NTFY_URL", "")       # e.g. https://ntfy.example.com/arawali-leads
SITE = "arawali.endeavoracademy.us"
MAX_BODY = 64 * 1024

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$")
IP_HITS = {}
LOCK = threading.Lock()


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def append_jsonl(name, row):
    os.makedirs(DATA, exist_ok=True)
    with LOCK:
        with open(os.path.join(DATA, name), "a", encoding="utf-8") as fh:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")


def rate_limited(ip, bucket, limit, window=3600):
    key = (bucket, ip)
    current = time.time()
    with LOCK:
        hits = [t for t in IP_HITS.get(key, []) if current - t < window]
        if len(hits) >= limit:
            IP_HITS[key] = hits
            return True
        hits.append(current)
        IP_HITS[key] = hits
    return False


def notify(row):
    if not NTFY_URL:
        return
    title = f"New {row.get('type', 'lead')} — {row.get('company') or row.get('name') or 'website'}"
    body = f"{row.get('name', '')} <{row.get('email', '')}>\n{row.get('country', '')}\n{row.get('message', '')[:400]}"
    try:
        req = Request(NTFY_URL, data=body.encode("utf-8"), method="POST",
                      headers={"Title": title.encode("ascii", "ignore").decode() or "Arawali lead",
                               "Tags": "inbox_tray", "Priority": "default"})
        urlopen(req, timeout=4).read()
    except Exception as exc:  # notification must never block a lead
        print("ntfy failed:", exc, file=sys.stderr)


class Handler(BaseHTTPRequestHandler):
    server_version = "arawali"
    sys_version = ""

    def log_message(self, fmt, *args):
        print("%s %s" % (self.address_string(), fmt % args), file=sys.stderr)

    def _send(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(body)

    def _body(self):
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > MAX_BODY:
            return None
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except Exception:
            return None

    def _client_ip(self):
        fwd = self.headers.get("X-Forwarded-For", "")
        return fwd.split(",")[0].strip() or self.client_address[0]

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Allow", "POST, GET, OPTIONS")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        route = urlparse(self.path).path
        if route == "/api/health":
            return self._send(200, {"ok": True, "service": "arawali-lead-api", "time": now()})
        if route == "/api/leads":
            token = self.headers.get("X-Admin-Token", "")
            if not ADMIN_TOKEN or token != ADMIN_TOKEN:
                return self._send(403, {"ok": False, "error": "forbidden"})
            try:
                with open(os.path.join(DATA, "leads.jsonl"), encoding="utf-8") as fh:
                    rows = [json.loads(line) for line in fh if line.strip()]
            except FileNotFoundError:
                rows = []
            return self._send(200, {"ok": True, "count": len(rows), "leads": rows[-200:]})
        return self._send(404, {"ok": False, "error": "not found"})

    def do_POST(self):
        route = urlparse(self.path).path

        if route == "/api/pv":
            payload = self._body()
            if payload is None:
                return self._send(204, {})
            path = str(payload.get("p", ""))[:300]
            ref = str(payload.get("r", ""))[:300]
            if path.startswith("/") and rate_limited(self._client_ip(), "pv", 2000):
                return self._send(204, {})
            append_jsonl(f"pv-{datetime.now(timezone.utc):%Y-%m-%d}.log", {"t": now(), "p": path, "r": ref})
            return self._send(204, {})

        if route == "/api/lead":
            if rate_limited(self._client_ip(), "lead", 12):
                return self._send(429, {"ok": False, "error": "Too many requests. Email export@arawaliarts.com directly."})
            payload = self._body()
            if payload is None:
                return self._send(400, {"ok": False, "error": "Malformed request."})

            kind = str(payload.get("type", "rfq"))[:40]
            name = str(payload.get("name", "")).strip()[:120]
            company = str(payload.get("company", "")).strip()[:160]
            email = str(payload.get("email", "")).strip()[:160]
            message = str(payload.get("message", "")).strip()[:4000]
            country = str(payload.get("country", "")).strip()[:80]
            phone = str(payload.get("phone", "")).strip()[:60]
            items = payload.get("items") if isinstance(payload.get("items"), list) else []

            errors = []
            if len(name) < 2:
                errors.append("name")
            if kind != "sample" and len(company) < 2:
                errors.append("company")
            if not EMAIL_RE.match(email):
                errors.append("email")
            if errors:
                return self._send(422, {"ok": False, "error": "Please complete the required fields.", "fields": errors})

            # Strip control characters and cap item payloads.
            clean_items = []
            for it in items[:200]:
                if not isinstance(it, dict):
                    continue
                clean_items.append({
                    "sku": str(it.get("sku", ""))[:32],
                    "title": str(it.get("title", ""))[:140],
                    "qty": int(it.get("qty") or 0),
                    "cbm": float(it.get("cbm") or 0),
                })

            row = {
                "id": uuid.uuid4().hex[:12],
                "t": now(),
                "type": kind,
                "name": name,
                "company": company,
                "email": email,
                "country": country,
                "phone": phone,
                "message": message,
                "items": clean_items,
                "page": str(payload.get("page", ""))[:300],
                "referrer": str(payload.get("referrer", ""))[:300],
                "ua": self.headers.get("User-Agent", "")[:300],
            }
            append_jsonl("leads.jsonl", row)
            threading.Thread(target=notify, args=(row,), daemon=True).start()
            return self._send(200, {"ok": True, "id": row["id"], "message": "Received. Our export desk replies within one business day."})

        return self._send(404, {"ok": False, "error": "not found"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8080"))
    print(f"arawali lead api on :{port}, data={DATA}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
