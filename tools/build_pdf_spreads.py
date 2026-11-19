#!/usr/bin/env python3
"""
Master Offline PDF Generator for Arawali Arts Corporate Catalogue (500 SKUs, 144 Pages).

Supports two print-grade editions from catalogue/arawali_arts_corporate_brochure.html:
  1. Magazine 2-Page Spread Edition (73 A3 landscape spreads, 420mm x 297mm, with book-spine shading)
  2. Single-Page Portrait Edition   (144 A4 portrait pages, 210mm x 297mm, ideal for mobile/WhatsApp/printing)

Usage:
  python3 tools/build_pdf_spreads.py                # Builds BOTH editions
  python3 tools/build_pdf_spreads.py --mode spreads # Builds 2-page magazine spreads only
  python3 tools/build_pdf_spreads.py --mode single  # Builds single-page portrait only
  python3 tools/build_pdf_spreads.py --check-only   # Validates extracted HTML without invoking Chrome
"""

import argparse
import os
import re
import shutil
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "catalogue", "arawali_arts_corporate_brochure.html")

TMP_SPREADS_HTML = os.path.join(ROOT, "catalogue", "_magazine_spreads_export.html")
TMP_SINGLE_HTML = os.path.join(ROOT, "catalogue", "_magazine_single_export.html")

OUT_SPREADS_DESKTOP = os.path.expanduser("~/Desktop/Arawali_Arts_Catalogue_2026_Magazine_Spreads.pdf")
OUT_SINGLE_DESKTOP = os.path.expanduser("~/Desktop/Arawali_Arts_Catalogue_2026_Single_Page.pdf")

OUT_SPREADS_CATALOG = os.path.join(ROOT, "catalogue", "arawali_arts_trade_catalog_2026_spreads.pdf")
OUT_SINGLE_CATALOG = os.path.join(ROOT, "catalogue", "arawali_arts_trade_catalog_2026_single.pdf")
OUT_PRIMARY_CATALOG = os.path.join(ROOT, "catalogue", "arawali_arts_trade_catalog_2026.pdf")

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def extract_head_and_pages(src_path):
    with open(src_path, "r", encoding="utf-8") as f:
        html = f.read()

    head_match = re.search(r"<head>(.*?)</head>", html, re.DOTALL)
    head_content = head_match.group(1) if head_match else ""

    parts = re.split(r"(<!-- ================= PAGE \d+: [^>]+ -->)", html)
    pages = []
    for i in range(1, 145):
        content = parts[2 * i]
        start = content.find('<div class="mag-page')
        if i < 144:
            pages.append(content[start:].strip())
        else:
            end = content.find("</div>\n      </div>\n    </main>")
            if end == -1:
                end = content.find("</div>\n    </main>")
            pages.append(content[start : end + 6].strip())

    assert len(pages) == 144, f"Expected 144 pages, found {len(pages)}"
    return head_content, pages


def build_spreads_html(head_content, pages):
    spread_css = """
    <style>
      @page { size: 420mm 297mm; margin: 0; }
      html, body {
        display: block !important;
        position: static !important;
        width: 420mm !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        background: #0E0B08 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .mag-top-nav, .mag-bottom-nav, #toc-drawer, .toc-backdrop, #mag-toast, #magazine-scroll-view { display: none !important; }
      #magazine-viewport, #magazine-stage, #flipbook-book {
        position: static !important;
        display: block !important;
        width: 420mm !important;
        height: auto !important;
        overflow: visible !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .mag-spread {
        width: 420mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        display: flex !important;
        flex-direction: row !important;
        break-after: page !important;
        page-break-after: always !important;
        overflow: hidden !important;
        background: #0E0B08 !important;
        position: relative !important;
      }
      .mag-spread:last-child { break-after: auto !important; page-break-after: auto !important; }
      .mag-spread .mag-page {
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        flex: 0 0 210mm !important;
        overflow: hidden !important;
        border: none !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        box-sizing: border-box !important;
        position: relative !important;
      }
      /* Subtle realistic magazine center-spine gutter shadow */
      .mag-spread .mag-page:first-child::after {
        content: "" !important;
        position: absolute !important;
        top: 0; right: 0; bottom: 0;
        width: 14mm !important;
        background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.06) 65%, rgba(0, 0, 0, 0.18) 100%) !important;
        pointer-events: none !important;
        z-index: 30 !important;
      }
      .mag-spread .mag-page:last-child::after {
        content: "" !important;
        position: absolute !important;
        top: 0; left: 0; bottom: 0;
        width: 14mm !important;
        background: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.06) 65%, rgba(0, 0, 0, 0.18) 100%) !important;
        pointer-events: none !important;
        z-index: 30 !important;
      }
      .mag-spread .mag-page:first-child .page-inner { padding: 14px 20px 14px 16px !important; }
      .mag-spread .mag-page:last-child .page-inner { padding: 14px 16px 14px 20px !important; }
      .mag-product-img { flex: 1 1 165px !important; min-height: 135px !important; max-height: 195px !important; height: auto !important; object-fit: cover !important; }
      .mag-product-desc { -webkit-line-clamp: 3 !important; }
      .mag-btn-add { display: none !important; }
    </style>
    """

    inside_front = """
    <div class="mag-page --hard page-cover-front" style="background:#0E0B08 !important; border: 1.5px solid rgba(184, 149, 82, 0.55) !important;">
      <div class="cover-container cover-editorial" style="background: radial-gradient(circle at center, #1C1611 0%, #0E0B08 100%) !important; justify-content: space-between; padding: 36px 32px !important;">
        <div class="cover-frame-border" aria-hidden="true"></div>
        <span class="cover-corner tl" aria-hidden="true"></span>
        <span class="cover-corner tr" aria-hidden="true"></span>
        <span class="cover-corner bl" aria-hidden="true"></span>
        <span class="cover-corner br" aria-hidden="true"></span>
        <div style="z-index: 3; text-align: center; width: 100%;">
          <div style="font-size: 0.62rem; letter-spacing: 0.24em; color: #DFC078; text-transform: uppercase;">Arawali Arts Jodhpur &bull; Estd. 2011</div>
          <div style="font-family: var(--font-cinzel); font-size: 0.95rem; color: #E8CFA0; letter-spacing: 0.14em; margin-top: 4px;">OFFICIAL EXPORT MONOGRAPH</div>
        </div>
        <div style="z-index: 3; text-align: center; max-width: 165mm; margin: 0 auto;">
          <div style="width: 52px; height: 52px; margin: 0 auto 16px;">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="#16120E" stroke="#DFC078" stroke-width="1.5"/>
              <path d="M20 8.5L10.5 30.5H14.8L16.8 25.4H23.2L25.2 30.5H29.5L20 8.5ZM18.1 21.8L20 16.5L21.9 21.8H18.1Z" fill="#DFC078"/>
              <path d="M12 33H28" stroke="#B89352" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </div>
          <div style="font-family: var(--font-cinzel); font-size: 1.35rem; letter-spacing: 0.16em; color: #FFFFFF; margin-bottom: 6px;">ARAWALI ARTS</div>
          <div style="font-size: 0.70rem; letter-spacing: 0.22em; color: #DFC078; text-transform: uppercase; margin-bottom: 20px;">Master Timber Seasoning &amp; Hand-Forged Wrought Iron</div>
          <div style="height: 1.5px; width: 64px; background: linear-gradient(90deg, transparent, #DFC078, transparent); margin: 0 auto 22px;"></div>
          <p style="font-size: 0.86rem; color: #E2D5C3; line-height: 1.75; font-family: var(--font-serif); font-style: italic; margin-bottom: 18px;">
            &ldquo;Bridging fifteen years of Thar Desert craftsmanship with stringent international export engineering. Every container factory-stuffed in Jodhpur and shipped direct via Mundra Port to retail chains, interior designers, and catalog brands across the Americas and Europe.&rdquo;
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: rgba(22, 17, 13, 0.85); border: 1px solid rgba(208, 173, 106, 0.35); border-radius: 6px; padding: 12px; margin-top: 18px;">
            <div>
              <div style="font-family: var(--font-cinzel); font-size: 1.05rem; color: #E8CFA0; font-weight: 700;">45,000</div>
              <div style="font-size: 0.52rem; letter-spacing: 0.14em; color: #AAA; text-transform: uppercase;">Sq. Ft. Facility</div>
            </div>
            <div>
              <div style="font-family: var(--font-cinzel); font-size: 1.05rem; color: #E8CFA0; font-weight: 700;">12 Kilns</div>
              <div style="font-size: 0.52rem; letter-spacing: 0.14em; color: #AAA; text-transform: uppercase;">Vacuum Moisture SLA</div>
            </div>
            <div>
              <div style="font-family: var(--font-cinzel); font-size: 1.05rem; color: #E8CFA0; font-weight: 700;">850+</div>
              <div style="font-size: 0.52rem; letter-spacing: 0.14em; color: #AAA; text-transform: uppercase;">FCL Containers Shipped</div>
            </div>
          </div>
        </div>
        <div style="z-index: 3; text-align: center; width: 100%; font-size: 0.58rem; letter-spacing: 0.16em; color: #9C8E7D; text-transform: uppercase;">
          Direct ICD Jodhpur to Port Mundra (INMUN1) &bull; Volume XV Export Catalogue
        </div>
      </div>
    </div>
    """

    inside_back = """
    <div class="mag-page --hard page-cover-back" style="background:#0E0B08 !important; border: 1.5px solid rgba(184, 149, 82, 0.55) !important;">
      <div class="cover-container cover-editorial" style="background: radial-gradient(circle at center, #1C1611 0%, #0E0B08 100%) !important; justify-content: space-between; padding: 36px 32px !important;">
        <div class="cover-frame-border" aria-hidden="true"></div>
        <span class="cover-corner tl" aria-hidden="true"></span>
        <span class="cover-corner tr" aria-hidden="true"></span>
        <span class="cover-corner bl" aria-hidden="true"></span>
        <span class="cover-corner br" aria-hidden="true"></span>
        <div style="z-index: 3; text-align: center; width: 100%;">
          <div style="font-size: 0.62rem; letter-spacing: 0.24em; color: #DFC078; text-transform: uppercase;">Global Trade Logistics &bull; Incoterms 2020</div>
          <div style="font-family: var(--font-cinzel); font-size: 0.95rem; color: #E8CFA0; letter-spacing: 0.14em; margin-top: 4px;">OCEAN FREIGHT SHIPPING CORRIDORS</div>
        </div>
        <div style="z-index: 3; text-align: center; max-width: 165mm; margin: 0 auto; width: 100%;">
          <div style="font-family: var(--font-cinzel); font-size: 1.25rem; letter-spacing: 0.14em; color: #FFFFFF; margin-bottom: 8px;">DIRECT CONTAINER CONSOLIDATIONS</div>
          <p style="font-size: 0.80rem; color: #CCC; line-height: 1.6; margin-bottom: 18px;">
            Factory-stuffed 20ft FCL and 40ft High Cube containers depart ICD Bhagat Ki Kothi (Jodhpur) via dedicated bonded rail corridor directly to Port Mundra berths.
          </p>
          <div style="background: rgba(22, 17, 13, 0.85); border: 1px solid rgba(208, 173, 106, 0.35); border-radius: 6px; padding: 14px; text-align: left; margin-bottom: 18px;">
            <div style="font-size: 0.68rem; font-weight: 700; color: #DFC078; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;">Key Export Gateways &amp; Typical Transit Times</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.74rem; color: #DDD;">
              <div>&bull; <strong>US East Coast (Newark / Savannah):</strong> 26&ndash;30 Days</div>
              <div>&bull; <strong>US West Coast (Long Beach):</strong> 32&ndash;36 Days</div>
              <div>&bull; <strong>UK (Felixstowe / Southampton):</strong> 22&ndash;26 Days</div>
              <div>&bull; <strong>EU (Rotterdam / Hamburg):</strong> 24&ndash;28 Days</div>
            </div>
          </div>
          <div style="font-size: 0.76rem; color: #E8D8B0; font-family: var(--font-serif); font-style: italic;">
            All shipments export with Phytosanitary ISPM-15, VRIKSH Legality Certificate, Form A / COO, and Lacey Act PPQ 505 / EUDR dossiers.
          </div>
        </div>
        <div style="z-index: 3; text-align: center; width: 100%; font-size: 0.58rem; letter-spacing: 0.16em; color: #9C8E7D; text-transform: uppercase;">
          &copy; 2026 Arawali Arts &bull; Jodhpur, Rajasthan, India &bull; export@arawaliarts.com
        </div>
      </div>
    </div>
    """

    spreads = [f'<div class="mag-spread">{inside_front}{pages[0]}</div>']
    for p in range(1, 143, 2):
        spreads.append(f'<div class="mag-spread">{pages[p]}{pages[p+1]}</div>')
    spreads.append(f'<div class="mag-spread">{pages[143]}{inside_back}</div>')
    assert len(spreads) == 73, f"Expected 73 spreads, got {len(spreads)}"

    return f"<!DOCTYPE html><html lang='en'><head>{head_content}{spread_css}</head><body>{''.join(spreads)}</body></html>"


def build_single_html(head_content, pages):
    single_css = """
    <style>
      @page { size: 210mm 297mm; margin: 0; }
      html, body {
        display: block !important;
        position: static !important;
        width: 210mm !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        background: #0E0B08 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .mag-top-nav, .mag-bottom-nav, #toc-drawer, .toc-backdrop, #mag-toast, #magazine-scroll-view { display: none !important; }
      .mag-page {
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        break-after: page !important;
        page-break-after: always !important;
        overflow: hidden !important;
        border: none !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        box-sizing: border-box !important;
        position: relative !important;
      }
      .mag-page:last-child { break-after: auto !important; page-break-after: auto !important; }
      .mag-product-img { flex: 1 1 165px !important; min-height: 135px !important; max-height: 195px !important; height: auto !important; object-fit: cover !important; }
      .mag-product-desc { -webkit-line-clamp: 3 !important; }
      .mag-btn-add { display: none !important; }
    </style>
    """
    return f"<!DOCTYPE html><html lang='en'><head>{head_content}{single_css}</head><body>{''.join(pages)}</body></html>"


def render_pdf(html_str, tmp_path, out_desktop, out_catalog, copy_primary=False):
    with open(tmp_path, "w", encoding="utf-8") as f:
        f.write(html_str)
    try:
        subprocess.run(
            [
                CHROME_BIN,
                "--headless=new",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--print-to-pdf={out_desktop}",
                f"file://{tmp_path}",
            ],
            check=True,
        )
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

    shutil.copy2(out_desktop, out_catalog)
    if copy_primary:
        shutil.copy2(out_desktop, OUT_PRIMARY_CATALOG)


def main():
    parser = argparse.ArgumentParser(description="Build Arawali Arts offline PDF editions.")
    parser.add_argument("--mode", choices=["both", "spreads", "single"], default="both")
    parser.add_argument("--check-only", action="store_true")
    args = parser.parse_args()

    head_content, pages = extract_head_and_pages(SRC)
    print(f"Extracted {len(pages)} pages from {os.path.relpath(SRC, ROOT)}")

    if args.mode in ("both", "spreads"):
        spreads_html = build_spreads_html(head_content, pages)
        if args.check_only:
            print(f"[check-only] Spreads HTML ready: {len(spreads_html):,} bytes (73 spreads)")
        else:
            print("Rendering 2-Page Magazine Spread PDF (73 A3 landscape spreads)...")
            render_pdf(spreads_html, TMP_SPREADS_HTML, OUT_SPREADS_DESKTOP, OUT_SPREADS_CATALOG, copy_primary=True)
            print("  Saved:", OUT_SPREADS_DESKTOP)
            print("  Saved:", OUT_SPREADS_CATALOG)

    if args.mode in ("both", "single"):
        single_html = build_single_html(head_content, pages)
        if args.check_only:
            print(f"[check-only] Single-Page HTML ready: {len(single_html):,} bytes (144 pages)")
        else:
            print("Rendering Single-Page Portrait PDF (144 A4 portrait pages)...")
            render_pdf(single_html, TMP_SINGLE_HTML, OUT_SINGLE_DESKTOP, OUT_SINGLE_CATALOG, copy_primary=(args.mode == "single"))
            print("  Saved:", OUT_SINGLE_DESKTOP)
            print("  Saved:", OUT_SINGLE_CATALOG)


if __name__ == "__main__":
    main()
