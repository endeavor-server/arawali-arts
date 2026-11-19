#!/usr/bin/env node
/** Validate every local link, asset and same-page anchor across the site. */
const fs = require('fs');
const path = require('path');

const WEB = path.resolve(__dirname, '..', 'website');
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.html')) files.push(p);
  }
})(WEB);

const missing = new Map();
const badHash = [];
let checked = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  // Strip <script> blocks so JS template literals like src="${item.Image}" are not treated as static file paths
  const cleanHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  for (const m of cleanHtml.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let url = m[1].trim();
    if (!url || /^(https?:|mailto:|tel:|data:|javascript:)/.test(url)) continue;
    checked++;

    const [rawPath, hash] = url.split('#');
    const [filePath] = rawPath.split('?');

    if (!filePath) {
      if (hash && !ids.has(hash)) badHash.push(`${path.relative(WEB, file)} -> #${hash}`);
      continue;
    }

    const target = path.resolve(path.dirname(file), filePath);
    if (!fs.existsSync(target)) {
      if (!missing.has(url)) missing.set(url, []);
      missing.get(url).push(path.relative(WEB, file));
      continue;
    }

    if (hash && target.endsWith('.html')) {
      const targetHtml = fs.readFileSync(target, 'utf8');
      const targetIds = new Set([...targetHtml.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
      if (!targetIds.has(hash)) {
        badHash.push(`${path.relative(WEB, file)} -> ${url}`);
      }
    }
  }
}

console.log(JSON.stringify({
  pages: files.length,
  linksChecked: checked,
  missingTargets: missing.size,
  missing: [...missing].slice(0, 20),
  brokenAnchors: badHash.length,
  anchors: badHash.slice(0, 20)
}, null, 2));

process.exit(missing.size || badHash.length ? 1 : 0);
