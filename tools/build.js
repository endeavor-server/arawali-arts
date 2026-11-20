#!/usr/bin/env node
/**
 * Arawali Arts — catalog build.
 *
 * Single source of truth: website/products_500.json
 * Emits:
 *   website/products-data.js      (window.ALL_PRODUCTS_500, enriched)
 *   website/data/arawali-meta.js  (window.ARAWALI_META: counters + nav slugs)
 *   website/p/<slug>-<sku>.html   (500 indexable product pages)
 *   website/sitemap.xml
 *   website/robots.txt
 *
 * Run: node tools/build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WEB = path.join(ROOT, 'website');
const SRC = path.join(WEB, 'products_500.json');

const DEPT_LABEL = {
  furniture: 'Solid Wood Furniture & Case Goods',
  kitchen: 'Kitchen, Tabletop & Entertaining',
  decor: 'Architectural Decor & Lighting',
  lifestyle: 'Lifestyle, Gifts & Specialty'
};

const DEPT_ORDER = ['furniture', 'kitchen', 'decor', 'lifestyle'];

// Indicative HS headings by division. Labelled "indicative" on the page; a broker confirms.
const HS_BY_DEPT = {
  furniture: '9403.60 — Other wooden furniture',
  kitchen: '4419.19 — Wooden kitchenware / tableware',
  decor: '8306.29 — Wrought-iron decorative articles',
  lifestyle: '4420.90 — Wooden boxes, cases & ornaments'
};

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);

const money = (s) => {
  const nums = String(s || '').match(/[0-9]+(?:\.[0-9]+)?/g) || [];
  const vals = nums.map(Number).filter((n) => !Number.isNaN(n));
  if (!vals.length) return { min: 0, max: 0 };
  return { min: Math.min(...vals), max: Math.max(...vals) };
};

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// ---- legacy deep-link slugs used by the mega-menu -> canonical category number ----
const LEGACY_SLUGS = {
  'cat-barware': 9,
  'cat-bath': 11,
  'cat-bbq': 24,
  'cat-boxes': 42,
  'cat-butcher': 44,
  'cat-candles': 35,
  'cat-coffee': 22,
  'cat-desk': 36,
  'cat-fireplace': 12,
  'cat-games': 21,
  'cat-hardware': 23,
  'cat-lighting': 26,
  'cat-patio': 30,
  'cat-pet': 18,
  'cat-spiritual': 20,
  'cat-wine': 31
};

const products = raw.map((p) => {
  const catMatch = String(p.Category).match(/^Cat\s*(\d+):\s*(.+)$/);
  const catNo = catMatch ? Number(catMatch[1]) : 0;
  const catTitle = catMatch ? catMatch[2].trim() : String(p.Category);
  const fob = money(p.FOB_Mundra_USD);
  const retail = money(p.Western_Retail_USD);

  return Object.assign({}, p, {
    SKU: p.SKU.trim(),
    Slug: `${slugify(p.Product_Name)}-${p.SKU.toLowerCase()}`,
    Dept: p.Department,
    DeptLabel: DEPT_LABEL[p.Department] || p.Department,
    CatNo: catNo,
    CatTitle: catTitle,
    CatSlug: `cat-${String(catNo).padStart(2, '0')}-${slugify(catTitle)}`,
    FobMin: fob.min,
    FobMax: fob.max,
    RetailMin: retail.min,
    RetailMax: retail.max,
    CbmNum: Number(parseFloat(p.CBM).toFixed(4)),
    MoqNum: parseInt(String(p.MOQ), 10) || 50,
    AmazonReady: /amazon/i.test(p.Target_Buyers || ''),
    HSIndicative: HS_BY_DEPT[p.Department] || '9403.60',
    Page: `p/${slugify(p.Product_Name)}-${p.SKU.toLowerCase()}.html`
  });
});

// ---- duplicate image detection (reported, fixed separately) ----
const byImage = {};
products.forEach((p) => {
  (byImage[p.Image] = byImage[p.Image] || []).push(p.SKU);
});
const sharedImages = Object.entries(byImage).filter(([, skus]) => skus.length > 1);
const sharedSkuCount = sharedImages.reduce((n, [, s]) => n + s.length, 0);

// ---- counters ----
const byDept = {};
DEPT_ORDER.forEach((d) => (byDept[d] = products.filter((p) => p.Dept === d).length));

const catMap = {};
products.forEach((p) => {
  catMap[p.CatNo] = catMap[p.CatNo] || { no: p.CatNo, title: p.CatTitle, slug: p.CatSlug, dept: p.Dept, count: 0 };
  catMap[p.CatNo].count += 1;
});
const categories = Object.values(catMap).sort((a, b) => a.no - b.no);

const meta = {
  generated: new Date().toISOString().slice(0, 10),
  skuCount: products.length,
  categoryCount: categories.length,
  deptCounts: byDept,
  deptLabels: DEPT_LABEL,
  deptOrder: DEPT_ORDER,
  amazonReady: products.filter((p) => p.AmazonReady).length,
  categories,
  legacySlugs: LEGACY_SLUGS,
  imageAudit: { uniqueImages: Object.keys(byImage).length, sharedGroups: sharedImages.length, sharedSkuCount }
};

// ---- 1. products-data.js ----
const dataJs = `/**\n * Arawali Arts Master ${products.length}-SKU Product Catalog Dataset\n * GENERATED FILE — edit website/products_500.json and run: node tools/build.js\n * Generated ${meta.generated}\n */\nwindow.ALL_PRODUCTS_500 = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(path.join(WEB, 'products-data.js'), dataJs);

// ---- 2. arawali-meta.js ----
fs.mkdirSync(path.join(WEB, 'data'), { recursive: true });
fs.writeFileSync(
  path.join(WEB, 'data', 'arawali-meta.js'),
  `/** GENERATED — do not edit. Run: node tools/build.js */\nwindow.ARAWALI_META = ${JSON.stringify(meta, null, 2)};\n`
);

// ---- 3. product pages ----
const P_DIR = path.join(WEB, 'p');
fs.mkdirSync(P_DIR, { recursive: true });
for (const f of fs.readdirSync(P_DIR)) if (f.endsWith('.html')) fs.unlinkSync(path.join(P_DIR, f));

const PAGE_CSS = `:root{--ink:#1B1512;--muted:#6F6257;--gold:#8C651F;--line:#E5DCCF;--paper:#FAF7F2}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;line-height:1.6}
a{color:inherit}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.top{border-bottom:1px solid var(--line);background:#fff}
.top .wrap{display:flex;align-items:center;justify-content:space-between;min-height:64px;gap:16px}
.brand{font-family:Georgia,'Times New Roman',serif;font-size:1.05rem;letter-spacing:.22em;text-decoration:none;font-weight:700}
.top nav{display:flex;gap:18px;font-size:.82rem;letter-spacing:.06em;text-transform:uppercase}
.top nav a{text-decoration:none;color:var(--muted)}
.top nav a:hover{color:var(--gold)}
main{padding:44px 0 72px}
.crumbs{font-size:.78rem;color:var(--muted);margin-bottom:22px}
.crumbs a{text-decoration:none}
.grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:48px;align-items:start}
figure{margin:0;background:#fff;border:1px solid var(--line);border-radius:4px;overflow:hidden}
figure img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover}
h1{font-family:Georgia,'Times New Roman',serif;font-size:2rem;line-height:1.2;margin:0 0 8px;font-weight:600}
.sku{font-size:.78rem;letter-spacing:.12em;color:var(--muted);text-transform:uppercase}
.desc{color:#4A3F35;margin:18px 0 24px}
table{width:100%;border-collapse:collapse;font-size:.9rem}
th,td{text-align:left;padding:10px 0;border-bottom:1px solid var(--line);vertical-align:top}
th{width:42%;color:var(--muted);font-weight:500}
.price{font-size:1.35rem;font-weight:700;margin:18px 0 4px}
.price small{font-size:.72rem;font-weight:500;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;display:block}
.cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:13px 20px;border-radius:2px;text-decoration:none;font-size:.82rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;border:1px solid var(--ink);cursor:pointer}
.btn-gold{background:var(--ink);color:#fff}
.btn-ghost{background:transparent;color:var(--ink)}
.note{font-size:.78rem;color:var(--muted);margin-top:18px}
.related{margin-top:56px}
.related h2{font-family:Georgia,serif;font-size:1.25rem;font-weight:600}
.rel-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.rel-card{background:#fff;border:1px solid var(--line);text-decoration:none;display:block}
.rel-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.rel-card span{display:block;padding:10px 12px;font-size:.8rem;line-height:1.35}
footer{border-top:1px solid var(--line);background:#fff;padding:26px 0;font-size:.78rem;color:var(--muted)}
@media(max-width:820px){.grid{grid-template-columns:1fr;gap:26px}h1{font-size:1.6rem}.rel-grid{grid-template-columns:repeat(2,1fr)}.top nav{display:none}}
`;

function relImage(p) {
  // pages live in /website/p/, assets in /assets/
  return '../../' + p.Image.replace(/^\.\.\//, '');
}
function webpOf(img) {
  return img.replace('/assets/', '/assets/webp/').replace(/\.(jpe?g|png)$/i, '.webp');
}

function productPage(p, related) {
  const img = relImage(p);
  const webp = webpOf(img);
  const hasWebp = fs.existsSync(path.join(ROOT, webp.replace(/^(\.\.\/)+/, '')));
  const title = `${p.Product_Name} — ${p.SKU} | Arawali Arts Jodhpur`;
  const desc = `${p.Product_Name}. ${p.Material_Construction}. ${p.Dimensions}. FOB Mundra ${p.FOB_Mundra_USD}. MOQ ${p.MOQ}. ${p.LeadTime}.`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.Product_Name,
    sku: p.SKU,
    description: p.Description,
    image: [`https://arawali.endeavoracademy.us/assets/${p.Image.split('/').pop()}`],
    category: p.CatTitle,
    material: p.Material_Construction,
    brand: { '@type': 'Brand', name: 'Arawali Arts' },
    manufacturer: { '@type': 'Organization', name: 'Arawali Arts', address: 'Jodhpur, Rajasthan, India' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: p.FobMin,
      priceSpecification: { '@type': 'PriceSpecification', minPrice: p.FobMin, maxPrice: p.FobMax, priceCurrency: 'USD' },
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Arawali Arts' }
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'CBM per unit', value: p.CBM },
      { '@type': 'PropertyValue', name: 'MOQ', value: p.MOQ },
      { '@type': 'PropertyValue', name: 'Indicative HS heading', value: p.HSIndicative }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc.slice(0, 300))}">
<link rel="canonical" href="https://arawali.endeavoracademy.us/website/${p.Page}">
<meta property="og:type" content="product">
<meta property="og:title" content="${esc(p.Product_Name)}">
<meta property="og:description" content="${esc(desc.slice(0, 200))}">
<meta property="og:image" content="https://arawali.endeavoracademy.us/assets/og/arawali-og.jpg">
<meta property="og:url" content="https://arawali.endeavoracademy.us/website/${p.Page}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="product.css">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="../index.html">ARAWALI ARTS</a>
  <nav>
    <a href="../collections.html">Catalog</a>
    <a href="../catalog.html">Line Sheet</a>
    <a href="../trade.html">Wholesale</a>
    <a href="../rfq.html">RFQ</a>
  </nav>
</div></header>
<main><div class="wrap">
  <div class="crumbs"><a href="../index.html">Home</a> / <a href="../collections.html?dept=${p.Dept}">${esc(DEPT_LABEL[p.Dept])}</a> / <span>${esc(p.CatTitle)}</span></div>
  <div class="grid">
    <figure><img src="${webp && hasWebp ? webp : img}" alt="${esc(p.Product_Name)} — handcrafted in Jodhpur" width="1024" height="559" ${hasWebp ? `onerror="this.src='${img}'"` : ''}></figure>
    <div>
      <div class="sku">${p.SKU} · Cat ${String(p.CatNo).padStart(2, '0')}</div>
      <h1>${esc(p.Product_Name)}</h1>
      <p class="desc">${esc(p.Description)}</p>
      <div class="price">${esc(p.FOB_Mundra_USD)} <small>FOB Mundra · per unit · MOQ ${esc(p.MOQ)}</small></div>
      <div class="cta">
        <button class="btn btn-gold" id="addBtn" data-sku="${p.SKU}">Add to RFQ container</button>
        <a class="btn btn-ghost" href="../rfq.html?sku=${p.SKU}">Request a quote</a>
      </div>
      <table>
        <tr><th>Material &amp; construction</th><td>${esc(p.Material_Construction)}</td></tr>
        <tr><th>Dimensions</th><td>${esc(p.Dimensions)}</td></tr>
        <tr><th>Carton volume</th><td>${p.CBM} CBM / unit</td></tr>
        <tr><th>Minimum order</th><td>${esc(p.MOQ)}</td></tr>
        <tr><th>Lead time</th><td>${esc(p.LeadTime)}</td></tr>
        <tr><th>Western retail benchmark</th><td>${esc(p.Western_Retail_USD)}</td></tr>
        <tr><th>Style</th><td>${esc(p.Style_Trend)}</td></tr>
        <tr><th>Indicative HS heading</th><td>${esc(p.HSIndicative)}</td></tr>
        <tr><th>Typical buyers</th><td>${esc(p.Target_Buyers)}</td></tr>
      </table>
      <p class="note">Indicative HS heading only — your customs broker confirms final classification. Kiln-dried 8–10% moisture, ISPM-15 dunnage, VRIKSH / Lacey / EUDR paperwork on request.</p>
    </div>
  </div>
  <section class="related">
    <h2>More in ${esc(p.CatTitle)}</h2>
    <div class="rel-grid">
      ${related.map((r) => `<a class="rel-card" href="${r.Page.split('/')[1]}"><img src="${webpOf(relImage(r))}" alt="${esc(r.Product_Name)}" loading="lazy"><span>${esc(r.Product_Name)}<br><small>${esc(r.FOB_Mundra_USD)}</small></span></a>`).join('')}
    </div>
  </section>
</div></main>
<footer><div class="wrap">Arawali Arts · Jodhpur, Rajasthan, India · export@arawaliarts.com · <a href="../trade.html">Wholesale terms</a></div></footer>
<script>
document.getElementById('addBtn').addEventListener('click',function(){
  var sku=${JSON.stringify(p.SKU)}, title=${JSON.stringify(p.Product_Name)}, cbm=${p.CbmNum}, moq=${p.MoqNum}, fob=${JSON.stringify(p.FOB_Mundra_USD)};
  var key='arawali_rfq_cart_v2', cart={};
  try{cart=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){}
  var q=(cart[sku]&&cart[sku].qty||0)+moq;
  cart[sku]={sku:sku,title:title,cbm:cbm,moq:moq,fobTier:fob,qty:q};
  localStorage.setItem(key,JSON.stringify(cart));
  this.textContent='✓ Added — ' + q + ' pcs';
  var b=this;setTimeout(function(){b.textContent='Add to RFQ container'},1600);
});
</script>
<script src="../analytics.js" defer></script>
</body>
</html>\n`;
}

for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const idx = i + 1;
  const related = products.filter((r) => r.CatNo === p.CatNo && r.SKU !== p.SKU).slice(0, 4);
  const canonicalName = p.Page.split('/')[1];
  fs.writeFileSync(path.join(P_DIR, canonicalName), productPage(p, related));

  const skuSlug = p.SKU.trim().toLowerCase();
  const skuUnderscore = 'sku_' + skuSlug.replace(/-/g, '_');
  const aliasHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=${canonicalName}">
<link rel="canonical" href="https://arawali.endeavoracademy.us/website/p/${canonicalName}">
<title>Redirecting to ${esc(p.Product_Name)}...</title>
<script>window.location.replace("${canonicalName}");</script>
</head>
<body style="background:#14100E;color:#DFC078;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
<p>Redirecting to <a href="${canonicalName}" style="color:#DFC078;text-decoration:underline;">${esc(p.Product_Name)} (${esc(p.SKU)})</a>...</p>
</body>
</html>\n`;

  const aliases = new Set([
    `sku_${String(idx).padStart(3, '0')}.html`,
    `${skuSlug}.html`,
    `${skuUnderscore}.html`
  ]);
  for (const alias of aliases) {
    if (alias !== canonicalName) {
      fs.writeFileSync(path.join(P_DIR, alias), aliasHtml, 'utf8');
    }
  }
}

// shared stylesheet for product pages
fs.writeFileSync(path.join(P_DIR, 'product.css'), PAGE_CSS);

// ---- 3b. category pages (50) ----
const C_DIR = path.join(WEB, 'c');
fs.mkdirSync(C_DIR, { recursive: true });
for (const f of fs.readdirSync(C_DIR)) if (f.endsWith('.html')) fs.unlinkSync(path.join(C_DIR, f));

function categoryPage(cat, items) {
  const fobLo = Math.min(...items.map((p) => p.FobMin));
  const fobHi = Math.max(...items.map((p) => p.FobMax));
  const title = `${cat.title} — ${items.length} SKUs, FOB Mundra $${fobLo.toFixed(2)}–$${fobHi.toFixed(2)} | Arawali Arts`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.title,
    description: `Export catalogue of ${items.length} ${cat.title.toLowerCase()} SKUs manufactured in Jodhpur, India. FOB Mundra pricing, MOQ, CBM and lead times.`,
    isPartOf: { '@type': 'WebSite', name: 'Arawali Arts' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://arawali.endeavoracademy.us/website/${p.Page}`,
        name: p.Product_Name
      }))
    }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="Export ${esc(cat.title.toLowerCase())} from Arawali Arts, Jodhpur. ${items.length} SKUs, ${DEPT_LABEL[cat.dept]}, FOB Mundra $${fobLo.toFixed(2)}–$${fobHi.toFixed(2)}, MOQ from ${Math.min(...items.map((p) => p.MoqNum))} pcs.">
<link rel="canonical" href="https://arawali.endeavoracademy.us/website/c/${cat.slug}.html">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(cat.title)} — ${items.length} export SKUs">
<meta property="og:description" content="FOB Mundra $${fobLo.toFixed(2)}–$${fobHi.toFixed(2)} · MOQ from ${Math.min(...items.map((p) => p.MoqNum))} pcs · ${esc(DEPT_LABEL[cat.dept])}">
<meta property="og:image" content="https://arawali.endeavoracademy.us/assets/og/arawali-og.jpg">
<meta property="og:url" content="https://arawali.endeavoracademy.us/website/c/${cat.slug}.html">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../p/product.css">
<style>
.cat-head{max-width:760px;margin-bottom:34px}
.cat-head p{color:#4A3F35}
.cat-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase}
.cat-meta span{border:1px solid var(--line);background:#fff;padding:6px 10px}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:10px}
.card{background:#fff;border:1px solid var(--line);text-decoration:none;display:flex;flex-direction:column}
.card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block}
.card-body{padding:12px 14px;display:flex;flex-direction:column;gap:4px;flex:1}
.card-body strong{font-size:.88rem;font-weight:600;line-height:1.35}
.card-body small{color:var(--muted);font-size:.72rem}
.card-body .price{margin-top:auto;font-size:.82rem;font-weight:700}
@media(max-width:980px){.cards{grid-template-columns:repeat(3,1fr)}}
@media(max-width:700px){.cards{grid-template-columns:repeat(2,1fr)}}
</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="../index.html">ARAWALI ARTS</a>
  <nav>
    <a href="../collections.html">Catalog</a>
    <a href="../catalog.html">Line Sheet</a>
    <a href="../trade.html">Wholesale</a>
    <a href="../rfq.html">RFQ</a>
  </nav>
</div></header>
<main><div class="wrap">
  <div class="crumbs"><a href="../index.html">Home</a> / <a href="../collections.html">Catalog</a> / <span>${esc(cat.title)}</span></div>
  <div class="cat-head">
    <h1>${esc(cat.title)}</h1>
    <p>${items.length} export-ready SKUs handcrafted in Jodhpur from seasoned hardwood and hand-forged iron. Priced FOB Mundra, packed for container consolidation.</p>
    <div class="cat-meta">
      <span>Division: ${esc(DEPT_LABEL[cat.dept])}</span>
      <span>FOB $${fobLo.toFixed(2)}–$${fobHi.toFixed(2)}</span>
      <span>MOQ from ${Math.min(...items.map((p) => p.MoqNum))} pcs</span>
      <span>Lead time 45–60 days</span>
    </div>
  </div>
  <div class="cards">
    ${items
      .map(
        (p) => `<a class="card" href="../${p.Page}">
      <img src="${webpOf('../../' + p.Image.replace(/^\.\.\//, ''))}" alt="${esc(p.Product_Name)}" loading="lazy" onerror="this.src='${'../../' + p.Image.replace(/^\.\.\//, '')}'">
      <div class="card-body"><strong>${esc(p.Product_Name)}</strong><small>${p.SKU} · ${p.CBM} CBM · MOQ ${esc(p.MOQ)}</small><span class="price">${esc(p.FOB_Mundra_USD)}</span></div>
    </a>`
      )
      .join('\n    ')}
  </div>
  <div class="related"><h2>Build a quote</h2><p style="color:#4A3F35">Add SKUs to your RFQ container and our export desk returns an itemised FOB Mundra quote within one business day.</p><div class="cta"><a class="btn btn-gold" href="../rfq.html">Open the RFQ desk</a><a class="btn btn-ghost" href="../trade.html">Wholesale terms</a></div></div>
</div></main>
<footer><div class="wrap">Arawali Arts · Jodhpur, Rajasthan, India · export@arawaliarts.com</div></footer>
<script src="../analytics.js" defer></script>
</body>
</html>\n`;
}

for (const cat of categories) {
  const items = products.filter((p) => p.CatNo === cat.no);
  fs.writeFileSync(path.join(C_DIR, `${cat.slug}.html`), categoryPage(cat, items));
}

// ---- 3c. downloadable price list (CSV for buyers, not the web) ----
const DL_DIR = path.join(WEB, 'downloads');
fs.mkdirSync(DL_DIR, { recursive: true });
const csvEsc = (v) => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
const csvHead = ['SKU', 'Product', 'Category', 'Division', 'Material', 'Dimensions', 'CBM_per_unit', 'MOQ_pcs', 'FOB_Mundra_USD', 'Western_retail_USD', 'Lead_time', 'Indicative_HS'];
const csvRows = products.map((p) => [
  p.SKU, p.Product_Name, p.CatTitle, DEPT_LABEL[p.Dept], p.Material_Construction, p.Dimensions,
  p.CBM, p.MoqNum, p.FOB_Mundra_USD, p.Western_Retail_USD, p.LeadTime, p.HSIndicative
].map(csvEsc).join(','));
fs.writeFileSync(
  path.join(DL_DIR, 'arawali-wholesale-price-list-2026.csv'),
  '\ufeff' + [csvHead.map(csvEsc).join(','), ...csvRows].join('\r\n') + '\r\n'
);

// ---- 4. sitemap ----
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: '/website/index.html', pr: '1.0' },
  { loc: '/website/collections.html', pr: '0.9' },
  { loc: '/website/catalog.html', pr: '0.8' },
  { loc: '/website/trade.html', pr: '0.8' },
  { loc: '/website/rfq.html', pr: '0.7' },
  { loc: '/website/compliance.html', pr: '0.6' },
  { loc: `/catalogue/arawali_arts_corporate_brochure.html`, pr: '0.6' }
]
  .concat(['living-dining.html', 'case-goods.html', 'tabletop.html', 'wall-decor.html'].map((f) => ({ loc: `/website/${f}`, pr: '0.7' })))
  .concat(categories.map((c) => ({ loc: `/website/c/${c.slug}.html`, pr: '0.6' })))
  .concat(products.map((p) => ({ loc: `/website/${p.Page}`, pr: '0.5' })));

fs.writeFileSync(
  path.join(WEB, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>https://arawali.endeavoracademy.us${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.pr}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);

fs.writeFileSync(
  path.join(WEB, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /website/leads/\n\nSitemap: https://arawali.endeavoracademy.us/website/sitemap.xml\n`
);

// ---- report ----
console.log(JSON.stringify({
  products: products.length,
  categories: categories.length,
  deptCounts: byDept,
  sharedImages: meta.imageAudit,
  pages: fs.readdirSync(P_DIR).length
}, null, 2));
