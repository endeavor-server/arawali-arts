#!/usr/bin/env node
/**
 * Build a print-ready trade catalog PDF from the same dataset.
 * Uses headless Chrome to render /tmp/arawali-print-catalog.html to
 * catalogue/arawali_arts_trade_catalog_2026.pdf
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const WEB = path.join(ROOT, 'website');
const products = JSON.parse(fs.readFileSync(path.join(WEB, 'products_500.json'), 'utf8'));

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const THUMBS = '/tmp/arawali-pdf-thumbs';
fs.mkdirSync(THUMBS, { recursive: true });
const webp = (img) => {
  const name = path.basename(img).replace(/\.(jpe?g|png|webp)$/i, '');
  const out = path.join(THUMBS, name + '.jpg');
  if (!fs.existsSync(out)) {
    try {
      execFileSync('sips', ['-Z', '520', '-s', 'format', 'jpeg', '-s', 'formatOptions', '55',
        path.join(ROOT, 'assets', path.basename(img)), '--out', out], { stdio: 'ignore' });
    } catch (e) { /* keep going */ }
  }
  return 'file://' + out;
};

const cats = {};
products.forEach((p) => {
  const m = p.Category.match(/^Cat\s*(\d+):\s*(.+)$/);
  const no = m ? +m[1] : 0;
  cats[no] = cats[no] || { no, title: m ? m[2] : p.Category, items: [] };
  cats[no].items.push(p);
});

const catPages = Object.values(cats)
  .sort((a, b) => a.no - b.no)
  .map((c) => {
    const items = c.items
      .map(
        (p) => `<div class="card">
      <img src="${webp(p.Image)}" alt="">
      <div class="body">
        <div class="sku">${esc(p.SKU)}</div>
        <div class="name">${esc(p.Product_Name)}</div>
        <div class="meta">${esc(p.Dimensions.split('/')[0])} · ${p.CBM} CBM · MOQ ${esc(p.MOQ)}</div>
        <div class="price">${esc(p.FOB_Mundra_USD)} <span>FOB Mundra</span></div>
      </div>
    </div>`
      )
      .join('');
    return `<section class="cat">
      <header><span>CAT ${String(c.no).padStart(2, '0')}</span><h2>${esc(c.title)}</h2><em>${c.items.length} SKUs</em></header>
      <div class="grid">${items}</div>
    </section>`;
  })
  .join('');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page { size: A4; margin: 12mm 10mm; }
*{box-sizing:border-box}
body{margin:0;font-family:Helvetica,Arial,sans-serif;color:#1B1512}
.cover{height:270mm;display:flex;flex-direction:column;justify-content:space-between;background:#14100E;color:#F3ECE2;padding:22mm;page-break-after:always}
.cover .brand{letter-spacing:.3em;font-size:11pt}
.cover h1{font-family:Georgia,serif;font-size:38pt;line-height:1.1;margin:0;font-weight:600}
.cover h1 em{display:block;color:#C5A059;font-weight:400}
.cover p{color:#CDBFAB;font-size:10pt;line-height:1.6;max-width:110mm}
.cover ul{list-style:none;padding:0;margin:16mm 0 0;display:flex;gap:14mm;font-size:9pt;color:#C5A059}
.cover li strong{display:block;font-size:22pt;font-family:Georgia,serif;color:#F3ECE2}
.cat{page-break-after:always}
.cat header{border-bottom:1px solid #D9CDBA;padding-bottom:4mm;margin-bottom:6mm;display:flex;align-items:baseline;gap:4mm}
.cat header span{font-size:8pt;letter-spacing:.2em;color:#8C651F}
.cat header h2{font-family:Georgia,serif;font-size:16pt;margin:0;font-weight:600;flex:1}
.cat header em{font-style:normal;font-size:8pt;color:#6F6257}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6mm}
.card{border:1px solid #E5DCCF;page-break-inside:avoid;display:flex;flex-direction:column}
.card img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}
.card .body{padding:3mm 3.5mm}
.card .sku{font-size:6.6pt;letter-spacing:.14em;color:#8C651F}
.card .name{font-family:Georgia,serif;font-size:9.2pt;line-height:1.3;margin:1mm 0}
.card .meta{font-size:6.8pt;color:#6F6257;line-height:1.4}
.card .price{font-size:9pt;font-weight:700;margin-top:1.6mm}
.card .price span{font-size:6.4pt;font-weight:400;color:#6F6257;letter-spacing:.06em}
.intro{page-break-after:always;padding-top:10mm}
.intro h2{font-family:Georgia,serif;font-size:22pt;margin:0 0 6mm}
.intro p{font-size:9.5pt;line-height:1.7;color:#4A3F35;max-width:150mm}
.intro table{border-collapse:collapse;font-size:8.6pt;margin-top:8mm;width:100%}
.intro td{padding:3mm 0;border-bottom:1px solid #E5DCCF;vertical-align:top}
.intro td:first-child{width:38%;color:#6F6257}
</style></head><body>
<section class="cover">
  <div class="brand">ARAWALI ARTS · JODHPUR</div>
  <div>
    <h1>Trade Catalog <em>2026 / 2027</em></h1>
    <p>Solid hardwood furniture, architectural wrought iron and luxury tabletop, manufactured in Jodhpur and shipped FOB Mundra to importers in North America, the United Kingdom and the European Union.</p>
    <ul>
      <li><strong>500</strong>export SKUs</li>
      <li><strong>50</strong>product lines</li>
      <li><strong>4</strong>divisions</li>
    </ul>
  </div>
  <div style="font-size:8pt;color:#9C8E7C">export@arawaliarts.com · arawali.endeavoracademy.us</div>
</section>
<section class="intro">
  <h2>How to buy</h2>
  <p>Every line in this catalog is priced FOB Mundra with a stated MOQ and carton volume, so a mixed container can be planned before a single email is exchanged. Prices are indicative until a signed quotation; finishes, cartons and labelling are made to the buyer's instruction.</p>
  <table>
    <tr><td>Minimum order</td><td>25–200 pcs per SKU; 1 CBM minimum per line for mixed containers</td></tr>
    <tr><td>Incoterms</td><td>FOB Mundra standard; CIF and Ex-Works on request</td></tr>
    <tr><td>Payment</td><td>30% deposit, 70% against bill of lading; LC at sight above $50k</td></tr>
    <tr><td>Production</td><td>30–45 days after deposit and artwork approval</td></tr>
    <tr><td>Sampling</td><td>7–10 days by air; sample cost credited against the first container</td></tr>
    <tr><td>Compliance</td><td>VRIKSH legality, US Lacey Act PPQ 505, EUDR due diligence, ISPM-15 dunnage, 8–10% kiln moisture</td></tr>
    <tr><td>Private label</td><td>Laser engraving, branded cartons, hangtags, UPC labelling</td></tr>
  </table>
  <p style="margin-top:10mm">Arawali Arts, Industrial Area, Jodhpur, Rajasthan 342001, India · export@arawaliarts.com</p>
</section>
${catPages}
</body></html>`;

const tmp = '/tmp/arawali-print-catalog.html';
fs.writeFileSync(tmp, html);
const out = path.join(ROOT, 'catalogue', 'arawali_arts_trade_catalog_2026.pdf');
execFileSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
  `--print-to-pdf=${out}`, '--virtual-time-budget=20000', `file://${tmp}`
], { stdio: 'ignore' });

console.log(out, (fs.statSync(out).size / 1048576).toFixed(1), 'MB');
