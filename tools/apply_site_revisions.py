import re
import os

BASE_DIR = '/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts'

# 1. NAVBAR HTML WITH HOVER DROPDOWNS FOR EVERY DEPARTMENT
NAVBAR_NAV_LINKS = '''      <nav class="nav-links">
        <!-- Living & Dining -->
        <div class="dropdown">
          <a href="living-dining.html" class="nav-item dropbtn">Living & Dining ▾</a>
          <div class="dropdown-content dept-dropdown-menu">
            <div class="dept-dropdown-cols">
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Living &amp; Lounge</span>
                <ul class="dept-drop-list">
                  <li><a href="living-dining.html">Living Tables &amp; Accents</a></li>
                  <li><a href="living-dining.html">Live-Edge Sheesham Slabs</a></li>
                  <li><a href="living-dining.html">Occasional &amp; C-Tables</a></li>
                  <li><a href="living-dining.html">Coffee Table Sets</a></li>
                  <li><a href="living-dining.html">Media &amp; TV Lowboys</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Dining &amp; Seating</span>
                <ul class="dept-drop-list">
                  <li><a href="living-dining.html">Dining Tables &amp; Trestles</a></li>
                  <li><a href="living-dining.html">Solid Timber Dining Benches</a></li>
                  <li><a href="living-dining.html">Turned Wood Counter Stools</a></li>
                  <li><a href="living-dining.html">Industrial Swivel Bar Stools</a></li>
                  <li><a href="living-dining.html">Handcrafted Dining Chairs</a></li>
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
                  <li><a href="case-goods.html">Moorish Jaali 3-Door Credenzas</a></li>
                  <li><a href="case-goods.html">4-Door Hardwood Sideboards</a></li>
                  <li><a href="case-goods.html">Fluted Mango Accent Cabinets</a></li>
                  <li><a href="case-goods.html">Industrial Apothecary Chests</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Shelving &amp; Cellar</span>
                <ul class="dept-drop-list">
                  <li><a href="case-goods.html">Slatted Media Consoles (64&quot;)</a></li>
                  <li><a href="case-goods.html">Tall Étagères &amp; Bookcases</a></li>
                  <li><a href="case-goods.html">Wine Cellar Stave Displays</a></li>
                  <li><a href="case-goods.html">Kitchen Prep &amp; Island Carts</a></li>
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
                  <li><a href="tabletop.html">End-Grain Butcher Blocks</a></li>
                  <li><a href="tabletop.html">Live-Edge Charcuterie Boards</a></li>
                  <li><a href="tabletop.html">Marble &amp; Acacia Platters</a></li>
                  <li><a href="tabletop.html">Turned Wooden Salad Bowls</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Barware &amp; Coffee</span>
                <ul class="dept-drop-list">
                  <li><a href="tabletop.html">Whiskey Smoker &amp; Bar Kits</a></li>
                  <li><a href="tabletop.html">Solid Wood Salt &amp; Pepper Mills</a></li>
                  <li><a href="tabletop.html">Wall Coffee Mug Displays</a></li>
                  <li><a href="tabletop.html">Cast Iron Cookware &amp; Trivets</a></li>
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
                  <li><a href="wall-decor.html">Pierced Iron Jaali Panels</a></li>
                  <li><a href="wall-decor.html">Cathedral Jharokha Mirrors</a></li>
                  <li><a href="wall-decor.html">Full-Length Dressing Glasses</a></li>
                  <li><a href="wall-decor.html">Kinetic Heritage Wall Clocks</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Lighting &amp; Hearth</span>
                <ul class="dept-drop-list">
                  <li><a href="wall-decor.html">Pierced Ambient Lanterns</a></li>
                  <li><a href="wall-decor.html">Wood Bead Chandeliers</a></li>
                  <li><a href="wall-decor.html">Fireplace Tool Sets &amp; Hoppers</a></li>
                  <li><a href="wall-decor.html">Coat Racks &amp; Antler Hooks</a></li>
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
                  <li><a href="collections.html?dept=lifestyle">Ergonomic Desk Risers</a></li>
                  <li><a href="collections.html?dept=lifestyle">Locking Jewelry Armoires</a></li>
                  <li><a href="collections.html?dept=lifestyle">Teak &amp; Hardwood Bath Caddies</a></li>
                  <li><a href="collections.html?dept=lifestyle">Solid Wood Chess &amp; Board Games</a></li>
                </ul>
              </div>
              <div class="dept-dropdown-col">
                <span class="dept-drop-heading">Outdoor &amp; Heritage</span>
                <ul class="dept-drop-list">
                  <li><a href="collections.html?dept=lifestyle">Architectural Garden Arbors</a></li>
                  <li><a href="collections.html?dept=lifestyle">Elevated Dog Bowl Feeders</a></li>
                  <li><a href="collections.html?dept=lifestyle">Montessori Toys &amp; Games</a></li>
                  <li><a href="collections.html?dept=lifestyle">Carved Meditation Shrines</a></li>
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
                <li><a href="living-dining.html">Coffee &amp; Accent Tables</a></li>
                <li><a href="living-dining.html">Dining Tables &amp; Trestles</a></li>
                <li><a href="living-dining.html">Bar Stools &amp; Counter Chairs</a></li>
                <li><a href="living-dining.html">Hospitality Benches</a></li>
                <li><a href="living-dining.html">Patio &amp; Balcony Living</a></li>
              </ul>
              <h4 class="mega-heading" style="margin-top: 14px;"><a href="case-goods.html">Cabinetry &amp; Storage</a></h4>
              <ul class="mega-links-list">
                <li><a href="case-goods.html">Credenzas &amp; Sideboards</a></li>
                <li><a href="case-goods.html">Bookcases &amp; Étagères</a></li>
                <li><a href="case-goods.html">Apothecary Drawer Chests</a></li>
                <li><a href="case-goods.html">Slatted Media Consoles</a></li>
              </ul>
            </div>

            <!-- Col 2: Kitchen & Tabletop -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="tabletop.html">Kitchen &amp; Entertaining</a></h4>
              <ul class="mega-links-list">
                <li><a href="tabletop.html">Charcuterie &amp; Serveware</a></li>
                <li><a href="tabletop.html">Barware &amp; Whiskey Gear</a></li>
                <li><a href="tabletop.html">Home Barista &amp; Coffee Bar</a></li>
                <li><a href="tabletop.html">BBQ &amp; Carving Boards</a></li>
                <li><a href="tabletop.html">Trays &amp; Ottoman Boards</a></li>
                <li><a href="tabletop.html">Table Linens &amp; Chargers</a></li>
                <li><a href="tabletop.html">Pantry &amp; Knife Storage</a></li>
              </ul>
            </div>

            <!-- Col 3: Wall Decor & Mirrors -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="wall-decor.html">Wall Decor &amp; Mirrors</a></h4>
              <ul class="mega-links-list">
                <li><a href="wall-decor.html">Pierced Iron Jaali Panels</a></li>
                <li><a href="wall-decor.html">Cathedral Jharokha Mirrors</a></li>
                <li><a href="wall-decor.html">Floor &amp; Dressing Glasses</a></li>
                <li><a href="wall-decor.html">Gallery Rails &amp; Frames</a></li>
                <li><a href="wall-decor.html">Kinetic Wall Clocks</a></li>
                <li><a href="wall-decor.html">Coat Racks &amp; Antler Hooks</a></li>
              </ul>
            </div>

            <!-- Col 4: Lighting & Hearth -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="wall-decor.html">Lighting &amp; Ambiance</a></h4>
              <ul class="mega-links-list">
                <li><a href="wall-decor.html">Chandeliers &amp; Pendants</a></li>
                <li><a href="wall-decor.html">Pierced Iron Lanterns</a></li>
                <li><a href="wall-decor.html">Candles &amp; Candelabras</a></li>
                <li><a href="wall-decor.html">Torches &amp; Fire Bowls</a></li>
              </ul>
              <h4 class="mega-heading" style="margin-top: 14px;"><a href="wall-decor.html">Fireplace &amp; Hearthcraft</a></h4>
              <ul class="mega-links-list">
                <li><a href="wall-decor.html">Hand-Forged Tool Sets</a></li>
                <li><a href="wall-decor.html">Wood Storage &amp; Mantels</a></li>
              </ul>
            </div>

            <!-- Col 5: Garden, Office & Lifestyle -->
            <div class="myntra-mega-col">
              <h4 class="mega-heading"><a href="collections.html?dept=lifestyle">Garden &amp; Lifestyle</a></h4>
              <ul class="mega-links-list">
                <li><a href="collections.html?dept=lifestyle">Arbors, Trellises &amp; Planters</a></li>
                <li><a href="collections.html?dept=lifestyle">Desk Organizers &amp; Tech Risers</a></li>
                <li><a href="collections.html?dept=lifestyle">Jewelry &amp; Keepsake Chests</a></li>
                <li><a href="collections.html?dept=lifestyle">Spa &amp; Bathtub Caddies</a></li>
                <li><a href="collections.html?dept=lifestyle">Luxury Pet Furniture</a></li>
                <li><a href="collections.html?dept=lifestyle">Handcrafted Chess &amp; Games</a></li>
                <li><a href="collections.html?dept=lifestyle">Architectural Hardware &amp; Pulls</a></li>
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

print("Navbar snippet prepared.")
