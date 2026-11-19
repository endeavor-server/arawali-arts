#!/usr/bin/env python3
import re

CATALOG_PATH = '/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts/website/catalog.html'

with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update <style>
new_style = """<style>
    html, body {
      overflow-x: clip;
    }
    .myntra-layout-section {
      padding: 32px 0 80px;
      background: var(--bg-main, #FAF8F5);
    }
    .view-switcher-group {
      display: inline-flex;
      gap: 4px;
      align-items: center;
      background: #F3EFEA;
      padding: 3px;
      border-radius: 8px;
    }
    .view-switcher-btn {
      background: transparent;
      border: none;
      color: #6B5E52;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .view-switcher-btn.active {
      background: #FFFFFF;
      color: var(--primary, #1A1410);
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      font-weight: 700;
    }
    .catalog-table-wrap {
      overflow-x: auto;
      background: #FFFFFF;
      border: 1px solid var(--border-subtle, #E5DCD0);
      border-radius: 12px;
      box-shadow: 0 4px 18px rgba(24, 19, 14, 0.04);
      margin-bottom: 30px;
    }
    .catalog-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.86rem;
      min-width: 900px;
    }
    .catalog-table th {
      background: #FAF8F5;
      color: #4A3E33;
      padding: 12px 14px;
      text-align: left;
      font-weight: 700;
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-bottom: 2px solid #E5DCD0;
    }
    .catalog-table td {
      padding: 12px 14px;
      border-bottom: 1px solid #EFEAE3;
      vertical-align: middle;
    }
    .catalog-table tr:hover {
      background: rgba(184, 149, 82, 0.04);
    }
    .table-thumb {
      width: 52px;
      height: 52px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #E5DCD0;
      cursor: pointer;
    }
    .catalog-load-actions {
      text-align: center;
      margin: 40px 0;
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .btn-load-more {
      background: var(--primary, #16120E);
      color: #FFF;
      padding: 14px 36px;
      border-radius: 8px;
      font-size: 0.92rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(22, 18, 14, 0.16);
      transition: all 0.2s ease;
    }
    .btn-load-more:hover {
      background: #B89352;
      color: #110E0C;
      transform: translateY(-2px);
    }
    .btn-show-all {
      background: transparent;
      color: var(--primary, #16120E);
      border: 1.5px solid #D9CFC4;
      padding: 13px 28px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-show-all:hover {
      border-color: #B89352;
      background: #FAF8F5;
    }
    .target-buyer-tag {
      font-size: 0.72rem;
      background: #EDE8E2;
      color: #4A3525;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 6px;
    }
  </style>"""

html = re.sub(r'<style>.*?</style>', new_style, html, flags=re.DOTALL)

# 2. Update the main section HTML
new_section = """  <!-- MAIN MYNTRA-GRADE 2-COLUMN CATALOG SECTION -->
  <section class="myntra-layout-section" id="catalogTop">
    <div class="container myntra-container">

      <!-- Mobile Trigger Bar -->
      <div class="myntra-mobile-filter-bar">
        <button type="button" class="myntra-mobile-btn" id="openMobileFiltersBtn">
          <span>⚙️ FILTERS</span>
        </button>
        <div class="myntra-mobile-sort-wrap">
          <select class="myntra-mobile-sort-select" id="sortSelectMobile">
            <option value="default">Sort: Default (SKU)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="cbm-asc">CBM: Compact First</option>
            <option value="name-asc">Product Name (A-Z)</option>
          </select>
        </div>
      </div>

      <!-- Backdrop for Mobile Sidebar -->
      <div class="rfq-drawer-backdrop" id="myntraDrawerBackdrop"></div>

      <!-- LEFT VERTICAL SIDEBAR (Myntra Standard) -->
      <aside class="myntra-sidebar" id="myntraSidebar">
        <div class="myntra-sidebar-header">
          <span class="myntra-sidebar-title">FILTERS</span>
          <button type="button" class="myntra-clear-all-btn" id="clearAllFiltersBtn">CLEAR ALL</button>
          <button type="button" class="myntra-sidebar-close" id="closeMobileFiltersBtn" aria-label="Close filters">✕</button>
        </div>

        <!-- Facet Search -->
        <div class="myntra-facet-search">
          <span class="facet-search-icon">🔍</span>
          <input type="text" id="catalogSearch" placeholder="Search 500 SKUs by title, SKU..." autocomplete="off">
        </div>

        <!-- Facet 1: 8 Manufacturing Divisions -->
        <div class="myntra-facet-group">
          <div class="myntra-facet-title">MANUFACTURING DIVISIONS</div>
          <div class="myntra-facet-list" id="facetDivisionsList"></div>
        </div>

        <!-- Facet 2: 50 Export Categories -->
        <div class="myntra-facet-group">
          <div class="myntra-facet-title">CATEGORIES (50)</div>
          <div class="myntra-facet-list" id="facetCategoriesList"></div>
        </div>

        <!-- Facet 3: Primary Timber & Material -->
        <div class="myntra-facet-group">
          <div class="myntra-facet-title">PRIMARY TIMBER &amp; MATERIAL</div>
          <div class="myntra-facet-list" id="facetMaterialsList"></div>
        </div>

        <!-- Facet 4: FOB Mundra Price Tier -->
        <div class="myntra-facet-group">
          <div class="myntra-facet-title">FOB MUNDRA PRICE TIER</div>
          <div class="myntra-facet-list" id="facetPriceList"></div>
        </div>

        <!-- Facet 5: Amazon FBA / Compact Cargo -->
        <div class="myntra-facet-group">
          <div class="myntra-facet-title">AMAZON FBA / COMPACT CARGO</div>
          <div class="myntra-facet-list">
            <label class="myntra-facet-item">
              <input type="checkbox" id="amazonFbaCheckbox">
              <span class="facet-name">Amazon-Ready (CBM &le; 0.015)</span>
              <span class="facet-count" id="amazonFilterCount">(259)</span>
            </label>
          </div>
        </div>

        <!-- Facet 6: Export Compliance -->
        <div class="myntra-facet-group">
          <div class="myntra-facet-title">EXPORT COMPLIANCE</div>
          <div class="myntra-compliance-tags">
            <span class="m-tag">🌿 VRIKSH Legal Timber (Standard V-01)</span>
            <span class="m-tag">📋 US Lacey Act Pre-Cleared (PPQ 505)</span>
            <span class="m-tag">🛰️ EUDR Deforestation Due Diligence</span>
            <span class="m-tag">🔥 8%–10% Kiln Moisture SLA</span>
            <span class="m-tag">📦 ISTA-1A Drop Tested Packaging</span>
            <span class="m-tag">🍽️ FDA / LFGB Food-Safe Lacquer</span>
          </div>
        </div>
      </aside>

      <!-- RIGHT MAIN CONTENT -->
      <main class="myntra-main-content">
        <!-- Top Bar with Results Count, View Switcher, and Sort Dropdown -->
        <div class="myntra-top-bar">
          <div class="myntra-results-meta">
            Showing <span id="visibleCount" class="catalog-counter" style="font-weight: 700; color: #B89552;">0</span> of <span id="totalCount" class="catalog-counter" style="font-weight: 700; color: #1A1410;">500</span> Verified Export SKUs
          </div>
          <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
            <div class="view-switcher-group">
              <button type="button" id="viewGridBtn" class="view-switcher-btn active" title="Editorial Visual Grid">⊞ Grid</button>
              <button type="button" id="viewTableBtn" class="view-switcher-btn" title="Dense Spec Line Sheet Table">☰ Table</button>
            </div>
            <div class="myntra-sort-container" style="display: flex; align-items: center; gap: 8px;">
              <label for="sortSelect" class="myntra-sort-label" style="font-size: 0.8rem; font-weight: 600; color: #7A6C5F;">Sort :</label>
              <select id="sortSelect" class="myntra-sort-dropdown" style="padding: 6px 12px; border: 1px solid #E5DCD0; border-radius: 8px; font-size: 0.82rem; background: #FFF; color: #1A1410; font-family: inherit;">
                <option value="default">Default (SKU)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="cbm-asc">CBM: Compact First</option>
                <option value="name-asc">Product Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Dynamic Product Cards Grid -->
        <div id="catalogGrid" class="collection-grid">
          <!-- Injected via JavaScript -->
        </div>

        <!-- Dynamic Table Wrap (Hidden by default) -->
        <div id="catalogTableWrap" class="catalog-table-wrap" style="display: none;">
          <table class="catalog-table">
            <thead>
              <tr>
                <th style="width: 60px;">Photo</th>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Material &amp; Construction</th>
                <th>Dimensions</th>
                <th>CBM</th>
                <th>FOB Mundra</th>
                <th>MOQ</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody id="catalogTableBody">
              <!-- Injected via JavaScript -->
            </tbody>
          </table>
        </div>

        <!-- Load More / Pagination -->
        <div class="catalog-load-actions">
          <button type="button" id="btnLoadMore" class="btn-load-more">Load Next 48 SKUs</button>
          <button type="button" id="btnShowAll" class="btn-show-all">Display All 500 SKUs At Once</button>
        </div>
      </main>

    </div>
  </section>"""

html = re.sub(r'<!-- MAIN CATALOG INTERACTIVE SECTION -->.*?</section>', new_section, html, flags=re.DOTALL)

# 3. Update the script
new_script = """  <script>
    (function() {
      const allItems = window.ALL_PRODUCTS_500 || [];
      if (!allItems.length) return;

      // 8 Manufacturing Divisions Definition
      const divisions = [
        { id: 'living-dining', name: 'Living & Dining Furniture', prefixes: ['Cat 03', 'Cat 05', 'Cat 14', 'Cat 33', 'Cat 47'] },
        { id: 'case-goods', name: 'Case Goods & Storage Buffets', prefixes: ['Cat 04', 'Cat 07', 'Cat 13', 'Cat 25', 'Cat 28', 'Cat 32', 'Cat 44'] },
        { id: 'tabletop', name: 'Kitchen, Tabletop & Entertaining', prefixes: ['Cat 01', 'Cat 09', 'Cat 15', 'Cat 22', 'Cat 31', 'Cat 37', 'Cat 40'] },
        { id: 'wall-decor', name: 'Architectural Wall Decor & Mirrors', prefixes: ['Cat 02', 'Cat 16', 'Cat 38', 'Cat 39', 'Cat 45', 'Cat 48'] },
        { id: 'lighting-hearth', name: 'Decorative Lighting & Hearthcraft', prefixes: ['Cat 06', 'Cat 12', 'Cat 26', 'Cat 35', 'Cat 41'] },
        { id: 'garden-outdoor', name: 'Garden, Patio & Outdoor Living', prefixes: ['Cat 10', 'Cat 24', 'Cat 30', 'Cat 34', 'Cat 43', 'Cat 50'] },
        { id: 'office-vanity', name: 'Home Office, Keepsakes & Vanity', prefixes: ['Cat 08', 'Cat 23', 'Cat 27', 'Cat 29', 'Cat 36', 'Cat 42'] },
        { id: 'kids-leisure', name: 'Kids, Pets, Leisure & Heritage', prefixes: ['Cat 11', 'Cat 17', 'Cat 18', 'Cat 19', 'Cat 20', 'Cat 21', 'Cat 46', 'Cat 49'] }
      ];

      // Material Matchers
      const materialMatchers = [
        { id: 'sheesham', label: 'Solid Sheesham (Rosewood)', match: p => /sheesham|rosewood/i.test(p.Material_Construction || '') },
        { id: 'mango', label: 'Seasoned Mango Wood', match: p => /mango/i.test(p.Material_Construction || '') },
        { id: 'acacia', label: 'Kiln-Dried Acacia', match: p => /acacia/i.test(p.Material_Construction || '') },
        { id: 'iron', label: 'Hand-Forged Wrought Iron', match: p => /iron|wrought/i.test(p.Material_Construction || '') },
        { id: 'brass', label: 'Brass & Cast Hardware', match: p => /brass|cast/i.test(p.Material_Construction || '') }
      ];

      // Price Tiers
      const priceTiers = [
        { id: 'under25', label: 'Under $25.00 FOB', min: 0, max: 25 },
        { id: '25to50', label: '$25.00 – $50.00 FOB', min: 25, max: 50 },
        { id: '50to100', label: '$50.00 – $100.00 FOB', min: 50, max: 100 },
        { id: 'above100', label: '$100.00+ FOB', min: 100, max: Infinity }
      ];

      // State
      let selectedDivisions = new Set();
      let selectedCategories = new Set();
      let selectedMaterials = new Set();
      let selectedPriceTiers = new Set();
      let amazonOnly = false;
      let searchQuery = '';
      let currentSort = 'default';
      let currentViewMode = 'grid'; // 'grid' | 'table'
      let displayLimit = 48;

      // Elements
      const gridContainer = document.getElementById("catalogGrid");
      const tableWrap = document.getElementById("catalogTableWrap");
      const tbody = document.getElementById("catalogTableBody");
      const searchInput = document.getElementById("catalogSearch");
      const sortSelect = document.getElementById("sortSelect");
      const sortSelectMobile = document.getElementById("sortSelectMobile");
      const viewGridBtn = document.getElementById("viewGridBtn");
      const viewTableBtn = document.getElementById("viewTableBtn");
      const btnMore = document.getElementById("btnLoadMore");
      const btnAll = document.getElementById("btnShowAll");
      const visibleCountEl = document.getElementById("visibleCount");
      const totalCountEl = document.getElementById("totalCount");
      const clearAllBtn = document.getElementById("clearAllFiltersBtn");
      const amazonCb = document.getElementById("amazonFbaCheckbox");
      const amazonCountEl = document.getElementById("amazonFilterCount");
      const sidebarEl = document.getElementById("myntraSidebar");
      const backdropEl = document.getElementById("myntraDrawerBackdrop");
      const openMobileBtn = document.getElementById("openMobileFiltersBtn");
      const closeMobileBtn = document.getElementById("closeMobileFiltersBtn");

      // Mobile Drawer
      function openMobileDrawer() {
        if (sidebarEl) sidebarEl.classList.add("open");
        if (backdropEl) backdropEl.classList.add("open");
        document.body.style.overflow = "hidden";
      }
      function closeMobileDrawer() {
        if (sidebarEl) sidebarEl.classList.remove("open");
        if (backdropEl) backdropEl.classList.remove("open");
        document.body.style.overflow = "";
      }
      if (openMobileBtn) openMobileBtn.onclick = openMobileDrawer;
      if (closeMobileBtn) closeMobileBtn.onclick = closeMobileDrawer;
      if (backdropEl) backdropEl.onclick = closeMobileDrawer;

      // Price helper
      function getFobValue(item) {
        if (item.FOB_Mundra_USD) {
          const match = String(item.FOB_Mundra_USD).match(/\\$?([0-9.]+)/);
          if (match) return parseFloat(match[1]);
        }
        return 35;
      }

      // Render Sidebar Facets
      function renderSidebarFacets() {
        // 1. Divisions
        const divList = document.getElementById("facetDivisionsList");
        if (divList) {
          divList.innerHTML = "";
          divisions.forEach(d => {
            const count = allItems.filter(item => d.prefixes.some(pre => (item.Category || '').startsWith(pre))).length;
            const label = document.createElement("label");
            label.className = "myntra-facet-item";
            label.innerHTML = `
              <input type="checkbox" value="${d.id}" ${selectedDivisions.has(d.id) ? "checked" : ""}>
              <span class="facet-name">${d.name}</span>
              <span class="facet-count">(${count})</span>
            `;
            const cb = label.querySelector("input");
            cb.onchange = () => {
              if (cb.checked) selectedDivisions.add(d.id);
              else selectedDivisions.delete(d.id);
              displayLimit = 48;
              applyFiltersAndRender();
            };
            divList.appendChild(label);
          });
        }

        // 2. Categories
        const catList = document.getElementById("facetCategoriesList");
        if (catList) {
          catList.innerHTML = "";
          const uniqueCats = [...new Set(allItems.map(i => i.Category))].filter(Boolean).sort();
          uniqueCats.forEach(c => {
            const count = allItems.filter(i => i.Category === c).length;
            const cName = c.split(":")[1]?.trim() || c;
            const label = document.createElement("label");
            label.className = "myntra-facet-item";
            label.innerHTML = `
              <input type="checkbox" value="${c}" ${selectedCategories.has(c) ? "checked" : ""}>
              <span class="facet-name">${cName}</span>
              <span class="facet-count">(${count})</span>
            `;
            const cb = label.querySelector("input");
            cb.onchange = () => {
              if (cb.checked) selectedCategories.add(c);
              else selectedCategories.delete(c);
              displayLimit = 48;
              applyFiltersAndRender();
            };
            catList.appendChild(label);
          });
        }

        // 3. Materials
        const matList = document.getElementById("facetMaterialsList");
        if (matList) {
          matList.innerHTML = "";
          materialMatchers.forEach(m => {
            const count = allItems.filter(m.match).length;
            const label = document.createElement("label");
            label.className = "myntra-facet-item";
            label.innerHTML = `
              <input type="checkbox" value="${m.id}" ${selectedMaterials.has(m.id) ? "checked" : ""}>
              <span class="facet-name">${m.label}</span>
              <span class="facet-count">(${count})</span>
            `;
            const cb = label.querySelector("input");
            cb.onchange = () => {
              if (cb.checked) selectedMaterials.add(m.id);
              else selectedMaterials.delete(m.id);
              displayLimit = 48;
              applyFiltersAndRender();
            };
            matList.appendChild(label);
          });
        }

        // 4. Price Tiers
        const priceList = document.getElementById("facetPriceList");
        if (priceList) {
          priceList.innerHTML = "";
          priceTiers.forEach(t => {
            const count = allItems.filter(i => {
              const v = getFobValue(i);
              return v >= t.min && v < t.max;
            }).length;
            const label = document.createElement("label");
            label.className = "myntra-facet-item";
            label.innerHTML = `
              <input type="checkbox" value="${t.id}" ${selectedPriceTiers.has(t.id) ? "checked" : ""}>
              <span class="facet-name">${t.label}</span>
              <span class="facet-count">(${count})</span>
            `;
            const cb = label.querySelector("input");
            cb.onchange = () => {
              if (cb.checked) selectedPriceTiers.add(t.id);
              else selectedPriceTiers.delete(t.id);
              displayLimit = 48;
              applyFiltersAndRender();
            };
            priceList.appendChild(label);
          });
        }

        // 5. Amazon Count
        if (amazonCountEl) {
          const azCount = allItems.filter(i => parseFloat(i.CBM) <= 0.015).length;
          amazonCountEl.textContent = `(${azCount})`;
        }
      }

      // Filter & Sort Core
      let filteredItems = [...allItems];

      function filterItems() {
        return allItems.filter(item => {
          // Division filter
          if (selectedDivisions.size > 0) {
            const matchDiv = [...selectedDivisions].some(divId => {
              const d = divisions.find(x => x.id === divId);
              return d && d.prefixes.some(pre => (item.Category || '').startsWith(pre));
            });
            if (!matchDiv) return false;
          }

          // Category filter
          if (selectedCategories.size > 0) {
            if (!selectedCategories.has(item.Category)) return false;
          }

          // Material filter
          if (selectedMaterials.size > 0) {
            const hasMat = [...selectedMaterials].some(matId => {
              const matcher = materialMatchers.find(m => m.id === matId);
              return matcher ? matcher.match(item) : false;
            });
            if (!hasMat) return false;
          }

          // Price filter
          if (selectedPriceTiers.size > 0) {
            const val = getFobValue(item);
            const hasPrice = [...selectedPriceTiers].some(tierId => {
              const t = priceTiers.find(p => p.id === tierId);
              return t ? (val >= t.min && val < t.max) : false;
            });
            if (!hasPrice) return false;
          }

          // Amazon Ready (CBM <= 0.015)
          if (amazonOnly) {
            if (parseFloat(item.CBM) > 0.015) return false;
          }

          // Search query
          if (searchQuery) {
            const haystack = `${item.SKU} ${item.Product_Name} ${item.Category} ${item.Material_Construction} ${item.Style_Trend} ${item.Target_Buyers} ${item.Description || ''}`.toLowerCase();
            if (!haystack.includes(searchQuery)) return false;
          }

          return true;
        });
      }

      function sortItems(items) {
        if (currentSort === "price-asc") {
          items.sort((a, b) => getFobValue(a) - getFobValue(b));
        } else if (currentSort === "price-desc") {
          items.sort((a, b) => getFobValue(b) - getFobValue(a));
        } else if (currentSort === "cbm-asc") {
          items.sort((a, b) => (parseFloat(a.CBM) || 0) - (parseFloat(b.CBM) || 0));
        } else if (currentSort === "name-asc") {
          items.sort((a, b) => a.Product_Name.localeCompare(b.Product_Name));
        } else {
          items.sort((a, b) => (a.SKU || '').localeCompare(b.SKU || ''));
        }
      }

      function applyFiltersAndRender() {
        filteredItems = filterItems();
        sortItems(filteredItems);

        const itemsToDisplay = filteredItems.slice(0, displayLimit);

        if (visibleCountEl) visibleCountEl.textContent = itemsToDisplay.length;
        if (totalCountEl) totalCountEl.textContent = filteredItems.length;

        if (currentViewMode === 'grid') {
          renderGrid(itemsToDisplay);
        } else {
          renderTable(itemsToDisplay);
        }

        if (btnMore && btnAll) {
          if (displayLimit >= filteredItems.length) {
            btnMore.style.display = "none";
            btnAll.style.display = "none";
          } else {
            btnMore.style.display = "inline-block";
            btnAll.style.display = "inline-block";
          }
        }
      }

      function renderGrid(itemsToDisplay) {
        if (!gridContainer) return;
        gridContainer.innerHTML = "";

        if (itemsToDisplay.length === 0) {
          gridContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #FFF; border-radius: 12px; border: 1px solid #E5DCD0;">
              <h3 style="font-family: var(--font-cinzel, serif); color: #1A1410; margin-bottom: 8px;">No matching export products</h3>
              <p style="color: #7A6C5F; font-size: 0.88rem; margin-bottom: 16px;">Try clearing filters or broadening search parameters.</p>
              <button type="button" class="myntra-page-btn" id="emptyResetBtn" style="padding: 10px 20px; background: #1A1410; color: #FFF; border-radius: 6px; cursor: pointer;">Reset All Filters</button>
            </div>
          `;
          const reset = document.getElementById("emptyResetBtn");
          if (reset) reset.onclick = resetAllFilters;
          return;
        }

        itemsToDisplay.forEach(item => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <div class="card-image-wrapper" onclick="window.openProductSpec && window.openProductSpec('${item.SKU}')" style="cursor: pointer;">
              <span class="card-badge">SKU: ${item.SKU}</span>
              <img src="${item.Image}" alt="${item.Product_Name}" loading="lazy" onerror="this.src='../assets/charcuterie_board_deluxe.jpg'">
            </div>
            <div class="card-content">
              <span class="card-category">${item.Category.split(":")[1]?.trim() || item.Category}</span>
              <h3 class="card-title" onclick="window.openProductSpec && window.openProductSpec('${item.SKU}')" style="cursor: pointer;" title="${item.Product_Name}">${item.Product_Name}</h3>
              <p class="card-description">${item.Material_Construction}</p>
              <div class="card-specs">
                <span><strong>Dim:</strong> ${item.Dimensions.split("/")[0]}</span>
                <span><strong>CBM:</strong> ${item.CBM}</span>
                <span><strong>FOB:</strong> ${item.FOB_Mundra_USD}</span>
              </div>
              <div style="font-size: 0.8rem; color: #665C54; margin-top: 6px; display: flex; justify-content: space-between;">
                <span><strong>Retail:</strong> ${item.Western_Retail_USD}</span>
                <span><strong>MOQ:</strong> ${item.MOQ || '25 Pcs'}</span>
              </div>
              <div class="target-buyer-tag">Target: ${item.Target_Buyers}</div>
              <div class="card-actions">
                <button class="card-btn-add" data-sku="${item.SKU}">+ Add to RFQ</button>
                <button class="btn-spec" data-sku="${item.SKU}" title="View Full Export Spec Sheet">Specs ℹ</button>
              </div>
            </div>
          `;
          gridContainer.appendChild(card);
        });

        initActionButtons(gridContainer);
      }

      function renderTable(itemsToDisplay) {
        if (!tbody) return;
        tbody.innerHTML = "";

        if (itemsToDisplay.length === 0) {
          tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 40px; color: var(--text-muted);">No matching products found.</td></tr>`;
          return;
        }

        itemsToDisplay.forEach(item => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>
              <img src="${item.Image}" alt="${item.Product_Name}" class="table-thumb" onclick="window.openProductSpec && window.openProductSpec('${item.SKU}')" onerror="this.src='../assets/charcuterie_board_deluxe.jpg'">
            </td>
            <td><strong>${item.SKU}</strong></td>
            <td>
              <div style="font-weight: 600; cursor: pointer; color: var(--primary);" onclick="window.openProductSpec && window.openProductSpec('${item.SKU}')">${item.Product_Name}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${item.Style_Trend} • ${item.Target_Buyers}</div>
            </td>
            <td style="font-size: 0.78rem;">${item.Category.split(":")[1]?.trim() || item.Category}</td>
            <td style="font-size: 0.78rem; max-width: 220px;">${item.Material_Construction}</td>
            <td style="white-space: nowrap;">${item.Dimensions.split("/")[0]}</td>
            <td><strong>${item.CBM}</strong></td>
            <td style="color: var(--accent-bronze); font-weight: 700; white-space: nowrap;">${item.FOB_Mundra_USD}</td>
            <td style="white-space: nowrap;">${item.MOQ || '25 Pcs'}</td>
            <td style="text-align: right; white-space: nowrap;">
              <button class="btn-spec" data-sku="${item.SKU}" style="padding: 5px 10px; font-size: 0.76rem; margin-right: 4px;">Specs</button>
              <button class="card-btn-add" data-sku="${item.SKU}" style="padding: 6px 12px; font-size: 0.76rem;">+ RFQ</button>
            </td>
          `;
          tbody.appendChild(tr);
        });

        initActionButtons(tbody);
      }

      function initActionButtons(container) {
        if (window.bindSpecTriggers) window.bindSpecTriggers();

        container.querySelectorAll(".card-btn-add").forEach(btn => {
          btn.onclick = (e) => {
            e.stopPropagation();
            const sku = btn.getAttribute("data-sku");
            if (window.RFQCart) {
              window.RFQCart.add(sku);
              btn.textContent = "✓ Added";
              btn.style.background = "#2E7D32";
              setTimeout(() => {
                btn.textContent = (currentViewMode === 'table') ? "+ RFQ" : "+ Add to RFQ";
                btn.style.background = "";
              }, 1200);
            }
          };
        });

        container.querySelectorAll(".btn-spec").forEach(btn => {
          btn.onclick = (e) => {
            e.stopPropagation();
            const sku = btn.getAttribute("data-sku");
            if (window.openProductSpec) {
              window.openProductSpec(sku);
            }
          };
        });
      }

      function resetAllFilters() {
        selectedDivisions.clear();
        selectedCategories.clear();
        selectedMaterials.clear();
        selectedPriceTiers.clear();
        amazonOnly = false;
        searchQuery = '';
        currentSort = 'default';
        displayLimit = 48;
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'default';
        if (sortSelectMobile) sortSelectMobile.value = 'default';
        if (amazonCb) amazonCb.checked = false;
        renderSidebarFacets();
        applyFiltersAndRender();
      }

      // Event Listeners
      if (clearAllBtn) clearAllBtn.onclick = resetAllFilters;

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          searchQuery = e.target.value.toLowerCase().trim();
          displayLimit = 48;
          applyFiltersAndRender();
        });
      }

      if (amazonCb) {
        amazonCb.onchange = () => {
          amazonOnly = amazonCb.checked;
          displayLimit = 48;
          applyFiltersAndRender();
        };
      }

      if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
          currentSort = e.target.value;
          if (sortSelectMobile) sortSelectMobile.value = currentSort;
          applyFiltersAndRender();
        });
      }

      if (sortSelectMobile) {
        sortSelectMobile.addEventListener("change", (e) => {
          currentSort = e.target.value;
          if (sortSelect) sortSelect.value = currentSort;
          applyFiltersAndRender();
        });
      }

      if (viewGridBtn && viewTableBtn && gridContainer && tableWrap) {
        viewGridBtn.addEventListener("click", () => {
          currentViewMode = 'grid';
          viewGridBtn.classList.add("active");
          viewTableBtn.classList.remove("active");
          gridContainer.style.display = "grid";
          tableWrap.style.display = "none";
          applyFiltersAndRender();
        });

        viewTableBtn.addEventListener("click", () => {
          currentViewMode = 'table';
          viewTableBtn.classList.add("active");
          viewGridBtn.classList.remove("active");
          gridContainer.style.display = "none";
          tableWrap.style.display = "block";
          applyFiltersAndRender();
        });
      }

      if (btnMore) {
        btnMore.addEventListener("click", () => {
          displayLimit += 48;
          applyFiltersAndRender();
        });
      }

      if (btnAll) {
        btnAll.addEventListener("click", () => {
          displayLimit = filteredItems.length;
          applyFiltersAndRender();
        });
      }

      // URL Query Parameters Handling
      const urlParams = new URLSearchParams(window.location.search);
      const urlCat = urlParams.get("cat");
      const urlQuery = urlParams.get("q");
      const urlDiv = urlParams.get("div") || urlParams.get("dept");

      if (urlDiv) {
        const foundDiv = divisions.find(d => d.id === urlDiv.toLowerCase() || d.name.toLowerCase().includes(urlDiv.toLowerCase()));
        if (foundDiv) selectedDivisions.add(foundDiv.id);
      }
      if (urlCat) {
        const foundCat = allItems.find(i => (i.Category || '').toLowerCase().includes(urlCat.toLowerCase()));
        if (foundCat) selectedCategories.add(foundCat.Category);
      }
      if (urlQuery) {
        searchQuery = urlQuery.toLowerCase().trim();
        if (searchInput) searchInput.value = urlQuery;
      }

      // Initial Run
      renderSidebarFacets();
      applyFiltersAndRender();
    })();
  </script>"""

html = re.sub(r'<script>\s*\(function\(\)\s*\{.*?\}\)\(\);\s*</script>', new_script, html, flags=re.DOTALL)

with open(CATALOG_PATH, 'w', encoding='utf-8') as f:
    f.write(html)

print("catalog.html converted successfully to Myntra vertical sidebar layout!")
