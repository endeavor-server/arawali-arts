/**
 * Arawali Arts B2B Export Portal — Product Engineering Architecture
 * State Management, Interactive Container Dock, Quick Spec Modal & RFQ Engine
 */

// Global Master Product Catalog Store (Export Specifications & Compliance Metadata)
const PRODUCT_CATALOG = {
  'AA-WB-101': {
    sku: 'AA-WB-101',
    title: 'Artisanal Book Keepsake Box',
    category: 'Tabletop & Desk Accents (Naturehood)',
    species: 'Dalbergia sissoo (Indian Rosewood / Sheesham)',
    moisture: '8% - 10% Kiln-Dried',
    dimInches: '7.5" x 5.0" x 2.2"',
    dimCm: '19.0 x 12.7 x 5.6 cm',
    cbm: 0.003,
    moq: 100,
    fobTier: '$6.50 - $8.20 / pc',
    masterPack: '24 pcs / carton (5-ply export corrugate)',
    image: '../assets/00000036-PHOTO-2026-11-18-12-01-58.jpg',
    desc: 'Solid Sheesham hardwood box hand-carved in an antique book silhouette with fluted page ridges. Dual-tone contrasting heartwood with a silky satin lacquer. High velocity Amazon retail & luxury corporate gifting favorite.'
  },
  'AA-CST-201': {
    sku: 'AA-CST-201',
    title: 'Round Hardwood Coaster Set (4-Pc)',
    category: 'Tabletop & Bar Accents (Naturehood)',
    species: 'Mangifera indica (Seasoned Mango Wood)',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: 'Dia 4.0" x 0.4"',
    dimCm: 'Dia 10.2 x 1.0 cm',
    cbm: 0.001,
    moq: 200,
    fobTier: '$2.80 - $3.60 / set',
    masterPack: '48 sets / carton with custom gift sleeve',
    image: '../assets/00000037-PHOTO-2026-11-18-12-01-59.jpg',
    desc: 'Turned solid hardwood coasters with beveled edges and moisture-repellent food-safe seal. Available with custom laser-engraved buyer logos or Naturehood branding.'
  },
  'AA-CST-202': {
    sku: 'AA-CST-202',
    title: 'Square Hardwood Coaster Set (4-Pc)',
    category: 'Tabletop & Bar Accents (Naturehood)',
    species: 'Dalbergia sissoo / Acacia nilotica',
    moisture: '8% - 10% Kiln-Dried',
    dimInches: '3.9" x 3.9" x 0.4"',
    dimCm: '10.0 x 10.0 x 1.0 cm',
    cbm: 0.001,
    moq: 200,
    fobTier: '$2.90 - $3.75 / set',
    masterPack: '48 sets / carton',
    image: '../assets/00000042-PHOTO-2026-11-18-12-02-01.jpg',
    desc: 'Modern geometric coasters with softened edges, deep grain character, and scratch-resistant base pads for hospitality and home bar use.'
  },
  'AA-PBL-301': {
    sku: 'AA-PBL-301',
    title: 'Sculptural Pebble Paperweight',
    category: 'Desk & Tactile Decor',
    species: 'Dalbergia sissoo (Indian Rosewood)',
    moisture: '8% - 10% Kiln-Dried',
    dimInches: '4.5" x 3.2" x 1.4"',
    dimCm: '11.4 x 8.1 x 3.6 cm',
    cbm: 0.001,
    moq: 150,
    fobTier: '$2.20 - $2.90 / pc',
    masterPack: '60 pcs / carton',
    image: '../assets/00000039-PHOTO-2026-11-18-12-02-00.jpg',
    desc: 'Turned single-block solid timber organic paperweight. Smooth ergonomic contours popular in Scandinavian and Japandi interior stylings.'
  },
  'AA-SPX-401': {
    sku: 'AA-SPX-401',
    title: 'Heritage 4-Compartment Storage Chest',
    category: 'Kitchen, Tea & Keepsakes',
    species: 'Dalbergia sissoo / Acacia nilotica',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: '8.5" x 8.5" x 3.0"',
    dimCm: '21.6 x 21.6 x 7.6 cm',
    cbm: 0.006,
    moq: 80,
    fobTier: '$8.50 - $11.00 / pc',
    masterPack: '12 pcs / carton',
    image: '../assets/00000040-PHOTO-2026-11-18-12-02-00.jpg',
    desc: 'Four-partition solid wood organizer box with antique brass finish quadrant hinges and top finial knob. Multipurpose tea sachet, spice, or jewelry organizer.'
  },
  'AA-BM-501': {
    sku: 'AA-BM-501',
    title: 'Precision Veneer Wooden Bookmark',
    category: 'Gifts & Book Lovers Accents',
    species: 'Natural Hardwood Veneer',
    moisture: '6% - 8% Conditioned',
    dimInches: '5.8" x 1.2" x 0.08"',
    dimCm: '14.7 x 3.0 x 0.2 cm',
    cbm: 0.0001,
    moq: 500,
    fobTier: '$0.85 - $1.25 / pc',
    masterPack: '250 pcs / carton',
    image: '../assets/00000044-PHOTO-2026-11-18-12-02-02.jpg',
    desc: 'Ultra-slim flexible hardwood veneer bookmark with silk tassel and laser filigree cutouts. Perfect for bookstore chains, museum shops, and subscription gift boxes.'
  },
  'AA-WSC-601': {
    sku: 'AA-WSC-601',
    title: 'Jodhpur Iron Jaali Wall Sconce',
    category: 'Architectural Wall Decor',
    species: 'Solid Sheesham & Hand-Pierced Wrought Iron',
    moisture: 'Anti-Rust Powder-Coated Metal + 8-10% Kiln Timber',
    dimInches: '18.0" x 7.5" x 4.5"',
    dimCm: '45.7 x 19.0 x 11.4 cm',
    cbm: 0.015,
    moq: 100,
    fobTier: '$12.50 - $16.00 / pc',
    masterPack: '8 pcs / carton with high-density EPE foam',
    image: '../assets/00000048-PHOTO-2026-11-18-12-02-03.jpg',
    desc: 'Classic distressed solid timber frame enclosing an intricately hand-forged wrought iron lattice screen with cantilevered tea-light dish.'
  },
  'AA-WMR-602': {
    sku: 'AA-WMR-602',
    title: 'Rajasthani Jharokha Arch Wall Mirror',
    category: 'Architectural Wall Decor',
    species: 'Solid Mango Hardwood & Forged Iron Grille',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: '36.0" x 24.0" x 2.0"',
    dimCm: '91.4 x 61.0 x 5.1 cm',
    cbm: 0.045,
    moq: 50,
    fobTier: '$34.00 - $44.00 / pc',
    masterPack: '2 pcs / ISTA-1A drop-test certified carton',
    image: '../assets/hero_jharokha_mirror.jpg',
    desc: 'Cathedral arch solid mango wood frame with intricate hand-forged iron lattice grille overlaying premium float mirror glass. Competing directly with Bothra & Prince Art.'
  },
  'AA-LTN-603': {
    sku: 'AA-LTN-603',
    title: 'Jodhpur Pierced Metal Lantern Sconce',
    category: 'Architectural Wall Decor',
    species: 'Hand-Forged Wrought Iron & Sandstone Accents',
    moisture: 'Electrostatically Treated Matte Black',
    dimInches: '16.0" x 7.0" x 6.0"',
    dimCm: '40.6 x 17.8 x 15.2 cm',
    cbm: 0.018,
    moq: 80,
    fobTier: '$15.00 - $19.50 / pc',
    masterPack: '6 pcs / carton',
    image: '../assets/iron_jaali_wall_sconce.jpg',
    desc: 'Perforated wrought iron lantern with traditional Moorish lattice cutouts casting intricate warm shadows for boutique hotels and luxury verandas.'
  },
  'AA-CT-701': {
    sku: 'AA-CT-701',
    title: 'Live-Edge Sheesham Coffee Table',
    category: 'Living & Dining Furniture',
    species: 'Dalbergia sissoo (Indian Rosewood)',
    moisture: '8% - 10% Kiln-Dried & Stabilized',
    dimInches: '48.0" x 24.0" x 18.0"',
    dimCm: '121.9 x 61.0 x 45.7 cm',
    cbm: 0.150,
    moq: 30,
    fobTier: '$75.00 - $95.00 / pc',
    masterPack: '1 pc / Knock-Down (KD) flat carton (hardware enclosed)',
    image: '../assets/hero_live_edge_table.jpg',
    desc: 'Natural organic edge solid Sheesham slab mounted on heavy-gauge matte black iron trapezoid legs. KD flat-pack engineered for high container density.'
  },
  'AA-CN-702': {
    sku: 'AA-CN-702',
    title: 'Minimalist Iron Hallway Console Table',
    category: 'Entryway & Living Accents',
    species: 'Solid Acacia nilotica & Black Structural Iron',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: '42.0" x 12.0" x 32.0"',
    dimCm: '106.7 x 30.5 x 81.3 cm',
    cbm: 0.080,
    moq: 40,
    fobTier: '$52.00 - $68.00 / pc',
    masterPack: '1 pc / flat pack KD export carton',
    image: '../assets/console_table_iron.jpg',
    desc: 'Slim-profile entry console table featuring solid Acacia plank top, middle mesh storage shelf, and structural hand-welded iron uprights.'
  },
  'AA-DT-901': {
    sku: 'AA-DT-901',
    title: 'Heritage Trestle Dining Table (78")',
    category: 'Dining Centerpieces',
    species: 'Solid Sheesham (Indian Rosewood) & Forged Iron',
    moisture: '8% - 10% Kiln-Dried',
    dimInches: '78.0" x 38.0" x 30.0"',
    dimCm: '198.1 x 96.5 x 76.2 cm',
    cbm: 0.350,
    moq: 15,
    fobTier: '$195.00 - $240.00 / pc',
    masterPack: '1 table in 2 KD cartons (top slab + iron trestle base)',
    image: '../assets/dining_table_trestle.jpg',
    desc: 'Heavyweight solid Sheesham plank dining table with hand-hewn iron trestle base and exposed mortise-and-tenon breadboard joinery. Seats 8 comfortably.'
  },
  'AA-SB-801': {
    sku: 'AA-SB-801',
    title: 'Jodhpur Jaali Metal & Wood Credenza',
    category: 'Case Goods, Buffets & Storage',
    species: 'Solid Seasoned Mango Hardwood & Black Iron Jaali',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: '58.0" x 18.0" x 34.0"',
    dimCm: '147.3 x 45.7 x 86.4 cm',
    cbm: 0.650,
    moq: 20,
    fobTier: '$175.00 - $220.00 / pc',
    masterPack: '1 pc / reinforced export carton with bottom wooden skid',
    image: '../assets/hero_jaali_sideboard.jpg',
    desc: 'Solid Mango wood 3-door sideboard with hand-forged black iron jaali inserts, internal fixed shelves, and magnetic latches. Benchmarking Bothra & Prince Art.'
  },
  'AA-BK-802': {
    sku: 'AA-BK-802',
    title: 'Industrial Mango & Iron Library Bookcase',
    category: 'Case Goods, Buffets & Storage',
    species: 'Seasoned Solid Mango Hardwood & Riveted Steel',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: '40.0" x 16.0" x 76.0"',
    dimCm: '101.6 x 40.6 x 193.0 cm',
    cbm: 0.580,
    moq: 15,
    fobTier: '$165.00 - $210.00 / pc',
    masterPack: '1 pc / heavy export crate with edge corner guards',
    image: '../assets/reclaimed_wood_bookcase.jpg',
    desc: 'Tall multi-tier open shelving unit featuring solid Mango hardwood shelves and an industrial black iron frame with vintage rivets and decorative caster wheels.'
  },
  'AA-TV-802': {
    sku: 'AA-TV-802',
    title: 'Solid Timber Slatted Media Console',
    category: 'Case Goods, Buffets & Storage',
    species: 'Solid Mango & Sheesham Hardwood',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: '64.0" x 16.0" x 20.0"',
    dimCm: '162.6 x 40.6 x 50.8 cm',
    cbm: 0.450,
    moq: 25,
    fobTier: '$120.00 - $155.00 / pc',
    masterPack: '1 pc / flat KD carton with honeycomb buffers',
    image: '../assets/media_console_slatted.jpg',
    desc: 'Solid Sheesham and Mango cabinet with tambour acoustic bypass sliding doors, central open media bay, and slender matte black tapered iron legs.'
  },
  'AA-AP-803': {
    sku: 'AA-AP-803',
    title: 'Industrial Multi-Drawer Apothecary Chest',
    category: 'Case Goods, Buffets & Storage',
    species: 'Solid Sheesham Hardwood & Riveted Steel Frame',
    moisture: '8% - 10% Kiln-Dried',
    dimInches: '36.0" x 16.0" x 38.0"',
    dimCm: '91.4 x 40.6 x 96.5 cm',
    cbm: 0.400,
    moq: 20,
    fobTier: '$135.00 - $175.00 / pc',
    masterPack: '1 pc / export crate with foam edge corner guards',
    image: '../assets/apothecary_chest_industrial.jpg',
    desc: 'Benchmark vintage industrial statement chest featuring 12 compact facade drawers, solid brass label cup pull handles, and heavy riveted metal framing.'
  },
  'AA-NST-703': {
    sku: 'AA-NST-703',
    title: 'Round Nesting Side Tables (2-Pc Set)',
    category: 'Living & Dining Furniture',
    species: 'Solid Natural Acacia & Powder-Coated Iron Rings',
    moisture: '8% - 11% Kiln-Dried',
    dimInches: 'Dia 20" x 22" H / Dia 16" x 19" H',
    dimCm: 'Dia 50.8 x 55.9 cm / Dia 40.6 x 48.3 cm',
    cbm: 0.090,
    moq: 50,
    fobTier: '$48.00 - $62.00 / set',
    masterPack: '1 set nested / 5-ply export carton',
    image: '../assets/nesting_side_tables_round.jpg',
    desc: '2-piece nesting occasional table set with solid Acacia wood tray tops with raised spill rims, supported by slender matte black circular iron frames.'
  },
  'AA-BN-903': {
    sku: 'AA-BN-903',
    title: 'Rustic Solid Hardwood Dining Bench',
    category: 'Living & Dining Furniture',
    species: 'Solid Indian Sheesham (Rosewood) & Iron',
    moisture: '8% - 10% Kiln-Dried',
    dimInches: '60.0" x 14.0" x 18.0"',
    dimCm: '152.4 x 35.6 x 45.7 cm',
    cbm: 0.120,
    moq: 25,
    fobTier: '$68.00 - $88.00 / pc',
    masterPack: '1 pc / KD flat pack carton',
    image: '../assets/dining_bench_live_edge.jpg',
    desc: 'Engineered to slide under the Heritage Trestle Dining Table. Solid Sheesham slab with natural live-edge contour and heavy black iron U-channel legs.'
  },
  'AA-CB-102': {
    sku: 'AA-CB-102',
    title: 'Deluxe Acacia End-Grain Charcuterie Board',
    category: 'Tabletop & Entertaining (Naturehood / Amazon)',
    species: 'End-Grain Acacia Hardwood & Stainless Steel',
    moisture: '8% - 10% Food-Grade Mineral Oil Conditioned',
    dimInches: '18.0" x 12.0" x 1.8"',
    dimCm: '45.7 x 30.5 x 4.6 cm',
    cbm: 0.006,
    moq: 60,
    fobTier: '$12.50 - $16.50 / pc',
    masterPack: '6 pcs / gift box display carton',
    image: '../assets/charcuterie_board_deluxe.jpg',
    desc: 'End-grain solid Acacia carving slab with perimeter juice groove and concealed slide drawer holding 3 brass-riveted stainless cheese knives. Top-ranking Amazon holiday gift line.'
  }
};

// Automatically sync ALL 500 SKUs into PRODUCT_CATALOG if products-data.js is loaded
function syncAllProductsToCatalog() {
  if (typeof window !== 'undefined' && window.ALL_PRODUCTS_500 && Array.isArray(window.ALL_PRODUCTS_500)) {
    window.ALL_PRODUCTS_500.forEach(item => {
      if (!PRODUCT_CATALOG[item.SKU]) {
        const dimParts = item.Dimensions ? item.Dimensions.split('/') : ['20" x 10" x 10"', '50 x 25 x 25 cm'];
        PRODUCT_CATALOG[item.SKU] = {
          sku: item.SKU,
          title: item.Product_Name,
          category: item.Category,
          department: item.Department || 'furniture',
          species: item.Material_Construction,
          moisture: '8% – 10% Kiln-Dried (Equilibrium)',
          dimInches: dimParts[0]?.trim() || item.Dimensions,
          dimCm: dimParts[1]?.trim() || '',
          cbm: parseFloat(item.CBM) || 0.01,
          moq: parseInt(item.MOQ) || 50,
          fobTier: item.FOB_Mundra_USD,
          retailEst: item.Western_Retail_USD,
          masterPack: 'Export 5-ply Corrugated Carton with Corner Buffers',
          image: item.Image,
          desc: item.Description
        };
      }
    });
  }
}
syncAllProductsToCatalog();

// Client-Side Container & RFQ Cart State
const RFQCart = {
  STORAGE_KEY: 'arawali_rfq_cart_v2',

  get() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  save(cart) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('rfq-cart-updated', { detail: cart }));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  },

  add(sku, qty = null) {
    const item = PRODUCT_CATALOG[sku];
    if (!item) return;

    const cart = this.get();
    const currentQty = cart[sku] ? cart[sku].qty : 0;
    const addQty = qty !== null ? qty : (cart[sku] ? 20 : item.moq);

    cart[sku] = {
      sku: item.sku,
      title: item.title,
      cbm: item.cbm,
      moq: item.moq,
      fobTier: item.fobTier,
      qty: (currentQty + addQty)
    };

    this.save(cart);
    showToast(`✓ Added ${sku}: ${item.title} (${cart[sku].qty} pcs)`);
  },

  setQty(sku, qty) {
    const cart = this.get();
    if (qty <= 0) {
      if (cart[sku]) {
        delete cart[sku];
        this.save(cart);
      }
      return;
    }
    const item = PRODUCT_CATALOG[sku] || { title: sku, cbm: 0.01 };
    cart[sku] = {
      sku: sku,
      title: item.title || sku,
      cbm: item.cbm || 0.01,
      qty: qty
    };
    this.save(cart);
  },

  remove(sku) {
    const cart = this.get();
    if (cart[sku]) {
      delete cart[sku];
      this.save(cart);
    }
  },

  getTotalCBM() {
    const cart = this.get();
    return Object.values(cart).reduce((acc, it) => acc + (it.qty * it.cbm), 0);
  },

  getTotalUnits() {
    const cart = this.get();
    return Object.values(cart).reduce((acc, it) => acc + it.qty, 0);
  },

  getSKUCount() {
    return Object.keys(this.get()).length;
  }
};

// Web Audio API Acoustic Synthesizer (Endeavor Architecture Parity - Zero Network Calls)
const soundFX = {
  ctx: null,
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  playTick(pitch = 1100) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.018, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch (e) {}
  },
  playChime(pitch = 780) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (e) {}
  }
};
window.soundFX = soundFX;

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (typeof syncAllProductsToCatalog === 'function') {
    syncAllProductsToCatalog();
  }
  initLenisSmoothScroll();
  initScrollReveals();
  initUIComponents();
  initContainerDock();
  initQuickSpecModal();
  initContainerCalculator();
  initRFQPageIntegration();
  initCommandPalette();
});

// 2026 Luxury Inertial Smooth Scroll (Lenis)
function initLenisSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      window.lenisInstance = lenis;
    } catch (e) {
      console.warn('Lenis smooth scroll failed to initialize:', e);
    }
  }
}

// 2026 Scroll-Triggered Reveal Animations
function initScrollReveals() {
  const targets = document.querySelectorAll(
    '.cat-tile, .card, .collection-card, .stat-item, .feature-item, .section-header, .highlight-image-box'
  );
  
  targets.forEach((el, index) => {
    el.classList.add('reveal-fade-up');
    el.style.transitionDelay = `${(index % 4) * 0.08}s`;
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    targets.forEach(el => observer.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-visible'));
  }
}

// Setup General UI Interactions
function initUIComponents() {
  // Mobile Nav Toggle & Drawer
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');
  
  if (navContainer && navLinks && !document.querySelector('.nav-mobile-toggle')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'nav-mobile-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
    toggleBtn.innerHTML = '☰';
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navContainer.insertBefore(toggleBtn, navLinks);

    // Mobile Collections Accordion
    const dropdown = navLinks.querySelector('.dropdown');
    if (dropdown) {
      const dropbtn = dropdown.querySelector('.dropbtn');
      if (dropbtn) {
        dropbtn.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            if (!dropdown.classList.contains('is-mobile-open')) {
              e.preventDefault();
              dropdown.classList.add('is-mobile-open');
            } else {
              // If already open, let the user tap to navigate to collections.html
              // or clicking the arrow toggles it
            }
          }
        });
      }
    }

    // Auto-close drawer on link click (except dropbtn)
    navLinks.querySelectorAll('a').forEach(link => {
      if (!link.classList.contains('dropbtn')) {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navLinks.classList.remove('open');
            toggleBtn.innerHTML = '☰';
            document.body.style.overflow = '';
          }
        });
      }
    });
  }

  // Bind all "+ Add to Container" buttons
  document.querySelectorAll('.card-btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sku = btn.dataset.sku;
      if (sku) {
        RFQCart.add(sku);
        btn.classList.add('added');
        btn.innerHTML = '✓ Added to Container';
        setTimeout(() => {
          btn.classList.remove('added');
          btn.innerHTML = '+ Add to RFQ';
        }, 1500);
      }
    });
  });

  // Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 200);
          }
        });
      });
    });
  }
}

// Global Sticky Container Dock
function initContainerDock() {
  let dock = document.querySelector('.container-dock');
  if (!dock) {
    dock = document.createElement('div');
    dock.className = 'container-dock';
    dock.style.display = 'none'; // Hidden by default when empty
    dock.innerHTML = `
      <div class="dock-inner">
        <div class="dock-info">
          <div class="dock-title-row">
            <span class="dock-icon">📦</span>
            <strong class="dock-heading">Container Load:</strong>
            <span id="dock-cbm-val" class="dock-cbm-val">0.00 CBM</span>
            <span id="dock-sku-count" class="dock-sku-count">(0 SKUs)</span>
          </div>
          <div class="dock-meter-wrap" title="Loading Volume against 20ft FCL Capacity (28 CBM)">
            <div id="dock-meter-fill" class="dock-meter-fill"></div>
          </div>
          <span id="dock-fcl-pct" class="dock-fcl-pct">0% of 20ft FCL</span>
        </div>
        <div class="dock-actions">
          <a href="rfq.html" class="dock-btn">Review RFQ →</a>
          <button type="button" class="dock-minimize-btn" title="Dismiss Dock" aria-label="Dismiss container dock">✕</button>
        </div>
      </div>
    `;
    document.body.appendChild(dock);

    const minBtn = dock.querySelector('.dock-minimize-btn');
    if (minBtn) {
      minBtn.onclick = (e) => {
        e.stopPropagation();
        dock.classList.toggle('minimized');
      };
    }
  }

  function updateDock() {
    const totalCbm = RFQCart.getTotalCBM();
    const skuCount = RFQCart.getSKUCount();
    const cbmValEl = document.getElementById('dock-cbm-val');
    const skuCountEl = document.getElementById('dock-sku-count');
    const meterEl = document.getElementById('dock-meter-fill');
    const fclPctEl = document.getElementById('dock-fcl-pct');

    if (!cbmValEl) return;

    cbmValEl.textContent = `${totalCbm.toFixed(2)} CBM`;
    skuCountEl.textContent = `(${skuCount} SKU${skuCount === 1 ? '' : 's'})`;

    const pct20 = Math.min(Math.round((totalCbm / 28) * 100), 100);
    if (meterEl) meterEl.style.width = `${pct20}%`;
    if (fclPctEl) fclPctEl.textContent = `${pct20}% of 20ft FCL (28 CBM)`;

    if (skuCount > 0) {
      dock.style.display = 'flex';
      dock.classList.add('active');
    } else {
      dock.style.display = 'none';
      dock.classList.remove('active');
    }
  }

  window.addEventListener('rfq-cart-updated', updateDock);
  updateDock();
}

// Quick View Spec Sheet Modal
function initQuickSpecModal() {
  let modal = document.querySelector('.modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog">
        <button class="modal-close-btn" aria-label="Close dialog">✕</button>
        <div class="modal-image-col">
          <img id="modal-img" src="" alt="Product Specification Preview">
        </div>
        <div class="modal-info-col">
          <span id="modal-sku" class="modal-sku-tag">SKU</span>
          <h2 id="modal-title" class="modal-title">Product Name</h2>
          <p id="modal-desc" class="modal-desc"></p>
          <table class="modal-specs-table">
            <tr><td>Botanical Species:</td><td id="modal-species"></td></tr>
            <tr><td>Moisture Level:</td><td id="modal-moisture"></td></tr>
            <tr><td>Dimensions (Inches):</td><td id="modal-dim-in"></td></tr>
            <tr><td>Dimensions (Metric):</td><td id="modal-dim-cm"></td></tr>
            <tr><td>Unit Volume (CBM):</td><td id="modal-cbm"></td></tr>
            <tr><td>Minimum Order (MOQ):</td><td id="modal-moq"></td></tr>
            <tr><td>FOB Mundra Tier:</td><td id="modal-fob"></td></tr>
            <tr><td>Master Export Pack:</td><td id="modal-pack"></td></tr>
          </table>
          <div class="modal-footer">
            <label for="modal-qty-input" style="font-size: 0.85rem; font-weight: 600;">Qty:</label>
            <input type="number" id="modal-qty-input" class="modal-qty-input" value="50" min="10" step="10">
            <button id="modal-add-btn" class="card-btn-add" style="padding: 10px 24px; font-size: 0.9rem;">+ Add to Container RFQ</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.modal-close-btn').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
      }
    });
  }

  function bindSpecTriggers() {
    document.querySelectorAll('.btn-spec, [data-action="spec"]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const sku = btn.dataset.sku || btn.getAttribute('data-sku');
        openModal(sku);
      };
    });
  }
  bindSpecTriggers();
  window.bindSpecTriggers = bindSpecTriggers;

  function openModal(sku) {
    syncAllProductsToCatalog();
    const item = PRODUCT_CATALOG[sku];
    if (!item) return;

    document.getElementById('modal-img').src = item.image;
    document.getElementById('modal-sku').textContent = `SKU: ${item.sku}`;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-desc').textContent = item.desc;
    document.getElementById('modal-species').textContent = item.species;
    document.getElementById('modal-moisture').textContent = item.moisture;
    document.getElementById('modal-dim-in').textContent = item.dimInches;
    document.getElementById('modal-dim-cm').textContent = item.dimCm;
    document.getElementById('modal-cbm').textContent = `${item.cbm} CBM`;
    document.getElementById('modal-moq').textContent = `${item.moq} Pcs`;
    document.getElementById('modal-fob').textContent = item.fobTier;
    document.getElementById('modal-pack').textContent = item.masterPack;

    const qtyInput = document.getElementById('modal-qty-input');
    qtyInput.value = item.moq;

    const addBtn = document.getElementById('modal-add-btn');
    addBtn.onclick = () => {
      const q = parseInt(qtyInput.value, 10) || item.moq;
      RFQCart.add(sku, q);
      modal.classList.remove('open');
    };

    modal.classList.add('open');
  }
  window.openProductSpec = openModal;
}

// Toast Feedback Notification
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2800);
}

// Interactive Container Loading Calculator on rfq.html
function initContainerCalculator() {
  const containerList = document.getElementById('calculator-items-list') || document.querySelector('.calculator-card > div > div:first-child > div');
  const usedCbmDisplay = document.getElementById('used-cbm');
  const usedWeightDisplay = document.getElementById('used-weight');
  const fcl20Progress = document.getElementById('fcl-20-progress');
  const fcl20Text = document.getElementById('fcl-20-text');
  const fcl40Progress = document.getElementById('fcl-40-progress');
  const fcl40Text = document.getElementById('fcl-40-text');
  const weightProgress = document.getElementById('weight-progress');
  const weightLimitText = document.getElementById('weight-limit-text');
  const skuSelect = document.getElementById('catalog-sku-select');
  const addSkuBtn = document.getElementById('btn-add-sku-to-cbm');

  if (!usedCbmDisplay) return;

  function bindRowEvents(row) {
    const input = row.querySelector('.cbm-qty-input');
    const minusBtn = row.querySelector('.btn-minus');
    const plusBtn = row.querySelector('.btn-plus');
    const removeBtn = row.querySelector('.calc-remove-btn');

    if (input) {
      input.addEventListener('input', () => {
        soundFX.playTick(1000);
        recalculate();
      });
    }
    if (minusBtn && input) {
      minusBtn.onclick = () => {
        const step = parseInt(input.step, 10) || 10;
        const current = parseInt(input.value, 10) || 0;
        input.value = Math.max(0, current - step);
        soundFX.playTick(850);
        recalculate();
      };
    }
    if (plusBtn && input) {
      plusBtn.onclick = () => {
        const step = parseInt(input.step, 10) || 10;
        const current = parseInt(input.value, 10) || 0;
        input.value = current + step;
        soundFX.playTick(1250);
        recalculate();
      };
    }
    if (removeBtn) {
      removeBtn.onclick = () => {
        const sku = removeBtn.dataset.sku;
        if (sku) {
          RFQCart.remove(sku);
        }
        soundFX.playTick(700);
        row.remove();
        recalculate();
      };
    }
  }

  function createRow(item, qty) {
    const row = document.createElement('div');
    row.className = 'calc-item-row';
    row.dataset.sku = item.sku;
    row.innerHTML = `
      <div class="calc-item-info">
        <strong class="calc-item-title" title="${item.title}">${item.title}</strong>
        <span class="calc-item-meta">${item.sku} • ${item.cbm} CBM/pc • MOQ ${item.moq || 20}</span>
      </div>
      <div class="calc-qty-control">
        <button type="button" class="calc-qty-btn btn-minus" data-sku="${item.sku}" aria-label="Decrease quantity">−</button>
        <input type="number" class="cbm-qty-input" data-sku="${item.sku}" data-cbm="${item.cbm}" value="${qty}" min="0" step="10">
        <button type="button" class="calc-qty-btn btn-plus" data-sku="${item.sku}" aria-label="Increase quantity">+</button>
        <button type="button" class="calc-remove-btn" data-sku="${item.sku}" title="Remove SKU" aria-label="Remove SKU">✕</button>
      </div>
    `;
    bindRowEvents(row);
    return row;
  }

  // Bind existing static rows
  if (containerList) {
    containerList.querySelectorAll('.calc-item-row').forEach(bindRowEvents);
  }

  // Dynamically insert any items from cart that aren't already listed in calculator
  const cart = RFQCart.get();
  if (containerList && Object.keys(cart).length > 0) {
    Object.keys(cart).forEach(sku => {
      const existingInput = containerList.querySelector(`input[data-sku="${sku}"]`);
      if (existingInput) {
        existingInput.value = cart[sku].qty;
      } else {
        const item = PRODUCT_CATALOG[sku];
        if (item) {
          const row = createRow(item, cart[sku].qty);
          containerList.insertBefore(row, containerList.firstChild);
        }
      }
    });
  }

  // Populate the 500-SKU Master Catalog Quick Add Dropdown with cleanly truncated option labels
  if (skuSelect && window.ALL_PRODUCTS_500) {
    if (skuSelect.options.length <= 1) {
      const sortedItems = [...window.ALL_PRODUCTS_500].sort((a,b) => a.SKU.localeCompare(b.SKU));
      sortedItems.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.SKU;
        const title = item.Product_Name || item.Title || item.title || item.SKU;
        const cleanTitle = title.length > 30 ? title.slice(0, 28) + '…' : title;
        opt.textContent = `${item.SKU} — ${cleanTitle} (${item.CBM} CBM | MOQ ${item.MOQ})`;
        skuSelect.appendChild(opt);
      });
    }

    if (addSkuBtn) {
      addSkuBtn.onclick = function() {
        const selectedSku = skuSelect.value;
        if (!selectedSku) return;
        const item = PRODUCT_CATALOG[selectedSku];
        if (!item) return;

        let existingInput = containerList.querySelector(`input[data-sku="${selectedSku}"]`);
        if (existingInput) {
          existingInput.value = (parseInt(existingInput.value, 10) || 0) + (parseInt(item.moq, 10) || 20);
          existingInput.focus();
        } else {
          const row = createRow(item, item.moq || 20);
          containerList.insertBefore(row, containerList.firstChild);
          const newInput = row.querySelector('.cbm-qty-input');
          if (newInput) newInput.focus();
        }
        soundFX.playChime(880);
        recalculate();
      };
    }
  }

  function recalculate() {
    const calcInputs = document.querySelectorAll('.cbm-qty-input');
    let totalCbm = 0;
    calcInputs.forEach(input => {
      const qty = parseInt(input.value, 10) || 0;
      const cbmPerUnit = parseFloat(input.dataset.cbm) || 0;
      totalCbm += qty * cbmPerUnit;

      const sku = input.dataset.sku;
      if (sku) {
        if (qty > 0) {
          RFQCart.setQty(sku, qty);
        } else {
          RFQCart.remove(sku);
        }
      }
    });

    const roundedCbm = totalCbm.toFixed(2);
    usedCbmDisplay.textContent = roundedCbm + ' CBM';

    // Volume progress (20ft FCL = 28 CBM, 40ft HQ = 68 CBM)
    const pct20 = Math.min(Math.round((totalCbm / 28) * 100), 100);
    if (fcl20Progress) fcl20Progress.style.width = pct20 + '%';
    if (fcl20Text) fcl20Text.textContent = `${pct20}% of 20ft FCL (28 CBM)`;

    const pct40 = Math.min(Math.round((totalCbm / 68) * 100), 100);
    if (fcl40Progress) fcl40Progress.style.width = pct40 + '%';
    if (fcl40Text) fcl40Text.textContent = `${pct40}% of 40ft HQ (68 CBM)`;

    // Weight progress (Average export packaged density = 240 kg / CBM, 20ft legal payload ceiling = 21.8 MT)
    const totalWeightKg = Math.round(totalCbm * 240);
    const totalWeightMt = (totalWeightKg / 1000).toFixed(2);
    if (usedWeightDisplay) {
      usedWeightDisplay.innerHTML = `${totalWeightMt} MT <span class="sub-weight">(${totalWeightKg.toLocaleString()} kg)</span>`;
    }
    const maxPayloadKg = 21800; // 21.8 Metric Tonnes
    const pctWeight = Math.min(Math.round((totalWeightKg / maxPayloadKg) * 100), 100);
    if (weightProgress) weightProgress.style.width = pctWeight + '%';
    if (weightLimitText) weightLimitText.textContent = `${pctWeight}% of Max Payload (21.8 MT)`;

    updateRFQSummary(totalWeightMt);
  }

  function updateRFQSummary(totalWeightMt) {
    const rfqTextarea = document.getElementById('message');
    if (!rfqTextarea) return;
    const currentCart = RFQCart.get();
    const skus = Object.keys(currentCart).filter(s => currentCart[s].qty > 0);
    if (skus.length > 0) {
      let lines = ['I would like to request an official FOB Mundra quotation and container packing proposal for:'];
      skus.forEach(s => {
        const it = currentCart[s];
        lines.push(`• ${it.sku}: ${it.title} — Qty: ${it.qty} pcs (Total: ${(it.qty * it.cbm).toFixed(3)} CBM)`);
      });
      const cbm = RFQCart.getTotalCBM().toFixed(2);
      lines.push(`\nCalculated Total Container Volume: ${cbm} CBM`);
      if (totalWeightMt) {
        lines.push(`Estimated Gross Cargo Weight: ${totalWeightMt} Metric Tonnes`);
      }
      rfqTextarea.value = lines.join('\n');
    }
  }

  recalculate();
}

// Deep Integration on rfq.html (Syncs cart into container items and message box)
function initRFQPageIntegration() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramSku = urlParams.get('sku');
  if (paramSku && PRODUCT_CATALOG[paramSku]) {
    RFQCart.add(paramSku);
  }
}

// Global 2026 Department Dynamic Grid Renderer
function initDepartmentPage(config) {
  const { department, gridId, filterContainerId, counterId, categories, searchInputId } = config;
  const grid = document.getElementById(gridId);
  if (!grid || !window.ALL_PRODUCTS_500) return;

  // Ensure catalog data is loaded into PRODUCT_CATALOG
  if (typeof syncAllProductsToCatalog === 'function') {
    syncAllProductsToCatalog();
  }

  // Filter department items
  let deptItems = window.ALL_PRODUCTS_500.filter(item => {
    if (categories && Array.isArray(categories)) {
      return categories.some(cat => item.Category.toLowerCase().includes(cat.toLowerCase()));
    }
    if (department) {
      return item.Department === department;
    }
    return true;
  });

  let activeSubcat = 'ALL';
  let searchQuery = '';

  function render() {
    let items = deptItems.filter(item => {
      const matchCat = activeSubcat === 'ALL' || item.Category.toLowerCase().includes(activeSubcat.toLowerCase());
      const matchSearch = !searchQuery || 
        item.SKU.toLowerCase().includes(searchQuery) ||
        item.Product_Name.toLowerCase().includes(searchQuery) ||
        item.Material_Construction.toLowerCase().includes(searchQuery) ||
        (item.Target_Buyers && item.Target_Buyers.toLowerCase().includes(searchQuery));
      return matchCat && matchSearch;
    });

    if (counterId) {
      const counterEl = document.getElementById(counterId);
      if (counterEl) counterEl.textContent = `${items.length} of ${deptItems.length} SKUs`;
    }

    grid.innerHTML = '';
    if (items.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <h3>No matching products found</h3>
        <p>Try resetting the category filter or search term.</p>
      </div>`;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-image-wrapper" onclick="window.openProductSpec && window.openProductSpec('${item.SKU}')" style="cursor: pointer;">
          <span class="card-badge">SKU: ${item.SKU}</span>
          <img src="${item.Image}" alt="${item.Product_Name}" loading="lazy">
        </div>
        <div class="card-content">
          <span class="card-category">${item.Category.split(':')[1]?.trim() || item.Category}</span>
          <h3 class="card-title" onclick="window.openProductSpec && window.openProductSpec('${item.SKU}')" style="cursor: pointer;">${item.Product_Name}</h3>
          <p class="card-description">${item.Material_Construction}</p>
          <div class="card-specs">
            <span><strong>Dim:</strong> ${item.Dimensions.split('/')[0]}</span>
            <span><strong>CBM:</strong> ${item.CBM}</span>
            <span><strong>FOB:</strong> ${item.FOB_Mundra_USD}</span>
          </div>
          <div style="font-size: 0.8rem; color: #665C54; margin-top: 6px; display: flex; justify-content: space-between;">
            <span><strong>Retail:</strong> ${item.Western_Retail_USD}</span>
            <span><strong>MOQ:</strong> ${item.MOQ || '25 Pcs'}</span>
          </div>
          <div class="target-buyer-tag" style="margin-top: 6px;">Target: ${item.Target_Buyers}</div>
          <div class="card-actions">
            <button class="card-btn-add" data-sku="${item.SKU}">+ Add to RFQ</button>
            <button class="btn-spec" data-sku="${item.SKU}" title="View Full Export Spec Sheet">Specs ℹ</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Re-bind actions
    if (window.bindSpecTriggers) window.bindSpecTriggers();
    grid.querySelectorAll('.card-btn-add').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const sku = btn.getAttribute('data-sku');
        const prod = PRODUCT_CATALOG[sku];
        if (prod && window.RFQCart) {
          RFQCart.add(sku, prod.moq || 50, prod.cbm || 0.01);
          btn.textContent = '✓ Added to Load';
          btn.style.background = '#2E7D32';
          setTimeout(() => {
            btn.textContent = '+ Add to RFQ';
            btn.style.background = '';
          }, 1200);
        }
      };
    });
  }

  // Populate subcategory filter pills if container provided
  const filterBox = document.getElementById(filterContainerId);
  if (filterBox) {
    const cats = [...new Set(deptItems.map(i => i.Category))].filter(Boolean);
    filterBox.innerHTML = '';
    
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-tag-btn active';
    allBtn.textContent = `All (${deptItems.length})`;
    allBtn.onclick = () => {
      filterBox.querySelectorAll('.filter-tag-btn').forEach(b => b.classList.remove('active'));
      allBtn.classList.add('active');
      activeSubcat = 'ALL';
      render();
    };
    filterBox.appendChild(allBtn);

    cats.forEach(c => {
      const cName = c.split(':')[1]?.trim() || c;
      const cCount = deptItems.filter(i => i.Category === c).length;
      const btn = document.createElement('button');
      btn.className = 'filter-tag-btn';
      btn.textContent = `${cName} (${cCount})`;
      btn.onclick = () => {
        filterBox.querySelectorAll('.filter-tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSubcat = c;
        render();
      };
      filterBox.appendChild(btn);
    });
  }

  // Search input binding if present
  if (searchInputId) {
    const searchEl = document.getElementById(searchInputId);
    if (searchEl) {
      searchEl.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        render();
      });
    }
  }

  render();
}
window.initDepartmentPage = initDepartmentPage;

// ==========================================================================
// 500-SKU GLOBAL COMMAND PALETTE (Cmd+K / Ctrl+K)
// ==========================================================================
function initCommandPalette() {
  const navBtn = document.getElementById('nav-cmd-k-btn');

  // Build Palette Modal DOM if not present
  let backdrop = document.getElementById('cmd-palette-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'cmd-palette-backdrop';
    backdrop.className = 'cmd-palette-backdrop';
    backdrop.innerHTML = `
      <div class="cmd-palette-modal" role="dialog" aria-modal="true" aria-label="Command Search">
        <div class="cmd-palette-header">
          <span class="cmd-palette-search-icon">🔍</span>
          <input type="text" id="cmd-palette-input" class="cmd-palette-input" placeholder="Search 500 SKUs by name, wood species, jaali, or CBM..." autocomplete="off">
          <button type="button" id="cmd-palette-close" class="cmd-palette-close" aria-label="Close Search">✕</button>
        </div>
        <div id="cmd-palette-results" class="cmd-palette-results"></div>
        <div class="cmd-palette-footer">
          <div class="cmd-palette-keys">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>Enter</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
          <span id="cmd-palette-count">500 SKUs indexed</span>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const input = document.getElementById('cmd-palette-input');
  const resultsBox = document.getElementById('cmd-palette-results');
  const closeBtn = document.getElementById('cmd-palette-close');
  const countLabel = document.getElementById('cmd-palette-count');

  function openPalette() {
    backdrop.classList.add('open');
    soundFX.playTick(1200);
    setTimeout(() => {
      if (input) {
        input.focus();
        input.select();
        renderResults(input.value.trim());
      }
    }, 50);
  }

  function closePalette() {
    backdrop.classList.remove('open');
    soundFX.playTick(800);
  }

  if (navBtn) {
    navBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPalette();
    });
  }

  if (closeBtn) closeBtn.onclick = closePalette;
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  // Global Keyboard Shortcuts (Cmd+K, Ctrl+K, Escape)
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (backdrop.classList.contains('open')) closePalette();
      else openPalette();
    } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      e.preventDefault();
      closePalette();
    }
  });

  function renderResults(q) {
    const items = window.ALL_PRODUCTS_500 || Object.values(window.PRODUCT_CATALOG || {});
    const query = q.toLowerCase();
    const filtered = query
      ? items.filter(it => {
          const sku = (it.SKU || it.sku || '').toLowerCase();
          const name = (it.Product_Name || it.Title || it.title || '').toLowerCase();
          const spec = (it.Material_Species || it.species || '').toLowerCase();
          const cat = (it.Category || it.category || '').toLowerCase();
          return sku.includes(query) || name.includes(query) || spec.includes(query) || cat.includes(query);
        }).slice(0, 20)
      : items.slice(0, 12);

    countLabel.textContent = `${filtered.length} of ${items.length} SKUs`;
    resultsBox.innerHTML = '';

    if (filtered.length === 0) {
      resultsBox.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching export SKUs found. Try searching by timber species (Sheesham, Mango), iron jaali, or product title.</div>';
      return;
    }

    filtered.forEach(it => {
      const sku = it.SKU || it.sku;
      const title = it.Product_Name || it.Title || it.title;
      const cbm = it.CBM || it.cbm;
      const moq = it.MOQ || it.moq || 20;
      const species = it.Material_Species || it.species || 'Seasoned Hardwood';
      const img = it.Image_File || it.image || `../assets/sku_${sku.toLowerCase().replace(/-/g, '_')}.jpg`;

      const row = document.createElement('div');
      row.className = 'cmd-result-item';
      row.innerHTML = `
        <img class="cmd-result-thumb" src="${img}" alt="${title}" onerror="this.src='../assets/hero_live_edge_table.jpg'">
        <div class="cmd-result-info">
          <div class="cmd-result-top">
            <span class="cmd-result-sku">${sku}</span>
            <span class="cmd-result-title">${title}</span>
          </div>
          <div class="cmd-result-meta">${species} • ${cbm} CBM/pc • MOQ ${moq}</div>
        </div>
        <button type="button" class="cmd-result-action" data-sku="${sku}">+ Add RFQ</button>
      `;

      row.onclick = (e) => {
        if (e.target.classList.contains('cmd-result-action')) {
          e.stopPropagation();
          if (window.RFQCart) {
            RFQCart.add(sku, moq, cbm);
            soundFX.playChime();
            e.target.textContent = '✓ Added!';
            e.target.style.background = '#2E7D32';
            e.target.style.color = '#FFF';
            setTimeout(() => {
              e.target.textContent = '+ Add RFQ';
              e.target.style.background = '';
              e.target.style.color = '';
            }, 1200);
          }
          return;
        }
        window.location.href = `rfq.html?sku=${sku}`;
      };

      resultsBox.appendChild(row);
    });
  }

  if (input) {
    input.addEventListener('input', (e) => {
      renderResults(e.target.value.trim());
    });
  }
}
window.initCommandPalette = initCommandPalette;
