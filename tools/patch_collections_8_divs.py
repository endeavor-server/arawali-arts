import re

with open('/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts/website/collections.html', 'r', encoding='utf-8') as f:
    text = f.read()

old_div_markup = '''          <!-- Facet Group 2: Master Product Division -->
          <div class="sidebar-facet-group">
            <div class="facet-title">Category / Department</div>
            <div class="facet-options">
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="all" checked class="dept-checkbox-all">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">All Categories</span>
                <span class="facet-count">500</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="furniture" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🪑 Furniture & Storage</span>
                <span class="facet-count">140</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="kitchen" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🍷 Kitchen & Entertaining</span>
                <span class="facet-count">70</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="decor" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🏮 Architectural Decor</span>
                <span class="facet-count">130</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="lifestyle" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🌿 Lifestyle & Giftware</span>
                <span class="facet-count">160</span>
              </label>
            </div>
          </div>'''

new_div_markup = '''          <!-- Facet Group 2: 8 Major Export Manufacturing Divisions -->
          <div class="sidebar-facet-group">
            <div class="facet-title">Major Manufacturing Division</div>
            <div class="facet-options">
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="all" checked class="dept-checkbox-all">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">All 50 Categories</span>
                <span class="facet-count">500</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="living-dining" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🪑 Living & Dining</span>
                <span class="facet-count">50</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="case-goods" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🗄️ Case Goods & Storage</span>
                <span class="facet-count">70</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="kitchen-tabletop" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🍷 Kitchen & Culinary</span>
                <span class="facet-count">70</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="architectural-decor" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🏮 Wall Decor & Mirrors</span>
                <span class="facet-count">60</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="lighting-hearth" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🕯️ Lighting & Hearthcraft</span>
                <span class="facet-count">50</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="outdoor-living" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🌿 Garden & Outdoor</span>
                <span class="facet-count">60</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="office-vanity" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">💼 Office & Vanity</span>
                <span class="facet-count">60</span>
              </label>
              <label class="facet-checkbox">
                <input type="checkbox" name="deptFilter" value="kids-heritage" class="dept-checkbox-item">
                <span class="facet-check-indicator"></span>
                <span class="facet-check-text">🧸 Kids, Pets & Heritage</span>
                <span class="facet-count">80</span>
              </label>
            </div>
          </div>'''

if old_div_markup in text:
    text = text.replace(old_div_markup, new_div_markup)
    print("Replaced sidebar divisions markup!")
else:
    print("Old div markup not found.")

# Update URL parsing for legacy dept values
old_url_dept = '''      if (urlDept) {
        const targetCb = document.querySelector(`.dept-checkbox-item[value="${urlDept}"]`);
        if (targetCb) {
          targetCb.checked = true;
          handleDeptChange();
        }
      }'''

new_url_dept = '''      if (urlDept || urlParams.get("division")) {
        const dVal = (urlDept || urlParams.get("division")).toLowerCase();
        // Support legacy mappings
        const mapping = {
          'lifestyle': ['lifestyle', 'office-vanity', 'outdoor-living', 'kids-heritage'],
          'furniture': ['furniture', 'living-dining', 'case-goods'],
          'kitchen': ['kitchen', 'kitchen-tabletop'],
          'decor': ['decor', 'architectural-decor', 'lighting-hearth']
        };
        const targets = mapping[dVal] || [dVal];
        let matched = false;
        targets.forEach(t => {
          const targetCb = document.querySelector(`.dept-checkbox-item[value="${t}"]`);
          if (targetCb) {
            targetCb.checked = true;
            matched = true;
          }
        });
        if (matched) {
          handleDeptChange();
        }
      }'''

if old_url_dept in text:
    text = text.replace(old_url_dept, new_url_dept)
    print("Updated URL dept param handler!")

with open('/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts/website/collections.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved collections.html successfully.")
