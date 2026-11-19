import re
import os

BASE_DIR = '/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts'

# Read the standard nav links from apply_site_revisions.py
with open(f'{BASE_DIR}/tools/apply_site_revisions.py', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'NAVBAR_NAV_LINKS = \'\'\'([\s\S]*?)\'\'\'', text)
if not m:
    print("Could not find NAVBAR_NAV_LINKS")
    exit(1)

nav_html = m.group(1).strip()

pages = [
    'website/index.html',
    'website/collections.html',
    'website/catalog.html',
    'website/case-goods.html',
    'website/living-dining.html',
    'website/tabletop.html',
    'website/wall-decor.html',
    'website/compliance.html',
    'website/rfq.html',
    'website/trade.html'
]

pattern = re.compile(r'<nav class="nav-links">[\s\S]*?</nav>', re.DOTALL)

for p in pages:
    file_path = os.path.join(BASE_DIR, p)
    if not os.path.exists(file_path):
        print(f"Skipping {p}: not found")
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub(nav_html, content, count=1)
        # Also bump cache busters
        new_content = re.sub(r'style\.css\?v=[a-zA-Z0-9\.]+', 'style.css?v=2026.40', new_content)
        new_content = re.sub(r'app\.js\?v=[a-zA-Z0-9\.]+', 'app.js?v=2026.40', new_content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated navbar and version tags in: {p}")
    else:
        print(f"Nav pattern not matched in {p}")

