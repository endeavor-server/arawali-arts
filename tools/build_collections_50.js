const fs = require('fs');
const path = require('path');

const BASE_DIR = '/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts';
const products = JSON.parse(fs.readFileSync(path.join(BASE_DIR, 'website/products_500.json'), 'utf8'));

// 8 Manufacturing Divisions
const DIVISIONS = [
  {
    id: "living-dining",
    name: "Living & Dining Furniture",
    icon: "🪑",
    skuCount: 50,
    catIndices: [3, 5, 14, 33, 47]
  },
  {
    id: "case-goods",
    name: "Case Goods & Storage",
    icon: "🗄️",
    skuCount: 70,
    catIndices: [4, 7, 13, 25, 28, 31, 44]
  },
  {
    id: "kitchen-tabletop",
    name: "Kitchen, Tabletop & Entertaining",
    icon: "🍷",
    skuCount: 70,
    catIndices: [1, 9, 15, 22, 24, 37, 40]
  },
  {
    id: "architectural-decor",
    name: "Architectural Wall Decor & Mirrors",
    icon: "🏮",
    skuCount: 60,
    catIndices: [2, 16, 38, 39, 45, 48]
  },
  {
    id: "lighting-hearth",
    name: "Lighting & Fireplace Hearthcraft",
    icon: "🕯️",
    skuCount: 50,
    catIndices: [6, 12, 26, 35, 41]
  },
  {
    id: "outdoor-living",
    name: "Garden, Patio & Outdoor Living",
    icon: "🌿",
    skuCount: 60,
    catIndices: [10, 30, 34, 43, 50, 23]
  },
  {
    id: "office-vanity",
    name: "Home Office, Keepsakes & Vanity",
    icon: "💼",
    skuCount: 60,
    catIndices: [8, 11, 29, 32, 36, 42]
  },
  {
    id: "kids-heritage",
    name: "Kids, Pets, Leisure & Heritage",
    icon: "🧸",
    skuCount: 80,
    catIndices: [17, 18, 19, 20, 21, 27, 46, 49]
  }
];

const catToDivision = {};
for (const div of DIVISIONS) {
  for (const idx of div.catIndices) {
    catToDivision[idx] = div;
  }
}

// Group products by category
const catMap = {};
for (const p of products) {
  const catName = p.Category || p.category;
  if (!catMap[catName]) catMap[catName] = [];
  catMap[catName].push(p);
}

const cFiles = fs.readdirSync(path.join(BASE_DIR, 'website/c'));
function getCatUrl(num) {
  const prefix = `cat-${String(num).padStart(2, '0')}-`;
  const file = cFiles.find(f => f.startsWith(prefix));
  return file ? `c/${file}` : `c/cat-${String(num).padStart(2, '0')}.html`;
}

const catCards = [];
let catNum = 1;

for (const [catName, skus] of Object.entries(catMap)) {
  const div = catToDivision[catNum] || DIVISIONS[0];
  const catUrl = getCatUrl(catNum);
  
  const prices = skus.map(s => {
    const raw = s.FOB_Mundra_USD || s.price || '';
    const m = raw.match(/\$?([0-9\.]+)/);
    return m ? parseFloat(m[1]) : 0;
  }).filter(p => p > 0);
  
  const cbms = skus.map(s => {
    const raw = s.CBM || s.cbm || '';
    const m = String(raw).match(/([0-9\.]+)/);
    return m ? parseFloat(m[1]) : 0;
  }).filter(c => c > 0);

  const minP = prices.length ? Math.min(...prices).toFixed(2) : "12.00";
  const maxP = prices.length ? Math.max(...prices).toFixed(2) : "95.00";
  const minC = cbms.length ? Math.min(...cbms).toFixed(3) : "0.015";
  const maxC = cbms.length ? Math.max(...cbms).toFixed(3) : "0.120";
  const moqs = skus.map(s => parseInt(s.MOQ || 20)).filter(m => m > 0);
  const minMoq = moqs.length ? Math.min(...moqs) : 20;

  const cleanTitle = catName.replace(/^Cat \d+:\s*/, '');
  const firstSku = skus[0];
  let imgSrc = firstSku.Image || firstSku.image || `assets/sku_${firstSku.SKU.toLowerCase().replace(/-/g, '_')}.jpg`;
  if (imgSrc.startsWith('../')) imgSrc = imgSrc.replace('../', '');

  catCards.push(`        <!-- Category ${catNum}: ${cleanTitle} -->
        <div class="lux-col-card" data-dept="${div.id}" data-cat="${catName}" data-cat-id="cat-${catNum}">
          <div class="lux-col-img-wrap" style="background-image: url('${imgSrc}');">
            <span class="lux-col-badge-float">${div.icon} ${div.name}</span>
            <span class="lux-col-sku-count">${skus.length} SKUs</span>
          </div>
          <div class="lux-col-body">
            <span class="lux-col-dept-tag">${div.name.toUpperCase()}</span>
            <h3 class="lux-col-title">${cleanTitle}</h3>
            <p class="lux-col-desc">${firstSku.Description ? firstSku.Description.substring(0, 110) + '...' : 'Handcrafted export collection from seasoned Indian hardwood and architectural iron.'}</p>
            <div class="lux-col-materials">
              <strong>Materials:</strong> ${firstSku.Material_Species || firstSku.species || 'Solid Hardwood & Hand-Forged Wrought Iron'}
            </div>
            <div class="lux-col-specs-grid">
              <div class="spec-item">
                <span class="spec-lbl">MOQ</span>
                <span class="spec-val">${minMoq} Pcs</span>
              </div>
              <div class="spec-item">
                <span class="spec-lbl">FOB Range</span>
                <span class="spec-val">$${minP} – $${maxP}</span>
              </div>
              <div class="spec-item">
                <span class="spec-lbl">Average CBM</span>
                <span class="spec-val">${minC} – ${maxC} CBM</span>
              </div>
            </div>
            <div class="lux-col-actions">
              <a href="${catUrl}" class="lux-btn-explore">View Line Sheet &rarr;</a>
              <button type="button" class="lux-btn-rfq btn-explore-category" data-cat="${catName}">Browse SKUs</button>
            </div>
          </div>
        </div>`);
  catNum++;
}

console.log('Built', catCards.length, 'category cards.');

let html = fs.readFileSync(path.join(BASE_DIR, 'website/collections.html'), 'utf8');

// Replace curatedCollectionsGrid
const gridStartMarker = '<div class="lux-collection-grid" id="curatedCollectionsGrid">';
const gridEndMarker = '<!-- VIEW 2: COMPLETE 500-SKU MASTER CATALOG DIRECTORY';

const startIdx = html.indexOf(gridStartMarker);
const endIdx = html.indexOf(gridEndMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const newGridHtml = `${gridStartMarker}\n${catCards.join('\n')}\n      </div>\n\n      <!-- DIRECTORY VIEW NUMBERED PAGINATION -->\n      <div class="myntra-pagination-wrap" id="directoryPagination" style="margin-top: 28px; margin-bottom: 24px;"></div>\n\n      `;
  html = html.substring(0, startIdx) + newGridHtml + html.substring(endIdx);
  console.log('Successfully injected all 50 categories into collections.html!');
} else {
  console.log('ERROR: Could not locate grid boundaries in collections.html', startIdx, endIdx);
}

fs.writeFileSync(path.join(BASE_DIR, 'website/collections.html'), html, 'utf8');
console.log('Updated collections.html written cleanly.');
