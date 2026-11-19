#!/usr/bin/env node
/**
 * Master 500-SKU Corporate Brochure Builder
 * Generates catalogue/arawali_arts_corporate_brochure.html
 * 144 pages (72 spreads), 8 manufacturing divisions, 50 categories, all 500 products with dedicated studio imagery.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'website', 'products_500.json');
const BROCHURE_FILE = path.join(ROOT, 'catalogue', 'arawali_arts_corporate_brochure.html');
const APP_JS_FILE = path.join(ROOT, 'website', 'app.js');

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanCategoryTitle(catName) {
  return catName.replace(/^Cat\s*\d+:\s*/i, '').trim();
}

function main() {
  console.log('Building 500-SKU Corporate Brochure...');
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const appJs = fs.readFileSync(APP_JS_FILE, 'utf8');
  const match = appJs.match(/window\.EXPORT_DIVISIONS_DATA\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error('Could not find EXPORT_DIVISIONS_DATA in app.js');
  const divisions = eval(match[1]);

  const existingHtml = fs.readFileSync(BROCHURE_FILE, 'utf8');

  // Extract CSS / Head before <div id="flipbook-book">
  const bookStartIdx = existingHtml.indexOf('<div id="flipbook-book">');
  if (bookStartIdx === -1) throw new Error('Could not find #flipbook-book in existing brochure');
  let headerHtml = existingHtml.slice(0, bookStartIdx + '<div id="flipbook-book">'.length);

  // Update total pages indicator in headerHtml if present
  headerHtml = headerHtml.replace(/Page <strong id="lblCurrentPage">1<\/strong> \/ <span id="lblTotalPages">\d+<\/span>/, 'Page <strong id="lblCurrentPage">1</strong> / <span id="lblTotalPages">144</span>');
  headerHtml = headerHtml.replace(/Page <strong id="lblScrollCurrentPage">1<\/strong> \/ <span id="lblScrollTotalPages">\d+<\/span>/, 'Page <strong id="lblScrollCurrentPage">1</strong> / <span id="lblScrollTotalPages">144</span>');

  // Extract from </aside> to the end (Footer scripts)
  const asideCloseIdx = existingHtml.indexOf('</aside>');
  if (asideCloseIdx === -1) throw new Error('Could not find </aside> in existing brochure');
  let footerHtml = existingHtml.slice(asideCloseIdx);

  // Group products by category
  const prodByCat = {};
  products.forEach(p => {
    if (!prodByCat[p.Category]) prodByCat[p.Category] = [];
    prodByCat[p.Category].push(p);
  });

  // Division Hero Images & Specs
  const divisionMetadata = [
    {
      num: 'I',
      hero: '../assets/hero_live_edge_table.jpg',
      tag: 'Master Division I • 50 Export SKUs',
      title: 'Living & Dining<br>Furniture Collections',
      desc: 'Architectural live-edge dining slabs, solid Sheesham trestles, occasional tables, hospitality benches, and bar seating engineered with traditional mortise-and-tenon joinery.',
      specs: ['🪵 Kiln Seasoned Sheesham', '⚖ Mortise & Tenon', '🚢 Mundra Direct']
    },
    {
      num: 'II',
      hero: '../assets/hero_jaali_sideboard.jpg',
      tag: 'Master Division II • 70 Export SKUs',
      title: 'Case Goods &<br>Storage Buffets',
      desc: 'Moorish jaali sideboards, media credenzas, slatted bookcases, entryway utility benches, and heavy-gauge industrial carts engineered for North American and European wholesale programs.',
      specs: ['🚪 Hand-Pierced Iron Jaali', '📐 ISTA-1A Drop Tested', '📦 Flat-Pack & Assembled']
    },
    {
      num: 'III',
      hero: '../assets/charcuterie_board_deluxe.jpg',
      tag: 'Master Division III • 70 Export SKUs',
      title: 'Kitchen, Tabletop<br>& Entertaining',
      desc: 'Live-edge acacia charcuterie boards, end-grain butcher blocks, marble & brass barware, wine racks, and artisan tabletop accents sealed with food-grade organic mineral wax.',
      specs: ['🌿 Food-Safe Mineral Wax', '✨ Solid Brass Inlays', '🍽 Hospitality Certified']
    },
    {
      num: 'IV',
      hero: '../assets/hero_jharokha_mirror.jpg',
      tag: 'Master Division IV • 60 Export SKUs',
      title: 'Architectural Wall<br>Decor & Mirrors',
      desc: 'Cathedral Jharokha arched mirrors, hand-forged jaali wall grilles, hardwood gallery frames, antique reproduction brackets, and kinetic timepieces celebrating Jodhpur craftsmanship.',
      specs: ['🪞 Distortion-Free Float Glass', '🔨 Hand-Forged Wrought Iron', '🏛 Mughal Heritage']
    },
    {
      num: 'V',
      hero: '../assets/pierced_iron_lantern_moroccan.jpg',
      tag: 'Master Division V • 50 Export SKUs',
      title: 'Decorative Lighting<br>& Hearthcraft',
      desc: 'Pierced Moroccan iron lanterns, draped wood bead chandeliers, fireplace tool sets, firewood hearth hoppers, and artisanal candelabras engineered for atmospheric residential and hospitality spaces.',
      specs: ['💡 UL / CE Component Ready', '🔥 Fireplace Heat-Resistant', '🕯 Hand-Chiseled Detailing']
    },
    {
      num: 'VI',
      hero: '../assets/iron_garden_trellis_arbor.jpg',
      tag: 'Master Division VI • 60 Export SKUs',
      title: 'Garden, Patio &<br>Outdoor Living',
      desc: 'Architectural garden arbors, French diamond trellises, bistro patio seating, bioethanol fire bowls, and botanical iron planter towers treated with electrostatic anti-rust coatings.',
      specs: ['🌧 UV & Rust Powder-Coated', '🪴 Kiln-Dried Teak & Iron', '🏡 Landscape Architecture']
    },
    {
      num: 'VII',
      hero: '../assets/hero_jodhpur_workshop.jpg',
      tag: 'Master Division VII • 60 Export SKUs',
      title: 'Home Office,<br>Keepsakes & Vanity',
      desc: 'Ergonomic hardwood monitor risers, brass-inlaid locking keepsake caskets, luxury valet trays, desktop file sorters, and artisan hardware for high-end retail gift and executive programs.',
      specs: ['💼 Executive Workspaces', '🔒 Velvet-Lined Keepsakes', '✒ Artisanal Joinery']
    },
    {
      num: 'VIII',
      hero: '../assets/hardwood_chess_board.jpg',
      tag: 'Master Division VIII • 80 Export SKUs',
      title: 'Kids, Pets, Leisure<br>& Sacred Heritage',
      desc: 'Montessori wooden balance boards & activity desks, luxury elevated pet diners, handcrafted tournament chess sets, and sacred heritage art crafted from sustainably harvested timber.',
      specs: ['👶 Non-Toxic Water-Based Finishes', '🐾 Solid Hardwood Pet Craft', '♟ Tournament Precision']
    }
  ];

  // Build Pages Array
  const pagesHtml = [];
  let currentPage = 1;

  // 1. PAGE 1: Hardcover Front Cover
  pagesHtml.push(`
        <!-- ================= PAGE 01: FRONT HARDCOVER ================= -->
        <div class="mag-page --hard page-cover-front" data-density="hard">
          <div class="cover-container cover-editorial">
            <div class="cover-frame-border" aria-hidden="true"></div>
            <span class="cover-corner tl" aria-hidden="true"></span>
            <span class="cover-corner tr" aria-hidden="true"></span>
            <span class="cover-corner bl" aria-hidden="true"></span>
            <span class="cover-corner br" aria-hidden="true"></span>

            <div class="cover-inner-stack">
              <div class="cover-masthead">
                <div class="cover-crest-emblem" aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="#16120E" stroke="#DFC078" stroke-width="1.5"/>
                    <path d="M20 8.5L10.5 30.5H14.8L16.8 25.4H23.2L25.2 30.5H29.5L20 8.5ZM18.1 21.8L20 16.5L21.9 21.8H18.1Z" fill="#DFC078"/>
                    <path d="M12 33H28" stroke="#B89352" stroke-width="1.3" stroke-linecap="round"/>
                  </svg>
                </div>
                <span class="cover-badge">ESTABLISHED 2011 &bull; JODHPUR GUILD</span>
                <h1 class="cover-title">ARAWALI ARTS</h1>
                <div class="cover-gold-rule"></div>
                <div class="cover-subtitle">Solid Hardwood &amp; Architectural Ironcraft</div>
              </div>

              <div class="cover-showcase-wrap">
                <div class="cover-triptych" aria-label="Featured Manufacturing Divisions">
                  <div class="cover-triptych-card" style="background-image: url('../assets/hero_live_edge_table.jpg');">
                    <span class="cover-triptych-label">Live-Edge Timber</span>
                  </div>
                  <div class="cover-triptych-card" style="background-image: url('../assets/hero_jaali_sideboard.jpg');">
                    <span class="cover-triptych-label">Jaali Ironcraft</span>
                  </div>
                  <div class="cover-triptych-card" style="background-image: url('../assets/hero_jharokha_mirror.jpg');">
                    <span class="cover-triptych-label">Jharokha Arch</span>
                  </div>
                </div>

                <div class="cover-edition-box">
                  <div class="cover-edition-kicker">Master Export Catalogue &bull; Volume XV</div>
                  <div class="cover-edition-year">2026 / 2027 EDITION</div>
                </div>

                <div class="cover-metrics-bar">
                  <div class="cover-metric-cell">
                    <span class="cover-metric-num">500</span>
                    <span class="cover-metric-lbl">Master SKUs</span>
                  </div>
                  <div class="cover-metric-cell">
                    <span class="cover-metric-num">8</span>
                    <span class="cover-metric-lbl">Divisions</span>
                  </div>
                  <div class="cover-metric-cell">
                    <span class="cover-metric-num">8–10%</span>
                    <span class="cover-metric-lbl">Kiln EMC SLA</span>
                  </div>
                </div>
              </div>

              <div class="cover-footer">
                <div><strong>FOB Mundra (INMUN1)</strong> &bull; ICD Jodhpur Direct Consolidations</div>
                <div>VRIKSH V-01 &bull; US Lacey Act PPQ 505 &bull; EUDR 2023 Compliant</div>
              </div>
            </div>
          </div>
        </div>`);
  currentPage++;

  // 2. PAGE 2: Welcome / Founder Letter
  pagesHtml.push(`
        <!-- ================= PAGE 02: DIRECTOR'S WELCOME & EXECUTIVE STATEMENT ================= -->
        <div class="mag-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Arawali Arts Jodhpur</span>
              <strong>Export Director Letter</strong>
            </div>

            <span class="mag-subhead">Executive Foreword</span>
            <h2 class="mag-headline" style="font-size: 1.35rem; margin-bottom: 12px;">Fifteen Years of Precision Woodcraft &amp; Global Export Governance</h2>

            <div style="display: flex; gap: 16px; margin-bottom: 12px; align-items: flex-start;">
              <div style="flex: 1; font-size: 0.78rem; color: #4B4136; line-height: 1.6;">
                <p style="margin-bottom: 8px;">
                  Founded in 2011 in the historic manufacturing heart of Jodhpur, Rajasthan, <strong>Arawali Arts</strong> bridges traditional Thar Desert artisanship with rigorous international export engineering. Over the past fifteen years, our workshops have shipped over 850 ocean freight containers to premier furniture importers, retail chains, and catalog brands across the United States, United Kingdom, and European Union.
                </p>
                <p>
                  This Volume XV Master Export Catalogue represents our complete manufacturing repertoire: <strong>500 active export SKUs across 8 production divisions</strong>. Every piece in this volume is engineered for direct 20ft FCL and 40ft HQ container loading from Mundra Port.
                </p>
              </div>
              <div style="width: 110px; flex-shrink: 0; background: #FAF8F5; border: 1px solid #E2D9CC; border-radius: 6px; padding: 10px; text-align: center;">
                <div style="font-family: var(--font-cinzel); font-size: 1.4rem; font-weight: 700; color: var(--accent-gold);">500</div>
                <div style="font-size: 0.68rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">Export SKUs</div>
                <div style="margin: 8px 0; border-top: 1px dashed #DDD;"></div>
                <div style="font-family: var(--font-cinzel); font-size: 1.2rem; font-weight: 700; color: var(--primary);">8–10%</div>
                <div style="font-size: 0.65rem; color: #665A4E;">Kiln Moisture</div>
              </div>
            </div>

            <div style="background: #FAF8F5; border-left: 3px solid var(--accent-gold); padding: 10px 14px; border-radius: 4px; font-size: 0.76rem; color: #5C5044; line-height: 1.6; margin-bottom: 14px;">
              <strong>Export Quality SLA:</strong> Every timber component is kiln-seasoned to an 8%–10% equilibrium moisture content to eliminate checking and warping across North American and European indoor heating cycles. All shipments carry full VRIKSH legality certifications and comply strictly with the US Lacey Act and EUDR deforestation mandates.
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto; padding-top: 8px; border-top: 1px solid #E8E2D8;">
              <div>
                <div style="font-family: var(--font-serif); font-size: 1rem; font-weight: 700; color: var(--primary);">Nikhil Saini</div>
                <div style="font-size: 0.72rem; color: #7A6F62;">Director of International Export Operations</div>
              </div>
              <div style="text-align: right; font-size: 0.72rem; color: #7A6F62;">
                Jodhpur, Rajasthan • Mundra Port Direct
              </div>
            </div>

            <div class="spread-footer">
              <span class="spread-page-num">02</span>
              <span>Executive Welcome</span>
            </div>
          </div>
        </div>`);
  currentPage++;

  // Record Chapter Navigation
  const chapterNav = [
    { page: 1, title: 'Cover / Master Dossier' },
    { page: 2, title: "Director's Welcome & Letter" },
    { page: 3, title: 'Table of Contents (500 SKUs)' }
  ];

  // We will build TOC Page HTML after we calculate division start pages!
  const divisionPagesHtml = [];
  const divisionPageRanges = [];

  divisions.forEach((div, dIdx) => {
    const meta = divisionMetadata[dIdx];
    const divStartPage = currentPage + 1; // +1 because TOC is page 3
    chapterNav.push({
      page: divStartPage,
      title: `Division ${meta.num}: ${div.name}`
    });

    // 1. Division Chapter Splash Page
    let splashHtml = `
        <!-- ================= PAGE ${String(divStartPage).padStart(2, '0')}: DIVISION ${meta.num} CHAPTER SPLASH ================= -->
        <div class="mag-page page-chapter-splash">
          <div class="chapter-splash" style="background-image: url('${meta.hero}');">
            <div class="chapter-splash-overlay"></div>
            <div class="chapter-splash-content">
              <span class="chapter-tag">${meta.tag}</span>
              <h2 class="chapter-title">${meta.title}</h2>
              <p class="chapter-desc">
                ${meta.desc}
              </p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                ${meta.specs.map(s => `<span class="spec-badge">${s}</span>`).join('')}
              </div>
            </div>
            <div class="spread-footer">
              <span style="color: #DDD;">Arawali Arts Jodhpur</span>
              <span class="spread-page-num" style="color: #FFF;">${String(divStartPage).padStart(2, '0')}</span>
            </div>
          </div>
        </div>`;
    divisionPagesHtml.push(splashHtml);
    currentPage++;

    // Collect all products for this division
    const divProducts = [];
    div.categories.forEach(cat => {
      const prods = prodByCat[cat.name] || [];
      divProducts.push(...prods);
    });

    // Chunk into pages of 4 products
    const productPages = [];
    for (let i = 0; i < divProducts.length; i += 4) {
      productPages.push(divProducts.slice(i, i + 4));
    }

    productPages.forEach((chunk, pIdx) => {
      const pageNum = currentPage + 1;
      // Derive category header label
      const distinctCats = Array.from(new Set(chunk.map(c => cleanCategoryTitle(c.Category))));
      const catHeader = distinctCats.length === 1 ? distinctCats[0] : `${distinctCats[0]} &amp; More`;

      let cardsHtml = chunk.map(p => {
        const cleanSku = p.SKU.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const imgPath = p.Image ? p.Image : `../assets/sku_${cleanSku}.jpg`;
        const shortName = p.Product_Name.length > 32 ? p.Product_Name.slice(0, 32) : p.Product_Name;

        return `
              <!-- Item ${escapeHtml(p.SKU)} -->
              <div class="mag-product-card">
                <div class="mag-product-img" style="background-image: url('${imgPath}');">
                  <span class="mag-sku-badge">${escapeHtml(p.SKU)}</span>
                </div>
                <div class="mag-product-title">${escapeHtml(p.Product_Name)}</div>
                <div class="mag-product-meta">${escapeHtml(p.Dimensions)} • ${escapeHtml(p.CBM)} CBM</div>
                <div class="mag-product-material">${escapeHtml(p.Material_Construction)}</div>
                <div class="mag-product-desc">${escapeHtml(p.Description)}</div>
                <div class="mag-product-tags"><span class="mag-spec-chip">MOQ: ${escapeHtml(p.MOQ || '15 Pcs')}</span><span class="mag-spec-chip">${escapeHtml(p.Style_Trend)}</span><span class="mag-spec-chip">Retail: ${escapeHtml(p.Western_Retail_USD)}</span></div>
                <div class="mag-product-pricing">
                  <span class="mag-fob-price">${escapeHtml(p.FOB_Mundra_USD)} FOB</span>
                  <button type="button" class="mag-btn-add" data-sku="${escapeHtml(p.SKU)}" data-name="${escapeHtml(shortName)}" data-cbm="${escapeHtml(p.CBM)}">+ Add RFQ</button>
                </div>
              </div>`;
      }).join('\n');

      let pageHtml = `
        <!-- ================= PAGE ${String(pageNum).padStart(2, '0')}: DIVISION ${meta.num}: ${escapeHtml(div.name)} ================= -->
        <div class="mag-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Division ${meta.num}: ${escapeHtml(div.name)}</span>
              <strong>${catHeader}</strong>
            </div>

            <div class="mag-product-grid">
${cardsHtml}
            </div>

            <div class="spread-footer">
              <span class="spread-page-num">${String(pageNum).padStart(2, '0')}</span>
              <span>${catHeader}</span>
            </div>
          </div>
        </div>`;
      divisionPagesHtml.push(pageHtml);
      currentPage++;
    });

    const divEndPage = currentPage;
    divisionPageRanges.push({
      division: div.name,
      num: meta.num,
      start: divStartPage,
      end: divEndPage,
      skuCount: `${divProducts.length} SKUs`
    });
  });

  // Appendix Chapters
  const appendixStart = currentPage + 1;
  chapterNav.push(
    { page: appendixStart, title: 'Regulatory: Lacey Act & EUDR' },
    { page: appendixStart + 1, title: 'Logistics: Container CBM & Matrix' },
    { page: appendixStart + 2, title: 'Commercial: Wholesale Terms & Tiers' },
    { page: appendixStart + 3, title: 'Manufactory: Jodhpur Factory & CNC' },
    { page: appendixStart + 4, title: 'Quality: Inspection & Global Desk' },
    { page: appendixStart + 5, title: 'Back Cover: Port Inquiries Desk' }
  );

  // 3. PAGE 3: Table of Contents (now that page ranges are computed!)
  const tocItemsHtml = divisionPageRanges.map((r, idx) => `
              <div class="mag-page-toc-item" onclick="jumpToPage(${r.start})" title="Jump to Division ${r.num}">
                <div class="mag-page-toc-row">
                  <span class="mag-page-toc-title">0${idx + 1}. Division ${r.num}: ${escapeHtml(r.division)} (${r.skuCount})</span>
                  <span class="mag-page-toc-page">Page ${String(r.start).padStart(2, '0')}–${String(r.end).padStart(2, '0')}</span>
                </div>
                <div class="mag-page-toc-sub">${escapeHtml(divisions[idx].tagline || divisions[idx].description.slice(0, 75))}</div>
              </div>`).join('\n');

  const page3Html = `
        <!-- ================= PAGE 03: TABLE OF CONTENTS ================= -->
        <div class="mag-page page-toc-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Arawali Arts Jodhpur</span>
              <strong>Table of Contents</strong>
            </div>

            <span class="mag-subhead">Volume Navigation</span>
            <h2 class="mag-headline mag-toc-headline">Master Export Divisions (500 SKUs • 8 Divisions)</h2>

            <div class="mag-page-toc-list">
${tocItemsHtml}

              <div class="mag-page-toc-item mag-page-toc-appendix" onclick="jumpToPage(${appendixStart})" title="Jump to Regulatory Dossier">
                <div class="mag-page-toc-row">
                  <span class="mag-page-toc-title">09. International Compliance &amp; Lacey Dossier</span>
                  <span class="mag-page-toc-page">Page ${String(appendixStart).padStart(2, '0')}</span>
                </div>
              </div>

              <div class="mag-page-toc-item mag-page-toc-appendix" onclick="jumpToPage(${appendixStart + 1})" title="Jump to Container CBM Matrix">
                <div class="mag-page-toc-row">
                  <span class="mag-page-toc-title">10. Container CBM &amp; Commercial Logistics</span>
                  <span class="mag-page-toc-page">Page ${String(appendixStart + 1).padStart(2, '0')}–${String(appendixStart + 2).padStart(2, '0')}</span>
                </div>
              </div>

              <div class="mag-page-toc-item mag-page-toc-appendix" onclick="jumpToPage(${appendixStart + 3})" title="Jump to Factory Operations">
                <div class="mag-page-toc-row">
                  <span class="mag-page-toc-title">11. Factory Operations &amp; Quality Desk</span>
                  <span class="mag-page-toc-page">Page ${String(appendixStart + 3).padStart(2, '0')}–${String(appendixStart + 5).padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            <div class="spread-footer">
              <span class="spread-page-num">03</span>
              <span>Table of Contents</span>
            </div>
          </div>
        </div>`;

  // Combine pages so far: Page 1, Page 2, Page 3, then divisionPagesHtml
  pagesHtml.push(page3Html);
  pagesHtml.push(...divisionPagesHtml);

  // 4. APPENDIX PAGES (Pages 139, 140, 141, 142, 143)
  // Page 139: Lacey Act & Compliance
  pagesHtml.push(`
        <!-- ================= PAGE ${String(appendixStart).padStart(2, '0')}: INTERNATIONAL COMPLIANCE DOSSIER ================= -->
        <div class="mag-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Regulatory Dossier</span>
              <strong>Timber Legality &amp; Standards</strong>
            </div>

            <span class="mag-subhead">Global Compliance Protocol</span>
            <h2 class="mag-headline" style="font-size: 1.25rem;">US Lacey Act &amp; EUDR Certification</h2>

            <p style="font-size: 0.8rem; color: #4B4136; line-height: 1.6; margin-bottom: 14px;">
              Every Arawali Arts timber procurement batch is certified through the <strong>EPCH VRIKSH Timber Legality Verification Scheme</strong> (Registration No. VRIKSH-2026-RAJ-0914), fully compliant with the <strong>United States Lacey Act (16 U.S.C. §§ 3371–3378)</strong> and the <strong>EU Deforestation Regulation (EUDR 2023/1115)</strong>.
            </p>

            <div style="background: #FAF8F5; border: 1px solid #E2D9CC; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
              <h4 style="font-family: var(--font-cinzel); font-size: 0.85rem; color: var(--primary); margin-bottom: 8px;">Core Compliance Guarantees</h4>
              <ul style="font-size: 0.76rem; color: #5C5044; line-height: 1.7; padding-left: 18px; margin: 0;">
                <li><strong>Scientific Species Classification:</strong> <em>Dalbergia sissoo</em> (Indian Rosewood / Sheesham), <em>Mangifera indica</em> (Mango Wood), and <em>Acacia nilotica / auriculiformis</em>.</li>
                <li><strong>Kiln Moisture SLA:</strong> 8%–10% Equilibrium Moisture Content (EMC) verified by calibrated pinless digital moisture probes before packaging.</li>
                <li><strong>Phytosanitary &amp; Fumigation:</strong> ISPM-15 heat-treated or Methyl Bromide fumigated with official plant quarantine certificates.</li>
                <li><strong>Packaging Drop SLA:</strong> ISTA-1A / 3A drop tested with 200–275 lb crush-test 5-ply corrugated export master cartons.</li>
              </ul>
            </div>

            <div class="spread-footer">
              <span>Technical Dossier</span>
              <span class="spread-page-num">${String(appendixStart).padStart(2, '0')}</span>
            </div>
          </div>
        </div>`);

  // Page 140: Container Logistics
  pagesHtml.push(`
        <!-- ================= PAGE ${String(appendixStart + 1).padStart(2, '0')}: CONTAINER LOGISTICS & CBM ================= -->
        <div class="mag-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Commercial Logistics</span>
              <strong>Container CBM &amp; Loading Matrix</strong>
            </div>

            <span class="mag-subhead">Freight Optimization</span>
            <h2 class="mag-headline" style="font-size: 1.25rem;">20ft FCL &amp; 40ft HQ Consolidations</h2>

            <p style="font-size: 0.8rem; color: #4B4136; line-height: 1.6; margin-bottom: 12px;">
              We offer full container load (FCL) multi-category consolidations directly from our Jodhpur factory to Mundra (INMUN1) or Kandla (INIXY1) container freight stations.
            </p>

            <table style="width: 100%; border-collapse: collapse; font-size: 0.74rem; margin-bottom: 14px; text-align: left;">
              <thead>
                <tr style="background: #F4EFE6; border-bottom: 1.5px solid var(--accent-gold); color: var(--primary);">
                  <th style="padding: 6px 8px;">Container Type</th>
                  <th style="padding: 6px 8px;">Usable Volume</th>
                  <th style="padding: 6px 8px;">Max Payload</th>
                  <th style="padding: 6px 8px;">Typical SKU Mix</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #E8E2D8;">
                  <td style="padding: 6px 8px; font-weight: 700;">20ft General Purpose (FCL)</td>
                  <td style="padding: 6px 8px;">28.0 CBM</td>
                  <td style="padding: 6px 8px;">21,500 kg</td>
                  <td style="padding: 6px 8px;">15–25 Mixed SKUs</td>
                </tr>
                <tr style="border-bottom: 1px solid #E8E2D8;">
                  <td style="padding: 6px 8px; font-weight: 700;">40ft High Cube (HQ)</td>
                  <td style="padding: 6px 8px;">68.0 CBM</td>
                  <td style="padding: 6px 8px;">26,500 kg</td>
                  <td style="padding: 6px 8px;">35–60 Mixed SKUs</td>
                </tr>
                <tr>
                  <td style="padding: 6px 8px; font-weight: 700;">LCL Port Consolidation</td>
                  <td style="padding: 6px 8px;">3.0–15.0 CBM</td>
                  <td style="padding: 6px 8px;">Variable</td>
                  <td style="padding: 6px 8px;">5–10 Gift/Decor SKUs</td>
                </tr>
              </tbody>
            </table>

            <div style="background: #FAF8F5; border: 1px dashed var(--accent-gold); border-radius: 6px; padding: 10px 12px; font-size: 0.75rem; color: #5C5044;">
              <strong>Export Transit Times:</strong> Jodhpur to Mundra Port: 24–36 hrs • Mundra to US West Coast (LA/Long Beach): 28–34 days • Mundra to US East Coast (NY/NJ/Savannah): 26–32 days • Mundra to UK (Felixstowe/Southampton): 20–25 days • Mundra to Rotterdam/Hamburg: 22–26 days.
            </div>

            <div class="spread-footer">
              <span class="spread-page-num">${String(appendixStart + 1).padStart(2, '0')}</span>
              <span>Freight Operations</span>
            </div>
          </div>
        </div>`);

  // Page 141: Wholesale Terms
  pagesHtml.push(`
        <!-- ================= PAGE ${String(appendixStart + 2).padStart(2, '0')}: COMMERCIAL TERMS & MOQ TIERS ================= -->
        <div class="mag-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Trade Governance</span>
              <strong>Commercial Terms &amp; Volume Pricing</strong>
            </div>

            <span class="mag-subhead">Incoterms &amp; Volume Scalability</span>
            <h2 class="mag-headline" style="font-size: 1.25rem;">Wholesale Tiers &amp; Payment Structure</h2>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px; font-size: 0.76rem; color: #4B4136;">
              <div style="padding: 10px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>FOB Mundra Base Tier (Standard MOQ):</strong> Listed wholesale FOB pricing applies to minimum orders of 15–50 pieces per SKU, aggregated into minimum 1 × 20ft container (28 CBM).
              </div>
              <div style="padding: 10px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>Volume Scaling Discount:</strong> Full 40ft HQ orders receive a 5% volume rebate; multi-container contracts (3+ containers annually) unlock customized tier rates and dedicated manufacturing line reserves.
              </div>
              <div style="padding: 10px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>Payment &amp; Trade Terms:</strong> 30% advance deposit upon Proforma Invoice confirmation, balance 70% against clean bill of lading (B/L) copy or Irrevocable Letter of Credit (L/C at sight) from prime global banks.
              </div>
              <div style="padding: 10px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>Sampling Protocol:</strong> Paid commercial samples air-freighted via DHL/FedEx within 10–14 business days. 100% of sample fees credited against the first container purchase order.
              </div>
            </div>

            <div class="spread-footer">
              <span>Commercial Terms</span>
              <span class="spread-page-num">${String(appendixStart + 2).padStart(2, '0')}</span>
            </div>
          </div>
        </div>`);

  // Page 142: Factory Infrastructure
  pagesHtml.push(`
        <!-- ================= PAGE ${String(appendixStart + 3).padStart(2, '0')}: JODHPUR PRODUCTION INFRASTRUCTURE ================= -->
        <div class="mag-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Manufactory Tour</span>
              <strong>Jodhpur Production Infrastructure</strong>
            </div>

            <span class="mag-subhead">Craftsmanship at Scale</span>
            <h2 class="mag-headline" style="font-size: 1.25rem;">Integrated Kiln, Iron Forge &amp; Assembly Bays</h2>

            <p style="font-size: 0.78rem; color: #4B4136; line-height: 1.5; margin-bottom: 12px;">
              Our 45,000 sq. ft. purpose-built Jodhpur manufacturing facility integrates traditional blacksmithing forges, automated drying chambers, and modern dust-extracted finishing lines under one roof.
            </p>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 12px;">
              <div style="background: #F8F5F0; padding: 10px; border-radius: 6px; border: 1px solid #E8E2D8;">
                <div style="font-weight: 700; color: var(--primary); font-size: 0.8rem; margin-bottom: 4px;">🔥 Automatic Dehumidification Kilns</div>
                <div style="font-size: 0.72rem; color: #665A4E;">6000 cu. ft. monthly capacity seasoning raw logs to uniform 8–10% moisture with zero core-case hardening.</div>
              </div>
              <div style="background: #F8F5F0; padding: 10px; border-radius: 6px; border: 1px solid #E8E2D8;">
                <div style="font-weight: 700; color: var(--primary); font-size: 0.8rem; margin-bottom: 4px;">⚒ Forged Wrought Iron Foundry</div>
                <div style="font-size: 0.72rem; color: #665A4E;">8 operational coke and induction hearths hand-drawing scrollwork, jaali grilles, and heavy hardware.</div>
              </div>
              <div style="background: #F8F5F0; padding: 10px; border-radius: 6px; border: 1px solid #E8E2D8;">
                <div style="font-weight: 700; color: var(--primary); font-size: 0.8rem; margin-bottom: 4px;">⚙ CNC &amp; Precision Routing</div>
                <div style="font-size: 0.72rem; color: #665A4E;">4-axis CNC routers routing intricate mandala fretwork, tight tolerance drawer dovetails, and mortises.</div>
              </div>
              <div style="background: #F8F5F0; padding: 10px; border-radius: 6px; border: 1px solid #E8E2D8;">
                <div style="font-weight: 700; color: var(--primary); font-size: 0.8rem; margin-bottom: 4px;">📦 Drop Test &amp; ISTA Bay</div>
                <div style="font-size: 0.72rem; color: #665A4E;">Calibrated ISTA-1A drop tester and pneumatic vibration table ensuring zero transit breakage.</div>
              </div>
            </div>

            <div class="spread-footer">
              <span class="spread-page-num">${String(appendixStart + 3).padStart(2, '0')}</span>
              <span>Factory Operations</span>
            </div>
          </div>
        </div>`);

  // Page 143: Quality Inspection & Direct Export Inquiries Desk
  pagesHtml.push(`
        <!-- ================= PAGE ${String(appendixStart + 4).padStart(2, '0')}: QUALITY CONTROL & EXPORT INQUIRY DESK ================= -->
        <div class="mag-page">
          <div class="page-inner">
            <div class="spread-header">
              <span>Quality Assurance</span>
              <strong>Inspection SLA &amp; Global Accounts Desk</strong>
            </div>

            <span class="mag-subhead">Pre-Shipment Verification</span>
            <h2 class="mag-headline" style="font-size: 1.25rem;">Four-Stage Export Quality Auditing</h2>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px; font-size: 0.75rem; color: #4B4136;">
              <div style="padding: 8px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>Stage 1: Raw Timber Moisture Audit:</strong> 100% digital pinless probe logging at intake. Batches above 10% MC are returned to kiln.
              </div>
              <div style="padding: 8px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>Stage 2: Joinery &amp; Dry-Fit Assembly:</strong> Mortise-and-tenon and KD bolt holes dry-fitted before sanding and staining.
              </div>
              <div style="padding: 8px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>Stage 3: Multi-Coat Lacquer &amp; Wax Audit:</strong> Checked under color-balanced lighting for uniform sheen, zero runs, and food-safe wax cure.
              </div>
              <div style="padding: 8px 12px; background: #FAF8F5; border-left: 3px solid var(--accent-gold); border-radius: 4px;">
                <strong>Stage 4: Container Loading &amp; Silica Desiccant:</strong> Super-dry calcium chloride desiccants hung in every container to neutralize ocean humidity.
              </div>
            </div>

            <div style="margin-top: 14px; padding: 12px; background: var(--page-cream); border: 1px solid var(--accent-gold); border-radius: 6px; text-align: center;">
              <div style="font-family: var(--font-cinzel); font-size: 0.85rem; font-weight: 700; color: var(--primary);">Direct Export Accounts Desk</div>
              <div style="font-size: 0.76rem; color: #665A4E; margin-top: 4px;">Email: <a href="mailto:export@arawaliarts.com" style="color: var(--accent-gold); text-decoration: underline; font-weight: 600;">export@arawaliarts.com</a> • WhatsApp / Call: +91 98290 XXXXX</div>
              <div style="font-size: 0.72rem; color: #887C6F; margin-top: 4px;">Wholesale B2B Portal: <strong style="color: var(--primary);">arawali.endeavoracademy.us</strong></div>
            </div>

            <div class="spread-footer">
              <span class="spread-page-num">${String(appendixStart + 4).padStart(2, '0')}</span>
              <span>Quality Assurance</span>
            </div>
          </div>
        </div>`);

  // Page 144: Hardcover Back Cover
  pagesHtml.push(`
        <!-- ================= PAGE ${String(appendixStart + 5).padStart(2, '0')}: BACK HARDCOVER ================= -->
        <div class="mag-page --hard page-cover-back" data-density="hard">
          <div class="cover-container" style="justify-content: center; text-align: center;">
            <div class="cover-brand" style="margin-bottom: 24px;">
              <span class="cover-badge">GLOBAL EXPORT HEADQUARTERS</span>
              <h2 class="cover-title" style="font-size: 1.8rem; margin-top: 12px;">ARAWALI ARTS</h2>
              <div class="cover-gold-rule"></div>
              <div class="cover-subtitle" style="font-size: 0.85rem;">Private B2B Wholesale &amp; Custom Contract Manufacturing</div>
            </div>

            <div style="max-width: 380px; margin: 0 auto 24px auto; background: rgba(0,0,0,0.3); border: 1px solid rgba(184,149,82,0.3); border-radius: 8px; padding: 18px;">
              <div style="font-size: 0.88rem; font-weight: 700; color: #E8D8B0; margin-bottom: 8px;">Direct Export Inquiries Desk</div>
              <p style="font-size: 0.8rem; color: #CCC; line-height: 1.6; margin-bottom: 12px;">
                Industrial Area, Jodhpur, Rajasthan 342001, India<br>
                Port Direct Consolidations: Mundra (INMUN1) • Kandla (INIXY1)
              </p>
              <div style="font-size: 0.84rem; color: #FFFFFF; font-weight: 600;">
                Email: <a href="mailto:export@arawaliarts.com" style="color: var(--accent-gold); text-decoration: underline;">export@arawaliarts.com</a>
              </div>
              <div style="font-size: 0.76rem; color: #AAA; margin-top: 6px;">
                Wholesale Portal: arawali.endeavoracademy.us
              </div>
            </div>

            <div style="font-size: 0.72rem; color: rgba(255,255,255,0.6); letter-spacing: 0.08em; text-transform: uppercase;">
              © 2026 Arawali Arts. All Rights Reserved. Volume XV International Edition (500 Master SKUs).
            </div>
          </div>
        </div>`);

  // Update Footer Script with the new chapters array and total pages = 144
  const chaptersJson = JSON.stringify(chapterNav, null, 8);
  footerHtml = footerHtml.replace(/const chapters = \[[^\]]*\];/s, `const chapters = ${chaptersJson};`);

  const fullBookHtml = pagesHtml.join('\n');
  const finalHtml = `${headerHtml}\n${fullBookHtml}\n      </div>\n    </main>\n\n    <!-- NATIVE CONTINUOUS SCROLL VIEW (Mobile & Touch Finger Scroll) -->\n    <main id="magazine-scroll-view" class="mag-scroll-view" style="display: none;">\n      <div class="mag-scroll-container" id="scrollContainer">\n        <!-- Dynamically populated from master page content -->\n      </div>\n    </main>\n\n    <!-- FLOATING BOTTOM NAV -->\n    <footer class="mag-bottom-nav">\n      <!-- Flipbook Navigation Pill -->\n      <div class="mag-nav-pill" id="pillFlipbookControls">\n        <button type="button" class="mag-pill-btn" id="btnPrevPage" title="Previous Page">‹</button>\n        <span class="mag-pill-counter">\n          Page <strong id="lblCurrentPage">1</strong> / <span id="lblTotalPages">144</span>\n        </span>\n        <button type="button" class="mag-pill-btn" id="btnNextPage" title="Next Page">›</button>\n      </div>\n\n      <!-- Continuous Scroll Navigation Pill -->\n      <div class="mag-nav-pill" id="pillScrollControls" style="display: none;">\n        <button type="button" class="mag-pill-btn" id="btnScrollToTop" title="Scroll to Top" style="font-size: 0.76rem; font-weight: 700; padding: 2px 8px; font-family: var(--font-sans);">↑ Top</button>\n        <span class="mag-pill-counter">\n          Page <strong id="lblScrollCurrentPage">1</strong> / <span id="lblScrollTotalPages">144</span>\n        </span>\n        <button type="button" class="mag-pill-btn" id="btnScrollToBottom" title="Scroll to Bottom" style="font-size: 0.76rem; font-weight: 700; padding: 2px 8px; font-family: var(--font-sans);">↓ End</button>\n      </div>\n    </footer>\n\n    <!-- TOAST -->\n    <div id="mag-toast">✓ Added to Container RFQ</div>\n\n    <!-- TABLE OF CONTENTS DRAWER -->\n    <div class="toc-backdrop" id="tocBackdrop"></div>\n    <aside id="toc-drawer">\n      <div class="toc-header">\n        <span class="toc-title">Catalogue Index</span>\n        <button type="button" class="toc-close" id="btnTocClose">✕</button>\n      </div>\n      <div class="toc-list" id="tocList">\n        <!-- Injected via JavaScript -->\n      </div>\n    ${footerHtml}`;

  fs.writeFileSync(BROCHURE_FILE, finalHtml, 'utf8');
  console.log(`✓ Successfully built ${BROCHURE_FILE} with 144 pages and all 500 products!`);
}

main();
