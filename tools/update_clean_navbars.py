import re
import os

BASE_DIR = '/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts'

CLEAN_NAV_LINKS = '''      <nav class="nav-links">
        <!-- Master Categories Directory Dropdown -->
        <div class="dropdown dropdown-categories">
          <a href="collections.html" class="dropbtn nav-item" id="navCategoriesBtn">Categories ▾</a>
          <div class="dropdown-content dropdown-two-panel">
            <!-- Mega Tabs Header -->
            <div class="mega-tabs-header">
              <div class="mega-view-switch">
                <button type="button" class="mega-tab-btn active" id="megaTabInteractive">✦ Interactive Explorer</button>
                <button type="button" class="mega-tab-btn" id="megaTabMyntra">▦ Full 50-Category Taxonomy</button>
              </div>
              <span class="mega-tag-right">500 SKUs • 8 Master Divisions • FOB Mundra</span>
            </div>

            <!-- Tab 1: Endeavor 2-Panel View -->
            <div class="mega-tab-view active" id="megaInteractivePane">
              <div class="mega-two-panel-body">
                <div class="mega-panel-left">
                  <div class="mega-panel-title">Major Export Divisions</div>
                  <div class="mega-divisions-list" id="megaNavDivisionList"></div>
                </div>
                <div class="mega-panel-right" id="megaNavPreviewRight"></div>
              </div>
            </div>

            <!-- Tab 2: Myntra 5-Column Taxonomy View -->
            <div class="mega-tab-view" id="megaMyntraPane" style="display: none; padding: 22px 28px;">
              <div class="myntra-mega-menu" style="position: static; transform: none; width: 100%; box-shadow: none; border: none; padding: 0;">
                <!-- Col 1: Furniture & Seating -->
                <div class="myntra-mega-col">
                  <h4 class="mega-heading"><a href="living-dining.html">Living &amp; Dining (50)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="living-dining.html?cat=cat-03">Coffee &amp; Accent Tables</a></li>
                    <li><a href="living-dining.html?cat=cat-05">Dining Tables &amp; Seating</a></li>
                    <li><a href="living-dining.html?cat=cat-47">Bar Stools &amp; Counter Chairs</a></li>
                    <li><a href="living-dining.html?cat=cat-14">Luxury Bedroom Accents</a></li>
                    <li><a href="living-dining.html?cat=cat-33">Hospitality Luggage Racks</a></li>
                  </ul>
                  <h4 class="mega-heading" style="margin-top: 14px;"><a href="case-goods.html">Case Goods &amp; Storage (70)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="case-goods.html?cat=cat-04">Credenzas &amp; Media Buffets</a></li>
                    <li><a href="case-goods.html?cat=cat-07">Wall Shelves &amp; Organizers</a></li>
                    <li><a href="case-goods.html?cat=cat-28">Bookshelves &amp; Étagères</a></li>
                    <li><a href="case-goods.html?cat=cat-13">Entryway Mudroom Utility</a></li>
                    <li><a href="case-goods.html?cat=cat-25">Vinyl Record Storage Crates</a></li>
                    <li><a href="case-goods.html?cat=cat-32">Laundry &amp; Mudroom Utility</a></li>
                    <li><a href="case-goods.html?cat=cat-44">Kitchen Island Butcher Blocks</a></li>
                  </ul>
                </div>

                <!-- Col 2: Kitchen, Tabletop & Culinary -->
                <div class="myntra-mega-col">
                  <h4 class="mega-heading"><a href="tabletop.html">Kitchen &amp; Culinary (70)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="tabletop.html?cat=cat-01">Charcuterie &amp; Salad Bowls</a></li>
                    <li><a href="tabletop.html?cat=cat-09">Barware &amp; Mobile Bar Carts</a></li>
                    <li><a href="tabletop.html?cat=cat-15">Magnetic Knife Strips &amp; Spice</a></li>
                    <li><a href="tabletop.html?cat=cat-22">Pour-Over Barista Stations</a></li>
                    <li><a href="tabletop.html?cat=cat-31">Wine Riddling Racks &amp; Cellars</a></li>
                    <li><a href="tabletop.html?cat=cat-37">Charger Plates &amp; Table Accents</a></li>
                    <li><a href="tabletop.html?cat=cat-40">Ottoman Serving Boards</a></li>
                  </ul>
                </div>

                <!-- Col 3: Wall Decor, Mirrors & Clocks -->
                <div class="myntra-mega-col">
                  <h4 class="mega-heading"><a href="wall-decor.html">Wall Decor &amp; Mirrors (60)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="wall-decor.html?cat=cat-02">Pierced Iron Jaali Sconces</a></li>
                    <li><a href="wall-decor.html?cat=cat-16">Kinetic Gear &amp; Sunburst Clocks</a></li>
                    <li><a href="wall-decor.html?cat=cat-38">Stag Antler &amp; Railroad Hooks</a></li>
                    <li><a href="wall-decor.html?cat=cat-39">Jharokha Arch Floor Leaners</a></li>
                    <li><a href="wall-decor.html?cat=cat-45">Solid Wood Gallery Rails</a></li>
                    <li><a href="wall-decor.html?cat=cat-48">Carved Island Corbels &amp; Grilles</a></li>
                  </ul>
                </div>

                <!-- Col 4: Lighting, Hearth & Outdoor -->
                <div class="myntra-mega-col">
                  <h4 class="mega-heading"><a href="collections.html?division=lighting-hearth">Lighting &amp; Hearth (50)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="collections.html#cat-06">Pierced Ambient Lanterns</a></li>
                    <li><a href="collections.html#cat-12">5-Piece Fireplace Tool Sets</a></li>
                    <li><a href="collections.html#cat-26">Wood Bead Chandeliers</a></li>
                    <li><a href="collections.html#cat-35">Linear Table Candelabras</a></li>
                    <li><a href="collections.html#cat-41">Fireplace Screens &amp; Hoppers</a></li>
                  </ul>
                  <h4 class="mega-heading" style="margin-top: 14px;"><a href="collections.html?division=garden-outdoor">Garden &amp; Outdoor (60)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="collections.html#cat-10">Botanical Stands &amp; Planters</a></li>
                    <li><a href="collections.html#cat-24">BBQ Meat Carving Blocks</a></li>
                    <li><a href="collections.html#cat-30">Folding Bistro Sets &amp; Benches</a></li>
                    <li><a href="collections.html#cat-34">Arched Iron Garden Arbors</a></li>
                    <li><a href="collections.html#cat-43">Glass Wardian Terrariums</a></li>
                    <li><a href="collections.html#cat-50">Bioethanol Fire Bowls &amp; Torches</a></li>
                  </ul>
                </div>

                <!-- Col 5: Office, Kids & Cultural -->
                <div class="myntra-mega-col">
                  <h4 class="mega-heading"><a href="collections.html?division=office-vanity">Office &amp; Keepsakes (60)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="collections.html#cat-08">Book Keepsakes &amp; Paperweights</a></li>
                    <li><a href="collections.html#cat-23">Architectural Ironmongery Pulls</a></li>
                    <li><a href="collections.html#cat-27">Turned Hardwood Yarn Bowls</a></li>
                    <li><a href="collections.html#cat-29">Locking Hardwood Jewelry Chests</a></li>
                    <li><a href="collections.html#cat-36">Ergonomic Monitor Desk Risers</a></li>
                    <li><a href="collections.html#cat-42">Carved Memory Keepsake Urns</a></li>
                  </ul>
                  <h4 class="mega-heading" style="margin-top: 14px;"><a href="collections.html?division=kids-leisure">Kids, Pets &amp; Heritage (80)</a></h4>
                  <ul class="mega-links-list">
                    <li><a href="collections.html#cat-11">Spa Bathtub Caddies &amp; Mats</a></li>
                    <li><a href="collections.html#cat-17">Montessori Balance Boards</a></li>
                    <li><a href="collections.html#cat-18">Elevated Acacia Pet Feeders</a></li>
                    <li><a href="collections.html#cat-20">Jharokha Home Altars &amp; Chowkis</a></li>
                    <li><a href="collections.html#cat-21">Sheesham &amp; Boxwood Chess</a></li>
                    <li><a href="collections.html#cat-46">Children Activity Study Desks</a></li>
                    <li><a href="collections.html#cat-49">Hand-Carved Statuary &amp; Pagodas</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Mega Footer -->
            <div class="mega-footer-bar">
              <div class="mega-footer-sla">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #22C55E; display: inline-block;"></span>
                <span>✦ Direct Jodhpur Factory Consolidation • FOB Mundra • VRIKSH &amp; US Lacey Act Pre-Cleared</span>
              </div>
              <a href="collections.html" class="mega-footer-link">Browse Complete 50-Category Directory (500 SKUs) →</a>
            </div>
          </div>
        </div>

        <a href="../catalogue/arawali_arts_corporate_brochure.html" target="_blank" class="nav-item nav-link-catalogue">Export Catalogue ↗</a>

        <div class="nav-actions">
          <button type="button" class="nav-search-trigger" id="nav-cmd-k-btn" aria-label="Search Catalog (Cmd+K)">
            <span class="search-icon">🔍</span>
            <span class="search-text">Search</span>
            <kbd class="search-kbd">⌘K</kbd>
          </button>
          <a href="rfq.html" class="nav-cart-trigger" aria-label="RFQ Cart">
            <span class="cart-icon">📦</span>
            <span class="cart-label">RFQ</span>
            <span class="cart-badge nav-rfq-count">0</span>
          </a>
          <a href="rfq.html" class="nav-cta-btn">Request an RFQ</a>
        </div>
      </nav>'''

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
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub(CLEAN_NAV_LINKS, content, count=1)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Applied clean navbar to {p}")
