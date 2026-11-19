const fs = require("fs");
const path = require("path");

const appJsPath = path.join(__dirname, "../website/app.js");

const jsCode = `
/* ==========================================================================
   MASTER 8 EXPORT DIVISIONS TAXONOMY & INTERACTIVE ENDEAVOR MEGA-MENU
   ========================================================================== */
window.EXPORT_DIVISIONS_DATA = [
  {
    id: "living-dining",
    name: "Living & Dining Furniture",
    icon: "🪑",
    badge: "Kiln-Dried 8-10% MC",
    skuCount: "50 SKUs",
    sla: "Mortise & Tenon Joinery • SLA 8-10% MC",
    tagline: "Solid Sheesham, Mango & Acacia dining & accent tables",
    description: "Architectural live-edge dining slabs, trestle tables, occasional coffee tables, hospitality benches, and bar seating engineered with traditional mortise-and-tenon joinery for North American and European climates.",
    targetUrl: "living-dining.html",
    heroBg: "../assets/hero_live_edge_table.jpg",
    specs: ["Kiln Moisture: 8%–10% SLA", "Mortise & Tenon Joinery", "FOB Mundra Direct"],
    categories: [
      { name: "Cat 03: Coffee, Accent & Occasional Tables", title: "Coffee, Accent & Occasional Tables", url: "living-dining.html?cat=cat-03", count: 10 },
      { name: "Cat 05: Dining Tables & Hospitality Seating", title: "Dining Tables & Hospitality Seating", url: "living-dining.html?cat=cat-05", count: 10 },
      { name: "Cat 47: Bar Stools, Counter Chairs & Island Seating", title: "Bar Stools & Island Counter Chairs", url: "living-dining.html?cat=cat-47", count: 10 },
      { name: "Cat 14: Luxury Bedroom Accents & Headboards", title: "Luxury Headboards & Bedroom Accents", url: "living-dining.html?cat=cat-14", count: 10 },
      { name: "Cat 33: Hospitality Luggage Racks & Bedroom Valets", title: "Hospitality Luggage Racks & Valets", url: "living-dining.html?cat=cat-33", count: 10 }
    ]
  },
  {
    id: "case-goods",
    name: "Case Goods & Storage",
    icon: "🗄️",
    badge: "ISTA-1A Drop Tested",
    skuCount: "70 SKUs",
    sla: "European Soft-Close Hardware • Flat-Pack KD",
    tagline: "Credenzas, sideboards, bookcases & apothecary chests",
    description: "Jodhpur Moorish jaali credenzas, fluted timber media consoles, industrial library étagères, and apothecary file chests fitted with European soft-close hardware and flat-pack KD export packaging.",
    targetUrl: "case-goods.html",
    heroBg: "../assets/hero_jaali_sideboard.jpg",
    specs: ["European Soft-Close Hardware", "ISTA-1A Drop Tested", "Flat-Pack KD Engineering"],
    categories: [
      { name: "Cat 04: Case Goods, Credenzas & Storage Buffets", title: "Credenzas, Buffets & Media Consoles", url: "case-goods.html?cat=cat-04", count: 10 },
      { name: "Cat 07: Home Organization, Shelving & Bookcases", title: "Home Organization & Wall Shelving", url: "case-goods.html?cat=cat-07", count: 10 },
      { name: "Cat 28: Bookshelves, Bookcases & Étagère Towers", title: "Bookshelves & Étagère Towers", url: "case-goods.html?cat=cat-28", count: 10 },
      { name: "Cat 13: Entryway, Mudroom & Foyer Utility", title: "Entryway Hall Trees & Mudroom Utility", url: "case-goods.html?cat=cat-13", count: 10 },
      { name: "Cat 25: Music, Audio & Vinyl Record Storage", title: "Vinyl Audio & Turntable Consoles", url: "case-goods.html?cat=cat-25", count: 10 },
      { name: "Cat 32: Laundry, Utility & Mudroom Organizers", title: "Laundry & Mudroom Utility Organizers", url: "case-goods.html?cat=cat-32", count: 10 },
      { name: "Cat 44: Kitchen Island Carts, Baker’s Racks & Butcher Blocks", title: "Rolling Island Carts & Baker’s Racks", url: "case-goods.html?cat=cat-44", count: 10 }
    ]
  },
  {
    id: "tabletop",
    name: "Kitchen, Tabletop & Entertaining",
    icon: "🍷",
    badge: "FDA/LFGB Food-Safe",
    skuCount: "70 SKUs",
    sla: "Food-Safe Lacquer • Retail Gift-Box Ready",
    tagline: "End-grain blocks, charcuterie boards & barware",
    description: "High-velocity culinary woodcraft including organic live-edge charcuterie boards, hand-turned salad bowls, marble & acacia barware, and wine cellar furnishings. Optimized for Amazon FBA and boutique gift retail.",
    targetUrl: "tabletop.html",
    heroBg: "../assets/charcuterie_board_deluxe.jpg",
    specs: ["Food-Safe Certified Lacquer", "Gift-Box Ready Packaging", "Amazon Proven Velocity"],
    categories: [
      { name: "Cat 01: Tabletop, Serveware & Culinary Woodcraft", title: "Charcuterie Boards & Serving Platters", url: "tabletop.html?cat=cat-01", count: 10 },
      { name: "Cat 09: Barware, Wine Storage & Entertaining Essentials", title: "Barware, Wine Racks & Mobile Carts", url: "tabletop.html?cat=cat-09", count: 10 },
      { name: "Cat 15: Kitchen Organization & Pantry Woodcraft", title: "Magnetic Knife Strips & Spice Racks", url: "tabletop.html?cat=cat-15", count: 10 },
      { name: "Cat 22: Home Barista, Coffee Bar & Tea Stations", title: "Pour-Over Stands & Barista Stations", url: "tabletop.html?cat=cat-22", count: 10 },
      { name: "Cat 31: Wine Cellar & Vineyard Estate Furnishings", title: "Wine Riddling Racks & Estate Furnishings", url: "tabletop.html?cat=cat-31", count: 10 },
      { name: "Cat 37: Table Linens, Charger Plates & Dining Accents", title: "Turned Charger Plates & Table Accents", url: "tabletop.html?cat=cat-37", count: 10 },
      { name: "Cat 40: Trays, Platters & Ottoman Serving Boards", title: "Ottoman Serving Trays & Bed Lap Desks", url: "tabletop.html?cat=cat-40", count: 10 }
    ]
  },
  {
    id: "wall-decor",
    name: "Architectural Wall Decor & Mirrors",
    icon: "🪞",
    badge: "Silvered Float Glass",
    skuCount: "60 SKUs",
    sla: "Rust-Proof Matte Coat • Distortion-Free Glass",
    tagline: "Jharokha arch mirrors, jaali panels & wall clocks",
    description: "Hand-forged pierced iron jaali panels, Rajasthani cathedral Jharokha mirrors, oversized floor leaners, kinetic gear wall clocks, and architectural carved wooden transoms with rust-proof powder coats.",
    targetUrl: "wall-decor.html",
    heroBg: "../assets/hero_jharokha_mirror.jpg",
    specs: ["Commercial Float Mirror Glass", "Rust-Proof Matte Finish", "VRIKSH Legal Timber"],
    categories: [
      { name: "Cat 02: Architectural Wall Decor & Wrought Iron Art", title: "Pierced Iron Jaali Wall Panels & Sconces", url: "wall-decor.html?cat=cat-02", count: 10 },
      { name: "Cat 16: Clocks, Timepieces & Kinetic Wall Art", title: "Industrial Skeleton & Sunburst Clocks", url: "wall-decor.html?cat=cat-16", count: 10 },
      { name: "Cat 38: Wall Hooks, Coat Racks & Hanging Storage", title: "Cast Iron Wall Hooks & Coat Racks", url: "wall-decor.html?cat=cat-38", count: 10 },
      { name: "Cat 39: Mirrors, Jharokha Art & Dressing Glasses", title: "Jharokha Arch Mirrors & Leaners", url: "wall-decor.html?cat=cat-39", count: 10 },
      { name: "Cat 45: Picture Frames, Gallery Rails & Photo Displays", title: "Solid Hardwood Gallery Frame Sets", url: "wall-decor.html?cat=cat-45", count: 10 },
      { name: "Cat 48: Architectural Accents, Brackets & Carved Corbels", title: "Carved Island Corbels & Transom Grilles", url: "wall-decor.html?cat=cat-48", count: 10 }
    ]
  },
  {
    id: "lighting-hearth",
    name: "Lighting & Fireplace Hearthcraft",
    icon: "🕯️",
    badge: "CE / UL Compatible",
    skuCount: "50 SKUs",
    sla: "CE/UL Wireways • Heat-Resistant Black Patina",
    tagline: "Ambient Moroccan lanterns, pendants & fire tools",
    description: "Pierced wrought iron ambient lanterns, draped wood bead chandeliers, linear table candelabras, heavy 5-piece fireplace tool sets, and crescent firewood log hoops designed for luxury mountain and estate living.",
    targetUrl: "collections.html?division=lighting-hearth",
    heroBg: "../assets/fireplace_tool_set_iron.jpg",
    specs: ["CE / UL Compatible Wireways", "Hand-Hammered Wrought Iron", "Heat-Resistant Patina"],
    categories: [
      { name: "Cat 06: Decorative Lighting, Lanterns & Ambient Accents", title: "Pierced Metal Ambient Lanterns & Lamps", url: "collections.html#cat-06", count: 10 },
      { name: "Cat 12: Fireplace, Hearth & Mantle Ironcraft", title: "5-Piece Hand-Forged Fireplace Tool Sets", url: "collections.html#cat-12", count: 10 },
      { name: "Cat 26: Luxury Lighting Pendants & Chandeliers", title: "Wood Bead & Wagon Wheel Chandeliers", url: "collections.html#cat-26", count: 10 },
      { name: "Cat 35: Candle Holders, Candelabras & Votive Lanterns", title: "Linear Table Candelabras & Lanterns", url: "collections.html#cat-35", count: 10 },
      { name: "Cat 41: Fireplace Accessories, Mantels & Wood Storage", title: "Fireplace Screens, Hoppers & Mantels", url: "collections.html#cat-41", count: 10 }
    ]
  },
  {
    id: "garden-outdoor",
    name: "Garden, Patio & Outdoor Living",
    icon: "🌿",
    badge: "Weather-Resistant Seal",
    skuCount: "60 SKUs",
    sla: "Exterior Marine Coating • UV-Stabilized Seal",
    tagline: "Iron arbors, trellises, bistro sets & fire vessels",
    description: "Hand-hammered iron garden arbors, French diamond trellises, foldable acacia bistro sets, raised iron planter ladders, glass Wardian greenhouse terrariums, and outdoor bioethanol fire bowls.",
    targetUrl: "collections.html?division=garden-outdoor",
    heroBg: "../assets/iron_garden_trellis_arbor.jpg",
    specs: ["Weather-Resistant Outdoor Seal", "Hand-Forged Architectural Iron", "High-Margin Density"],
    categories: [
      { name: "Cat 10: Planters, Botanical Stands & Garden Ironcraft", title: "Raised Wood & Iron Plant Stands", url: "collections.html#cat-10", count: 10 },
      { name: "Cat 24: Outdoor Cooking, BBQ & Grill Accessories", title: "End-Grain BBQ Meat Carving Blocks", url: "collections.html#cat-24", count: 10 },
      { name: "Cat 30: Outdoor Patio Furniture & Balcony Living", title: "Folding Acacia Patio Sets & Garden Benches", url: "collections.html#cat-30", count: 10 },
      { name: "Cat 34: Garden Trellises, Arbors & Landscape Structures", title: "Arched Iron Garden Arbors & Trellises", url: "collections.html#cat-34", count: 10 },
      { name: "Cat 43: Planters, Terrariums & Miniature Greenhouses", title: "Glass & Iron Greenhouse Terrariums", url: "collections.html#cat-43", count: 10 },
      { name: "Cat 50: Outdoor Lighting, Torches & Fire Vessels", title: "Tabletop Bioethanol Fire Bowls & Torches", url: "collections.html#cat-50", count: 10 }
    ]
  },
  {
    id: "office-vanity",
    name: "Home Office, Keepsakes & Vanity",
    icon: "✒️",
    badge: "Velvet Lined & Brass Inlay",
    skuCount: "60 SKUs",
    sla: "Precision CNC Veneers • Anti-Tarnish Velvet",
    tagline: "Desk risers, locking jewelry chests & hardware",
    description: "Dual-monitor ergonomic desk risers, turned wooden cable boxes, multi-tier locking jewelry chests, watch display boxes, hand-carved memory keepsake urns, and hand-forged architectural ironmongery pulls.",
    targetUrl: "collections.html?division=office-vanity",
    heroBg: "../assets/book_keepsake_box.jpg",
    specs: ["Solid Brass Inlays & Hinges", "Anti-Tarnish Velvet Lining", "Artisanal Hand Joinery"],
    categories: [
      { name: "Cat 08: Desk Accessories, Keepsakes & Luxury Stationery", title: "Book Keepsakes & Sculptural Paperweights", url: "collections.html#cat-08", count: 10 },
      { name: "Cat 23: Hardware, Knobs, Pulls & Architectural Ironmongery", title: "Hand-Forged Cabinet Pulls & Barn Handles", url: "collections.html#cat-23", count: 10 },
      { name: "Cat 27: Sewing, Knitting & Haberdashery Woodcraft", title: "Turned Yarn Bowls & Sewing Chests", url: "collections.html#cat-27", count: 10 },
      { name: "Cat 29: Jewelry Boxes, Vanity Organizers & Caskets", title: "Locking Hardwood Jewelry & Watch Chests", url: "collections.html#cat-29", count: 10 },
      { name: "Cat 36: Desk Organizers, Tech Accessories & Home Office", title: "Dual-Monitor Wood Risers & Wrist Rests", url: "collections.html#cat-36", count: 10 },
      { name: "Cat 42: Decorative Boxes, Urns & Memory Keepsakes", title: "Carved Memory Urns & Puzzle Boxes", url: "collections.html#cat-42", count: 10 }
    ]
  },
  {
    id: "kids-leisure",
    name: "Kids, Pets, Leisure & Heritage",
    icon: "♟️",
    badge: "ASTM F963 Non-Toxic",
    skuCount: "80 SKUs",
    sla: "ASTM F963 Toy Safety • Lead-Free Eco Seal",
    tagline: "Montessori toys, elevated pet diners & game sets",
    description: "Montessori curved balance boards, children activity desks, elevated acacia dog feeding stations, luxury pet daybeds, heirloom solid Sheesham chess sets, spa bathtub caddies, and cultural sacred chowkis.",
    targetUrl: "collections.html?division=kids-leisure",
    heroBg: "../assets/hardwood_chess_board.jpg",
    specs: ["ASTM F963 Safety Compliant", "Lead-Free Non-Toxic Stains", "Heirloom Quality Joinery"],
    categories: [
      { name: "Cat 11: Bathroom, Spa & Wellness Woodcraft", title: "Expandable Bathtub Caddies & Floor Mats", url: "collections.html#cat-11", count: 10 },
      { name: "Cat 17: Children, Nursery & Montessori Wooden Toys", title: "Montessori Balance Boards & Rainbow Arches", url: "collections.html#cat-17", count: 10 },
      { name: "Cat 18: Luxury Pet Furniture & Elevated Feeders", title: "Elevated Dog Feeders & Pet Daybeds", url: "collections.html#cat-18", count: 10 },
      { name: "Cat 19: Seasonal, Festive & Holiday Decor", title: "Turned Christmas Trees & Menorahs", url: "collections.html#cat-19", count: 10 },
      { name: "Cat 20: Sacred, Meditation & Altar Crafts", title: "Jharokha Altars & Meditation Chowkis", url: "collections.html#cat-20", count: 10 },
      { name: "Cat 21: Games, Pastimes & Handcrafted Leisure", title: "Handcrafted Sheesham & Boxwood Chess", url: "collections.html#cat-21", count: 10 },
      { name: "Cat 46: Children\'s Furniture, Study Desks & Activity Tables", title: "Children\'s Desks & Front-Facing Book Slings", url: "collections.html#cat-46", count: 10 },
      { name: "Cat 49: Religious, Cultural & Global Ethnic Statuary", title: "Hand-Carved Statuary & Garden Pagodas", url: "collections.html#cat-49", count: 10 }
    ]
  }
];

function initCategoriesMegaMenu() {
  const dropdown = document.querySelector(".navbar .dropdown");
  if (!dropdown) return;

  const divisions = window.EXPORT_DIVISIONS_DATA || [];
  if (divisions.length === 0) return;

  // Build Endeavor 2-Panel + Myntra 5-Column Popover
  const menuHTML = \`
    <a href="collections.html" class="dropbtn nav-item">Categories ▾</a>
    <div class="dropdown-content dropdown-two-panel">
      <!-- Mega Tabs Header -->
      <div class="mega-tabs-header">
        <div class="mega-view-switch">
          <button type="button" class="mega-tab-btn active" id="megaTabInteractive">✦ Interactive Explorer</button>
          <button type="button" class="mega-tab-btn" id="megaTabMyntra">▦ Full 50-Category Taxonomy</button>
        </div>
        <span class="mega-tag-right">500 SKUs • 8 Master Divisions • FOB Mundra</span>
      </div>

      <!-- Tab 1: Endeavor 2-Panel View (Image 8) -->
      <div class="mega-tab-view active" id="megaInteractivePane">
        <div class="mega-two-panel-body">
          <div class="mega-panel-left">
            <div class="mega-panel-title">Major Export Divisions</div>
            <div class="mega-divisions-list" id="megaNavDivisionList"></div>
          </div>
          <div class="mega-panel-right" id="megaNavPreviewRight"></div>
        </div>
      </div>

      <!-- Tab 2: Myntra 5-Column Taxonomy View (Image 9) -->
      <div class="mega-tab-view" id="megaMyntraPane" style="display: none; padding: 22px 28px;">
        <div class="myntra-mega-menu" style="position: static; transform: none; width: 100%; box-shadow: none; border: none; padding: 0;">
          <!-- Col 1: Living/Dining & Storage -->
          <div class="myntra-mega-col">
            <h4 class="mega-heading"><a href="living-dining.html">Living &amp; Dining (50)</a></h4>
            <ul class="mega-links-list">
              <li><a href="living-dining.html?cat=cat-03">Coffee &amp; Accent Tables</a></li>
              <li><a href="living-dining.html?cat=cat-05">Dining Tables &amp; Seating</a></li>
              <li><a href="living-dining.html?cat=cat-47">Bar Stools &amp; Counter Chairs</a></li>
              <li><a href="living-dining.html?cat=cat-14">Luxury Bedroom Accents</a></li>
              <li><a href="living-dining.html?cat=cat-33">Hospitality Luggage Racks</a></li>
            </ul>
            <h4 class="mega-heading"><a href="case-goods.html">Case Goods &amp; Storage (70)</a></h4>
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
            <h4 class="mega-heading"><a href="collections.html?division=garden-outdoor">Garden &amp; Outdoor (60)</a></h4>
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
            <h4 class="mega-heading"><a href="collections.html?division=kids-leisure">Kids, Pets &amp; Heritage (80)</a></h4>
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
  \`;

  dropdown.innerHTML = menuHTML;

  // Elements
  const tabInteractive = document.getElementById("megaTabInteractive");
  const tabMyntra = document.getElementById("megaTabMyntra");
  const paneInteractive = document.getElementById("megaInteractivePane");
  const paneMyntra = document.getElementById("megaMyntraPane");
  const listContainer = document.getElementById("megaNavDivisionList");
  const previewContainer = document.getElementById("megaNavPreviewRight");

  if (tabInteractive && tabMyntra) {
    tabInteractive.onclick = (e) => {
      e.preventDefault();
      tabInteractive.classList.add("active");
      tabMyntra.classList.remove("active");
      if (paneInteractive) paneInteractive.style.display = "block";
      if (paneMyntra) paneMyntra.style.display = "none";
    };
    tabMyntra.onclick = (e) => {
      e.preventDefault();
      tabMyntra.classList.add("active");
      tabInteractive.classList.remove("active");
      if (paneInteractive) paneInteractive.style.display = "none";
      if (paneMyntra) paneMyntra.style.display = "block";
    };
  }

  function renderPreview(d) {
    if (!previewContainer) return;
    previewContainer.innerHTML = \`
      <div class="panel-preview-card">
        <span class="preview-pill">\${d.badge}</span>
        <h3 class="preview-title">\${d.name}</h3>
        <p class="preview-text">\${d.description}</p>
      </div>

      <div class="subcat-list-wrap">
        <div class="subcat-list-title">Subcategories &amp; Specialized Lines</div>
        <div class="preview-subcat-links">
          \${d.categories.map(c => \`
            <a href="\${c.url}" class="preview-subcat-row">
              <span>\${c.title}</span>
              <span class="count">\${c.count} SKUs &rsaquo;</span>
            </a>
          \`).join("")}
        </div>
      </div>

      <a href="\${d.targetUrl}" class="mega-explore-btn">
        <span>Explore \${d.name} (\${d.skuCount})</span>
        <span>&rarr;</span>
      </a>
    \`;
  }

  if (listContainer) {
    listContainer.innerHTML = "";
    divisions.forEach((d, idx) => {
      const item = document.createElement("div");
      item.className = "mega-division-item" + (idx === 0 ? " active" : "");
      item.innerHTML = \`
        <div class="division-icon-box">\${d.icon}</div>
        <div class="division-meta">
          <div class="division-header-row">
            <span class="division-name">\${d.name}</span>
            <span class="division-badge">\${d.skuCount}</span>
          </div>
          <div class="division-desc">\${d.tagline}</div>
        </div>
      \`;

      item.onmouseenter = () => {
        document.querySelectorAll(".mega-division-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        renderPreview(d);
      };

      item.onclick = (e) => {
        if (e.target.closest("a")) return;
        window.location.href = d.targetUrl;
      };

      listContainer.appendChild(item);
    });

    // Initial render
    renderPreview(divisions[0]);
  }
}

function initHomeDivisionsShowcase() {
  const showcaseEl = document.getElementById("homeDivisionsShowcase");
  if (!showcaseEl) return;

  const divisions = window.EXPORT_DIVISIONS_DATA || [];
  if (divisions.length === 0) return;

  showcaseEl.innerHTML = \`
    <div class="home-showcase-sidebar" id="homeShowcaseSidebar"></div>
    <div class="home-showcase-preview" id="homeShowcasePreview"></div>
  \`;

  const sidebar = document.getElementById("homeShowcaseSidebar");
  const preview = document.getElementById("homeShowcasePreview");

  function renderShowcasePreview(d) {
    if (!preview) return;
    preview.innerHTML = \`
      <div>
        <span class="showcase-preview-pill">\${d.badge} • \${d.sla}</span>
        <h3 class="showcase-preview-title">\${d.name}</h3>
        <p class="showcase-preview-desc">\${d.description}</p>

        <div class="showcase-subcats-title">Specialized Export Subcategories &amp; Lines</div>
        <div class="showcase-subcats-grid">
          \${d.categories.map(c => \`
            <a href="\${c.url}" class="showcase-subcat-row">
              <span>\${c.title}</span>
              <span class="chevron">&rsaquo;</span>
            </a>
          \`).join("")}
        </div>

        <div class="showcase-specs-row">
          \${d.specs.map(s => \`<span class="showcase-spec-pill">\${s}</span>\`).join("")}
        </div>
      </div>

      <div class="showcase-actions-row">
        <a href="\${d.targetUrl}" class="showcase-cta-btn">
          <span>Explore \${d.name} (\${d.skuCount})</span>
          <span>&rarr;</span>
        </a>
        <a href="collections.html" class="btn btn-outline" style="padding: 12px 22px; font-size: 0.88rem;">All 500 SKUs &rarr;</a>
      </div>
    \`;
  }

  sidebar.innerHTML = "";
  divisions.forEach((d, idx) => {
    const item = document.createElement("div");
    item.className = "home-showcase-item" + (idx === 0 ? " active" : "");
    item.innerHTML = \`
      <div class="item-icon">\${d.icon}</div>
      <div class="item-meta">
        <div class="item-header-row">
          <span class="item-title">\${d.name}</span>
          <span class="item-badge">\${d.skuCount}</span>
        </div>
        <div class="item-tagline">\${d.tagline}</div>
      </div>
    \`;

    item.onmouseenter = () => {
      document.querySelectorAll(".home-showcase-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      renderShowcasePreview(d);
    };

    item.onclick = () => {
      document.querySelectorAll(".home-showcase-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      renderShowcasePreview(d);
    };

    sidebar.appendChild(item);
  });

  renderShowcasePreview(divisions[0]);
}

// Auto-run on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initCategoriesMegaMenu();
    initHomeDivisionsShowcase();
  });
} else {
  initCategoriesMegaMenu();
  initHomeDivisionsShowcase();
}
window.initCategoriesMegaMenu = initCategoriesMegaMenu;
window.initHomeDivisionsShowcase = initHomeDivisionsShowcase;
`;

fs.appendFileSync(appJsPath, jsCode, "utf8");
console.log("Successfully appended interactive mega menu and showcase logic to app.js");
