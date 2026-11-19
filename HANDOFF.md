# Arawali Arts — Master Agent Handoff & Technical Architecture Guide

> **Confidential Commercial Dossier** • Internal Engineering & Export Operations  
> **Brand & Entity**: Arawali Arts (Estd. 2011, Jodhpur, Rajasthan, India) & *Naturehood* (Retail D2C / Amazon Brand)  
> **Production Instance**: [https://arawali.endeavoracademy.us](https://arawali.endeavoracademy.us)  
> **Git Repository**: `https://github.com/endeavor-server/arawali-arts.git` (Branch: `main`)  
> **Last Updated**: November 19, 2026

---

## 1. Executive Remit & Standing Mission

Arawali Arts is a ~15-year established solid hardwood (Sheesham, Mango, Acacia) and hand-forged wrought-iron manufacturing firm based in the handicraft export cluster of **Jodhpur, Rajasthan, India**.

### Core Objectives
1. **International B2B Wholesale Vertical**: Scale direct container-load exports (20ft FCL / 40ft HQ) targeting premier volume importers, department store chains (Williams-Sonoma, Pottery Barn, Restoration Hardware, Crate & Barrel), hospitality specifiers, and European distributors across North America, the UK, and the EU.
2. **Naturehood Retail Flywheel**: Leverage the direct-to-consumer Amazon Seller Central flywheel to validate SKU velocity, optimize ISTA-1A drop-tested gift packaging, establish price elasticity benchmarks, and convert high-volume retail buyers into private-label wholesale container accounts.
3. **Audit-Grade Compliance**: Guarantee 100% adherence to the **US Lacey Act** (PPQ 505 declarations), **VRIKSH Timber Legality** (Standard V-01 chain of custody), **EUDR Deforestation Due Diligence** (geo-tagged harvest polygons), **ISPM-15** phytosanitary heat treatment, and an **8%–10% kiln moisture content equilibrium SLA**.

### Non-Negotiable Project & Privacy Rules
- **Never Use Cognee or Obsidian**: Under no circumstances should project data, notes, catalogs, or research be indexed into Cognee or Obsidian.
- **Strict Project Isolation**: This commercial enterprise is completely isolated from Endeavor Academy infrastructure. All codebase files, assets, databases, and logs reside strictly within this repository: `/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts`.

---

## 2. Repository Layout & File Map

```
/Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts/
├── HANDOFF.md                   # This master architectural handoff dossier
├── README.md                    # Public quick-start & deployment overview
├── docker-compose.yml           # Production Docker setup for arawali-web container
├── index.html                   # Root HTTP redirect to website/index.html
│
├── website/                     # Production B2B Export Web Application
│   ├── index.html               # Commercial landing page & 8-division showcases
│   ├── collections.html         # Complete 500-SKU / 50-category master directory
│   ├── catalog.html             # Interactive Line Sheet & CBM simulator (Grid/Table)
│   ├── living-dining.html       # Division I: Living & Dining Furniture (50 SKUs)
│   ├── case-goods.html          # Division II: Case Goods & Storage (70 SKUs)
│   ├── tabletop.html            # Division III: Kitchen & Tabletop (70 SKUs)
│   ├── wall-decor.html          # Division IV: Architectural Wall Decor & Mirrors (60 SKUs)
│   ├── lighting-hearth.html     # Division V: Decorative Lighting & Hearthcraft (50 SKUs)
│   ├── garden-outdoor.html      # Division VI: Garden, Patio & Outdoor Living (60 SKUs)
│   ├── office-vanity.html       # Division VII: Home Office, Keepsakes & Vanity (60 SKUs)
│   ├── kids-leisure.html        # Division VIII: Kids, Pets, Leisure & Heritage (80 SKUs)
│   ├── compliance.html          # VRIKSH, Lacey Act, EUDR, ISPM-15 compliance dossier
│   ├── rfq.html                 # Commercial RFQ cart, sample order & CBM dock
│   ├── trade.html               # Wholesale trade terms, FOB pricing & PI clauses
│   ├── 404.html                 # Branded error handling
│   ├── style.css                # Production CSS design system (v2026.64)
│   ├── app.js                   # Client state, CBM math, mega-menus, drawers
│   ├── products-data.js         # Master dataset (window.ALL_PRODUCTS_500)
│   └── products_500.json        # Canonical raw JSON product catalog
│
├── catalogue/                   # Digital Lookbooks & Print Catalogs
│   ├── arawali_arts_corporate_brochure.html  # 88-page interactive flipbook / lookbook
│   └── arawali_arts_trade_catalogue.html     # Technical printable line sheet
│
├── research/                    # Competitor Intelligence & Market Benchmark Files
│   ├── BOTHRA_INTERNATIONAL_BENCHMARK.md     # Jodhpur competitor dossier: Bothra
│   ├── LATIYAL_HANDICRAFTS_BENCHMARK.md      # Jodhpur competitor dossier: Latiyal
│   ├── PRINCE_ART_EXPORT_BENCHMARK.md        # Jodhpur competitor dossier: Prince Art
│   └── ...                                  # Aztec Shiva, Sohan, Woodpecker, Lohiya
│
├── assets/                      # Production Visual Assets
│   ├── webp/                    # Optimized high-resolution WebP hero images
│   ├── sku_aa_*.jpg             # High-res photography for all 500 catalog items
│   └── og/                      # OpenGraph & social preview assets
│
└── tools/                       # Build, Validation & Synchronisation Scripts
    ├── build.js                 # Compiles products_500.json into products-data.js
    ├── update_clean_navbars.py  # Synchronizes clean Categories-only navbar across pages
    ├── check-links.js           # Verifies all intra-site anchors and image assets
    └── make-pdf-catalog.js      # Headless Puppeteer print PDF generator
```

---

## 3. Product Taxonomy & Master Catalog Architecture

The entire merchandising engine is organized around **500 Master SKUs**, subdivided into **50 Specialized Categories** (10 SKUs each), clustered across **8 Natural Manufacturing Divisions**.

| Div # | Manufacturing Division Name | SKUs | Included Categories | Primary Materials | Key Compliance SLA |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **I** | **Living & Dining Furniture** | **50** | `Cat 03, 05, 14, 33, 47` | Sheesham, Mango, Acacia | 8%–10% Kiln Moisture, Mortise & Tenon |
| **II** | **Case Goods & Storage Buffets** | **70** | `Cat 04, 07, 13, 25, 28, 32, 44` | Mango Wood, Hand-Forged Jaali Iron | European Soft-Close, ISTA-1A Drop Tested |
| **III** | **Kitchen, Tabletop & Entertaining** | **70** | `Cat 01, 09, 15, 22, 31, 37, 40` | Acacia Slabs, White Marble, Brass | FDA/LFGB Food-Safe Lacquer, Naturehood D2C |
| **IV** | **Architectural Wall Decor & Mirrors** | **60** | `Cat 02, 16, 38, 39, 45, 48` | Wrought Iron, Float Mirror, Mango | Electrostatic Matte Rust-Proof Powder Coat |
| **V** | **Decorative Lighting & Hearthcraft** | **50** | `Cat 06, 12, 26, 35, 41` | Pierced Iron, Solid Brass, Wood Beads | CE / UL Compatible Wireways, Heat-Resistant |
| **VI** | **Garden, Patio & Outdoor Living** | **60** | `Cat 10, 24, 30, 34, 43, 50` | Architectural Iron, Weathered Acacia | Marine-Grade Seal, UV & Water Resistant |
| **VII** | **Home Office, Keepsakes & Vanity** | **60** | `Cat 08, 19, 23, 27, 29, 36` | Solid Sheesham, Brass Inlays | Anti-Tarnish Velvet, Precision Joinery |
| **VIII** | **Kids, Pets, Leisure & Heritage** | **80** | `Cat 11, 17, 18, 20, 21, 42, 46, 49` | Boxwood, Acacia, Non-Toxic Stains | ASTM F963 Toy Safety, Non-Toxic Stains |
| **TOTAL** | **Full Export Line** | **500** | **50 Categories (10 SKUs / Cat)** | **Jodhpur Hardwood & Blacksmithing** | **100% Lacey Act & EUDR Pre-Cleared** |

### Data Structures & Files
- **Canonical Source**: `website/products_500.json`.
- **Browser Distribution**: `website/products-data.js` exposes `window.ALL_PRODUCTS_500`.
- **Division Metadata**: `website/app.js` exposes `window.EXPORT_DIVISIONS_DATA`.
- **Build Trigger**: `node tools/build.js` regenerates datasets when product fields are altered.

---

## 4. UI/UX Architecture & Layout Standards

### Navigation Bar Standards & Floating Pill Layout
To ensure zero horizontal wrapping, zero accidental hover popups, and fluid responsive alignment across all 15 pages:
1. **Brand Logo**: `ESTD. 2011 • JODHPUR, RAJASTHAN` | `ARAWALI ARTS`
2. **Categories ▾**: Click-only toggle opening the **Endeavor 2-Panel Interactive Explorer** (left panel: 8 divisions; right panel: live interactive preview) and switchable to the **Full 50-Category Taxonomy** (5 columns). Closes cleanly on Esc or outside click.
3. **Fluid Desktop Links**: Responsive spacing (`clamp(8px, 1.2vw, 18px)`) from 993px to 1440px+ across Categories, Collections, Line Sheet, Trade & FOB, Compliance, and Catalogue.
4. **Action Triggers**: Search (`⌘K`), Cart Badge (`Cart`), and primary CTA button (`Request Quote`).
5. **Mobile Architecture**: Under 992px, desktop links and actions are hidden, the brand logo stays single-line, and navigation is driven by the left off-canvas drawer (`openLkhDrawer()`).

### Department Pages (8 Dedicated Manufacturing Divisions)
- All 8 divisions (`living-dining.html`, `case-goods.html`, `tabletop.html`, `wall-decor.html`, `lighting-hearth.html`, `garden-outdoor.html`, `office-vanity.html`, `kids-leisure.html`) use standard vertical Myntra sidebar facets (`CATEGORIES`, `PRIMARY TIMBER & MATERIAL`, `FOB MUNDRA PRICE TIER`, `EXPORT COMPLIANCE`), live counters, and top sort control.
- Subcategory chips and facet search reflect the exact division SKU pool (e.g., 60 SKUs in Wall Decor, 50 SKUs in Lighting, etc.) without cross-department pollution.

### Container Loading Cockpit & RFQ Dock
- Product cards feature `+ Add to RFQ` which updates both `localStorage` and a 30-day first-party cookie (`arawali_rfq_cart_v2` + `arawali_cart_user_added`).
- A bottom floating dock displays real-time container volume (28 CBM 20ft FCL / 68 CBM 40ft HQ), appearing only after items are actively added.

---

## 5. Commercial Logistics, FOB Mundra & Proforma Terms

### Inland Rail to Mundra Port Routing
- **Loading Point**: Factory-stuffed and customs-sealed at Jodhpur Inland Container Depots:
  - **ICD Basni** (Basni Industrial Area, Jodhpur)
  - **ICD Thar** (Thar Dry Port, Bhagat Ki Kothi, Jodhpur)
- **Transit Corridor**: Dedicated container rail haulage directly from ICD Jodhpur to **Mundra Port, Gujarat** (Port Code: `INMUN1`).
- **LCL & Prototypes**: Quoted either **FCA ICD Jodhpur** or **FOB Mundra CFS**, avoiding nominated forwarder destination surcharge surprises.

### 40ft High Cube (HQ) Origin Cost Pool Benchmark (~68 CBM Capacity)
- **ICD Jodhpur → Mundra Rail Freight + Origin THC**: ₹65,000 – ₹80,000 ($775 – $950)
- **CHA Customs Clearance & Filing**: ₹12,000 – ₹18,000 ($145 – $215)
- **ISPM-15 Fumigation & Phytosanitary**: ₹8,000 – ₹12,000 ($95 – $145)
- **VRIKSH / Lacey Act / EUDR Documentation**: ₹5,000 – ₹10,000 ($60 – $120)
- **Nominated Forwarder Surcharge Buffer**: ₹12,000 – ₹18,000 ($145 – $215)
- **Total Origin Pool**: ~$1,220 – $1,645 USD (roughly **$22.00 / CBM** overhead added to ex-factory costs).

### 5 Non-Negotiable Proforma Invoice (PI) Terms
Embedded directly into `website/trade.html` and every commercial invoice:
1. **Incoterms® 2020**: FOB Mundra Port. Risk passes at ship's rail.
2. **Payment & Documents**: 30% TT deposit upon PI; 70% against scanned OBL and compliance dossier. Telex Release upon 100% cleared funds.
3. **Vessel Nomination**: 10-day cargo readiness notice; buyer must book within 14 calendar days to avoid port ground rent/demurrage.
4. **Forwarder Surcharges**: Standard port tariffs covered; unapproved agent fees billed back to buyer.
5. **Artisanal Variance**: 8%–10% moisture equilibrium. Natural grain, micro-knots, and hand-hammered patinas are authentic artisanal characteristics.

---

## 6. Production Infrastructure & Deployment Runbook

### Server Specs
- **Cloud Provider**: Oracle Cloud Infrastructure (OCI)
- **Public IP**: `130.210.42.84`
- **SSH Access**: `ssh -i ~/.ssh/oracle_endeavor -o StrictHostKeyChecking=no ubuntu@130.210.42.84`
- **Application Path**: `/opt/apps/arawali-arts`
- **Docker Container**: `arawali-web` (Running Nginx, auto-restarting)

### Routine Deployment Command (Run from Local Mac Workspace)
```bash
# 1. Commit and push local changes
cd /Users/endeavoracademy/OpenBot/Shared/Projects/ArawaliArts
git add .
git commit -m "feat(scope): describe changes"
git push origin main

# 2. Deploy to Oracle Cloud production instance
ssh -i ~/.ssh/oracle_endeavor -o StrictHostKeyChecking=no ubuntu@130.210.42.84 \
  "cd /opt/apps/arawali-arts && sudo git pull origin main && docker restart arawali-web"

# 3. Verify in browser
curl -I https://arawali.endeavoracademy.us/website/index.html
```

---

## 7. Subagent Delegation Guide for Other Agents

When other OpenBot agents take over tasks on this repository, follow these delegated specialties:

| Agent Role | Subagent Type | Key Responsibility & Files Owned |
| :--- | :--- | :--- |
| **Export Strategist** | `export-strategist` | Customs documentation, US Lacey Act PPQ 505 schedules, EUDR GPS coordinates, freight audits, IHGF Delhi / High Point Market prep (`research/`, `website/compliance.html`, `website/trade.html`). |
| **Product Engineer** | `product-engineer` / `b2b-web-developer` | Frontend architecture, CSS design system, CBM container engine, Myntra filters, WCAG 2.1 AA accessibility, cache-busting (`website/*.html`, `website/style.css`, `website/app.js`). |
| **Brochure Designer** | `brochure-designer` | Digital HTML flipbooks, TOC spread pagination, print PDF stylesheets, corporate lookbooks (`catalogue/arawali_arts_corporate_brochure.html`, `tools/make-pdf-catalog.js`). |
| **Amazon Merchandiser** | `amazon-merchandiser` | Naturehood listing optimization, A+ content modules, gift-box unboxing design, FBA CBM replenishment (`research/`, `website/tabletop.html`). |

---

*This document serves as the single source of truth for all human developers and AI autonomous agents working on Arawali Arts.*
