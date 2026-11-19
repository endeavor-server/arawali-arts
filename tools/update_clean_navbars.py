import re
import os

BASE_DIR = '/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts'

CLEAN_NAV_LINKS = '''      <nav class="nav-links">
        <!-- Living & Dining -->
        <div class="dropdown">
          <a href="living-dining.html" class="nav-item dropbtn">Living & Dining ▾</a>
          <div class="dropdown-content dept-dropdown-menu">
            <div class="dept-dropdown-cols">
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Living &amp; Lounge</span>
                <ul class="dept-drop-list">
                  <li><a href="living-dining.html?cat=cat-03">Coffee &amp; Accent Tables</a></li>
                  <li><a href="living-dining.html?cat=cat-03">Live-Edge Sheesham Slabs</a></li>
                  <li><a href="living-dining.html?cat=cat-03">Occasional &amp; C-Tables</a></li>
                  <li><a href="living-dining.html?cat=cat-14">Luxury Bedroom Accents</a></li>
                  <li><a href="living-dining.html?cat=cat-33">Hospitality Luggage Racks</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Dining &amp; Seating</span>
                <ul class="dept-drop-list">
                  <li><a href="living-dining.html?cat=cat-05">Dining Tables &amp; Trestles</a></li>
                  <li><a href="living-dining.html?cat=cat-05">Solid Timber Benches</a></li>
                  <li><a href="living-dining.html?cat=cat-47">Turned Wood Counter Stools</a></li>
                  <li><a href="living-dining.html?cat=cat-47">Industrial Swivel Bar Stools</a></li>
                  <li><a href="living-dining.html?cat=cat-05">Handcrafted Dining Chairs</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col dept-dropdown-feature">
                <span class="dept-feature-tag">✦ 50 Master SKUs</span>
                <p class="dept-feature-text">8%–10% Kiln Moisture Equilibrium. Mortise-and-tenon breadboard joinery for zero splitting.</p>
                <a href="living-dining.html" class="dept-feature-cta">View Full Collection &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Cabinetry & Storage -->
        <div class="dropdown">
          <a href="case-goods.html" class="nav-item dropbtn">Cabinetry & Storage ▾</a>
          <div class="dropdown-content dept-dropdown-menu">
            <div class="dept-dropdown-cols">
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Buffets &amp; Credenzas</span>
                <ul class="dept-drop-list">
                  <li><a href="case-goods.html?cat=cat-04">Moorish Jaali 3-Door Credenzas</a></li>
                  <li><a href="case-goods.html?cat=cat-04">4-Door Hardwood Sideboards</a></li>
                  <li><a href="case-goods.html?cat=cat-04">Fluted Mango Accent Cabinets</a></li>
                  <li><a href="case-goods.html?cat=cat-04">Industrial Apothecary Chests</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Shelving &amp; Storage</span>
                <ul class="dept-drop-list">
                  <li><a href="case-goods.html?cat=cat-07">Home Organization &amp; Shelving</a></li>
                  <li><a href="case-goods.html?cat=cat-28">Tall Étagères &amp; Bookcases</a></li>
                  <li><a href="case-goods.html?cat=cat-25">Music &amp; Vinyl Record Storage</a></li>
                  <li><a href="case-goods.html?cat=cat-31">Wine Cellar &amp; Estate Storage</a></li>
                  <li><a href="case-goods.html?cat=cat-44">Kitchen Prep &amp; Island Carts</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col dept-dropdown-feature">
                <span class="dept-feature-tag">✦ 70 Master SKUs</span>
                <p class="dept-feature-text">European Blum-grade soft-close hardware, ISTA-1A drop tested, flat-pack KD engineering.</p>
                <a href="case-goods.html" class="dept-feature-cta">View Full Collection &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Kitchen & Entertaining -->
        <div class="dropdown">
          <a href="tabletop.html" class="nav-item dropbtn">Kitchen & Entertaining ▾</a>
          <div class="dropdown-content dept-dropdown-menu">
            <div class="dept-dropdown-cols">
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Serveware &amp; Boards</span>
                <ul class="dept-drop-list">
                  <li><a href="tabletop.html?cat=cat-01">End-Grain Butcher Blocks</a></li>
                  <li><a href="tabletop.html?cat=cat-01">Live-Edge Charcuterie Boards</a></li>
                  <li><a href="tabletop.html?cat=cat-40">Trays &amp; Ottoman Serving Boards</a></li>
                  <li><a href="tabletop.html?cat=cat-37">Table Linens &amp; Chargers</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Barware &amp; Coffee</span>
                <ul class="dept-drop-list">
                  <li><a href="tabletop.html?cat=cat-09">Whiskey Smoker &amp; Bar Kits</a></li>
                  <li><a href="tabletop.html?cat=cat-22">Home Barista Coffee Stations</a></li>
                  <li><a href="tabletop.html?cat=cat-15">Kitchen Organization &amp; Pantry</a></li>
                  <li><a href="tabletop.html?cat=cat-24">BBQ &amp; Outdoor Grill Woodcraft</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col dept-dropdown-feature">
                <span class="dept-feature-tag">✦ 70 Master SKUs</span>
                <p class="dept-feature-text">FDA food-safe certified lacquer. Proven high-velocity retail packaging via Naturehood flywheel.</p>
                <a href="tabletop.html" class="dept-feature-cta">View Full Collection &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Architectural Decor -->
        <div class="dropdown">
          <a href="wall-decor.html" class="nav-item dropbtn">Architectural Decor ▾</a>
          <div class="dropdown-content dept-dropdown-menu">
            <div class="dept-dropdown-cols">
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Wall Art &amp; Mirrors</span>
                <ul class="dept-drop-list">
                  <li><a href="wall-decor.html?cat=cat-02">Pierced Iron Jaali Panels</a></li>
                  <li><a href="wall-decor.html?cat=cat-39">Cathedral Jharokha Mirrors</a></li>
                  <li><a href="wall-decor.html?cat=cat-16">Kinetic Heritage Wall Clocks</a></li>
                  <li><a href="wall-decor.html?cat=cat-45">Solid Wood Gallery Rails</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Hooks &amp; Corbels</span>
                <ul class="dept-drop-list">
                  <li><a href="wall-decor.html?cat=cat-38">Coat Racks &amp; Antler Hooks</a></li>
                  <li><a href="wall-decor.html?cat=cat-48">Architectural Carved Corbels</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col dept-dropdown-feature">
                <span class="dept-feature-tag">✦ 60 Master SKUs</span>
                <p class="dept-feature-text">Authentic Jodhpur hand-hammered blacksmithing, rust-resistant matte finishes, CE/UL wireways.</p>
                <a href="wall-decor.html" class="dept-feature-cta">View Full Collection &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Lifestyle & Gifts -->
        <div class="dropdown">
          <a href="collections.html?dept=lifestyle" class="nav-item dropbtn">Lifestyle & Gifts ▾</a>
          <div class="dropdown-content dept-dropdown-menu">
            <div class="dept-dropdown-cols">
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Office &amp; Keepsakes</span>
                <ul class="dept-drop-list">
                  <li><a href="collections.html?cat=cat-08">Desk Accessories &amp; Stationery</a></li>
                  <li><a href="collections.html?cat=cat-29">Locking Jewelry Chests</a></li>
                  <li><a href="collections.html?cat=cat-11">Bathroom &amp; Spa Woodcraft</a></li>
                  <li><a href="collections.html?cat=cat-21">Handmade Chess &amp; Pastimes</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Garden &amp; Heritage</span>
                <ul class="dept-drop-list">
                  <li><a href="collections.html?cat=cat-10">Botanical Stands &amp; Planters</a></li>
                  <li><a href="collections.html?cat=cat-18">Luxury Pet Furniture</a></li>
                  <li><a href="collections.html?cat=cat-17">Montessori Children Toys</a></li>
                  <li><a href="collections.html?cat=cat-20">Sacred Meditation Shrines</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col dept-dropdown-feature">
                <span class="dept-feature-tag">✦ 80 Master SKUs</span>
                <p class="dept-feature-text">Luxury gift-box presentation, anti-tarnish velvet linings, and solid brass detailing.</p>
                <a href="collections.html?dept=lifestyle" class="dept-feature-cta">View Full Collection &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Wholesale -->
        <div class="dropdown">
          <a href="trade.html" class="nav-item dropbtn nav-item-trade">Wholesale ▾</a>
          <div class="dropdown-content dept-dropdown-menu" style="min-width: 440px;">
            <div class="dept-dropdown-cols" style="grid-template-columns: 1fr 1fr;">
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">B2B Trade Program</span>
                <ul class="dept-drop-list">
                  <li><a href="trade.html">20ft FCL Container Program</a></li>
                  <li><a href="trade.html">40ft HQ Volume Pricing</a></li>
                  <li><a href="trade.html">Commercial Sample Runs</a></li>
                  <li><a href="compliance.html">Lacey Act &amp; VRIKSH SLAs</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col dept-dropdown-feature">
                <span class="dept-feature-tag">✦ Factory Direct</span>
                <p class="dept-feature-text">Direct FOB Mundra container pricing with pre-cleared US customs documentation.</p>
                <a href="rfq.html" class="dept-feature-cta">Request Price List &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Master Categories Directory -->
        <div class="dropdown">
          <a href="collections.html" class="dropbtn nav-item">Categories ▾</a>
          <div class="dropdown-content myntra-mega-menu">
            <!-- Col 1: Furniture & Seating -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="living-dining.html">Living &amp; Dining</a></h4>
              <ul class="mega-links-list">
                <li><a href="living-dining.html?cat=cat-03">Coffee &amp; Accent Tables</a></li>
                <li><a href="living-dining.html?cat=cat-05">Dining Tables &amp; Trestles</a></li>
                <li><a href="living-dining.html?cat=cat-47">Bar Stools &amp; Counter Chairs</a></li>
                <li><a href="living-dining.html?cat=cat-14">Luxury Bedroom Accents</a></li>
                <li><a href="living-dining.html?cat=cat-33">Hospitality Luggage Racks</a></li>
              </ul>
              <h4 class="mega-heading" style="margin-top: 14px;"><a href="case-goods.html">Cabinetry &amp; Storage</a></h4>
              <ul class="mega-links-list">
                <li><a href="case-goods.html?cat=cat-04">Credenzas &amp; Sideboards</a></li>
                <li><a href="case-goods.html?cat=cat-07">Bookcases &amp; Étagères</a></li>
                <li><a href="case-goods.html?cat=cat-04">Apothecary Drawer Chests</a></li>
                <li><a href="case-goods.html?cat=cat-25">Vinyl Record Storage Crates</a></li>
              </ul>
            </div>

            <!-- Col 2: Kitchen & Tabletop -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="tabletop.html">Kitchen &amp; Entertaining</a></h4>
              <ul class="mega-links-list">
                <li><a href="tabletop.html?cat=cat-01">Charcuterie &amp; Serveware</a></li>
                <li><a href="tabletop.html?cat=cat-09">Barware &amp; Whiskey Gear</a></li>
                <li><a href="tabletop.html?cat=cat-22">Home Barista &amp; Coffee Bar</a></li>
                <li><a href="tabletop.html?cat=cat-24">BBQ &amp; Carving Boards</a></li>
                <li><a href="tabletop.html?cat=cat-40">Trays &amp; Ottoman Boards</a></li>
                <li><a href="tabletop.html?cat=cat-37">Table Linens &amp; Chargers</a></li>
                <li><a href="tabletop.html?cat=cat-15">Pantry &amp; Knife Storage</a></li>
              </ul>
            </div>

            <!-- Col 3: Wall Decor & Mirrors -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="wall-decor.html">Wall Decor &amp; Mirrors</a></h4>
              <ul class="mega-links-list">
                <li><a href="wall-decor.html?cat=cat-02">Pierced Iron Jaali Panels</a></li>
                <li><a href="wall-decor.html?cat=cat-39">Cathedral Jharokha Mirrors</a></li>
                <li><a href="wall-decor.html?cat=cat-39">Floor &amp; Dressing Glasses</a></li>
                <li><a href="wall-decor.html?cat=cat-45">Gallery Rails &amp; Frames</a></li>
                <li><a href="wall-decor.html?cat=cat-16">Kinetic Wall Clocks</a></li>
                <li><a href="wall-decor.html?cat=cat-38">Coat Racks &amp; Antler Hooks</a></li>
              </ul>
            </div>

            <!-- Col 4: Lighting & Hearth -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="collections.html?division=lighting-hearth">Lighting &amp; Ambiance</a></h4>
              <ul class="mega-links-list">
                <li><a href="collections.html?cat=cat-26">Chandeliers &amp; Pendants</a></li>
                <li><a href="collections.html?cat=cat-06">Pierced Iron Lanterns</a></li>
                <li><a href="collections.html?cat=cat-35">Candles &amp; Candelabras</a></li>
                <li><a href="collections.html?cat=cat-50">Torches &amp; Fire Bowls</a></li>
              </ul>
              <h4 class="mega-heading" style="margin-top: 14px;"><a href="collections.html?division=lighting-hearth">Fireplace &amp; Hearthcraft</a></h4>
              <ul class="mega-links-list">
                <li><a href="collections.html?cat=cat-12">Hand-Forged Tool Sets</a></li>
                <li><a href="collections.html?cat=cat-41">Wood Storage &amp; Mantels</a></li>
              </ul>
            </div>

            <!-- Col 5: Garden, Office & Lifestyle -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="collections.html?dept=lifestyle">Garden &amp; Lifestyle</a></h4>
              <ul class="mega-links-list">
                <li><a href="collections.html?cat=cat-34">Arbors, Trellises &amp; Planters</a></li>
                <li><a href="collections.html?cat=cat-08">Desk Organizers &amp; Tech Risers</a></li>
                <li><a href="collections.html?cat=cat-29">Jewelry &amp; Keepsake Chests</a></li>
                <li><a href="collections.html?cat=cat-11">Spa &amp; Bathtub Caddies</a></li>
                <li><a href="collections.html?cat=cat-18">Luxury Pet Furniture</a></li>
                <li><a href="collections.html?cat=cat-21">Handcrafted Chess &amp; Games</a></li>
                <li><a href="collections.html?cat=cat-23">Architectural Hardware &amp; Pulls</a></li>
              </ul>
            </div>

            <!-- Bottom Direct Link Bar -->
            <div class="myntra-mega-footer">
              <span class="mega-footer-tag">✦ 100% Solid Kiln-Dried Hardwood • Hand-Forged Wrought Iron • Mundra Port Direct</span>
              <a href="collections.html" class="mega-footer-view-all">View All 50 Export Categories (500 SKUs) →</a>
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

