import re
import os

BASE_DIR = '/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts'

# 1. Update app.js initMyntraCatalogPage to support URL params
app_js_path = os.path.join(BASE_DIR, 'website/app.js')
with open(app_js_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

target = '  // State\n  let selectedCategories = new Set();'
replacement = '''  // State
  let selectedCategories = new Set();
  
  // URL Pre-selection
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || window.location.hash.replace('#', '');
    if (catParam) {
      const pLow = catParam.toLowerCase().trim();
      const matched = allSubcats.find(c => {
        const cLow = c.toLowerCase();
        if (cLow.includes(pLow)) return true;
        if (pLow.startsWith('cat-')) {
          const num = parseInt(pLow.replace('cat-', ''), 10);
          if (num && cLow.startsWith(`cat ${num}:`) || cLow.startsWith(`cat 0${num}:`)) return true;
        }
        return false;
      });
      if (matched) {
        selectedCategories.add(matched);
      }
    }
  } catch (e) {}'''

if target in app_js:
    app_js = app_js.replace(target, replacement, 1)
    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(app_js)
    print("app.js updated with URL pre-selection support.")
else:
    print("Target not found in app.js (already patched or different whitespace).")

