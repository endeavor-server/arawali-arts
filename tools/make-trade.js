#!/usr/bin/env node
/** Compose website/trade.html from the shared header and footer, so navigation stays identical. */
const fs = require('fs');
const path = require('path');

const WEB = path.resolve(__dirname, '..', 'website');
const index = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');

const header = index.slice(0, index.indexOf('</header>') + '</header>'.length);
const footerStart = index.indexOf('<footer');
const footerEnd = index.indexOf('</footer>') + '</footer>'.length;
const footer = index.slice(footerStart, footerEnd);

const body = `
  <main>
    <section class="trade-hero">
      <div class="container">
        <span class="section-tag" style="color:#C5A059;">WHOLESALE &amp; TRADE PROGRAM</span>
        <h1>Buy direct from the Jodhpur workshop.</h1>
        <p>No trading agents, no sourcing markup. You talk to the factory that cuts, carves, welds and packs the order — with FOB Mundra pricing, container planning and export paperwork handled in-house.</p>
      </div>
    </section>

    <section class="container" style="padding-top: 12px;">
      <div class="trade-steps">
        <div class="trade-step"><span>STEP 01</span><h3>Apply for a trade account</h3><p>Company, destination port and sales channel. We confirm fit within one business day and unlock the full 500-SKU price file.</p></div>
        <div class="trade-step"><span>STEP 02</span><h3>Sample or line review</h3><p>Order a sample box, request finish swatches, or book a video walkthrough of the workshop and the exact SKUs you shortlisted.</p></div>
        <div class="trade-step"><span>STEP 03</span><h3>Container &amp; terms</h3><p>We build the mixed container to your CBM target, quote FOB Mundra, and confirm the production calendar before deposit.</p></div>
      </div>
    </section>

    <section class="container" id="terms" style="padding-bottom: 24px;">
      <div class="trade-grid">
        <div class="trade-card">
          <h2>Apply for a trade account</h2>
          <p>For importers, retail chains, hospitality specifiers and OEM buyers. Fields marked * are required.</p>
          <form data-lead-form="trade_account" novalidate>
            <div class="form-group"><label for="t-name">Your name *</label><input id="t-name" name="name" autocomplete="name" required></div>
            <div class="form-group"><label for="t-company">Company *</label><input id="t-company" name="company" autocomplete="organization" required></div>
            <div class="form-group"><label for="t-email">Work email *</label><input id="t-email" name="email" type="email" autocomplete="email" required></div>
            <div class="form-group"><label for="t-country">Country &amp; destination port *</label><input id="t-country" name="country" required placeholder="e.g. Rotterdam, Netherlands"></div>
            <div class="form-group"><label for="t-channel">Sales channel</label>
              <select id="t-channel" name="container">
                <option>Independent retail / boutique</option>
                <option>Multi-store retail chain</option>
                <option>Wholesale distributor / importer</option>
                <option>Interior design / hospitality specifier</option>
                <option>Marketplace seller (Amazon, Wayfair)</option>
                <option>OEM / private label</option>
              </select>
            </div>
            <div class="form-group"><label for="t-msg">Categories or SKUs you are sourcing</label><textarea id="t-msg" name="message" rows="3" placeholder="e.g. dining tables + iron lighting, 1 x 40HQ per quarter"></textarea></div>
            <button type="submit" class="btn btn-gold btn-block">Apply &amp; unlock the price list</button>
            <div class="lead-status" data-lead-status hidden role="status" aria-live="polite"></div>
            <div class="lead-fallback" data-mailto-slot hidden></div>
            <div data-price-list-slot style="margin-top:14px;"></div>
            <p class="lead-consent">We use these details only to answer your enquiry. No lists, no resale.</p>
          </form>
        </div>

        <div>
          <div class="trade-card" style="margin-bottom: 24px;">
            <h2>Order a sample box</h2>
            <p>Three finished pieces, your choice of finish, delivered by air. Sample cost is credited against your first container.</p>
            <form data-lead-form="sample" novalidate>
              <div class="form-group"><label for="s-name">Your name *</label><input id="s-name" name="name" autocomplete="name" required></div>
              <div class="form-group"><label for="s-email">Work email *</label><input id="s-email" name="email" type="email" autocomplete="email" required></div>
              <div class="form-group"><label for="s-country">Country *</label><input id="s-country" name="country" required></div>
              <div class="form-group"><label for="s-msg">Three SKUs you want sampled</label><textarea id="s-msg" name="message" rows="3" placeholder="e.g. AA-DT-901, AA-CH-252, AA-CST-201"></textarea></div>
              <button type="submit" class="btn btn-ghost btn-block">Request sample box</button>
              <div class="lead-status" data-lead-status hidden role="status" aria-live="polite"></div>
              <div class="lead-fallback" data-mailto-slot hidden></div>
            </form>
          </div>

          <div class="trade-card">
            <h2>Trade terms</h2>
            <table class="terms-table">
              <tr><th>Minimum order</th><td>25–200 pcs per SKU; 1 CBM minimum per line for mixed containers</td></tr>
              <tr><th>Pricing</th><td>FOB Mundra (CIF and Ex-Works on request)</td></tr>
              <tr><th>Payment</th><td>30% deposit, 70% against bill of lading; LC at sight for orders above $50k</td></tr>
              <tr><th>Production</th><td>30–45 days after deposit and artwork approval</td></tr>
              <tr><th>Sampling</th><td>7–10 days by air; cost credited on the first container</td></tr>
              <tr><th>Private label</th><td>Laser engraving, branded cartons, hangtags and UPC labelling</td></tr>
              <tr><th>Documents</th><td>Commercial invoice, packing list, VRIKSH, Lacey Act PPQ 505, EUDR due-diligence statement, ISPM-15</td></tr>
              <tr><th>Exclusivity</th><td>Territory exclusivity considered after two consecutive containers</td></tr>
            </table>
          </div>
        </div>
      </div>

      <div class="trade-faq">
        <h2>Buyer questions</h2>
        <details><summary>Can I mix SKUs in one container?</summary><p>Yes. Most buyers ship 25–60 SKUs per 40HQ. We consolidate cartons by SKU, keep a packing list per line, and load to your CBM target.</p></details>
        <details><summary>Do you supply the US Lacey Act and EUDR paperwork?</summary><p>Yes. Botanical species, harvest origin and supplier declarations are prepared per shipment; VRIKSH legality certificates and ISPM-15 heat treatment are standard.</p></details>
        <details><summary>What is the lead time for a repeat order?</summary><p>Repeat SKUs usually run 30–40 days. New finishes or carved tooling add 10–14 days for first-article approval.</p></details>
        <details><summary>Can you produce to our drawings?</summary><p>Yes, for OEM programmes above 100 pcs per SKU. Send a drawing or reference photo and we return a costed counter-sample plan.</p></details>
        <details><summary>How is the container packed?</summary><p>5-ply export cartons, corner buffers, moisture barrier, ISPM-15 heat-treated dunnage. Carton marks follow your importer instructions.</p></details>
      </div>
    </section>
  </main>

  ${footer}
  <script src="analytics.js" defer></script>
  <script src="lead-form.js" defer></script>
  <script>
    (function () {
      try {
        var cart = JSON.parse(localStorage.getItem('arawali_rfq_cart_v2') || '{}');
        var n = Object.keys(cart).length;
        document.querySelectorAll('.nav-rfq-count, .lkh-cart-badge').forEach(function (el) { el.textContent = n; });
      } catch (e) {}
    })();
  </script>
</body>
</html>
`;

const html = header.replace('<title>', '<title>Wholesale & Trade Program — ').replace(/<title>Wholesale & Trade Program — Arawali Arts — Master Exporter of Handcrafted Furniture & Architectural Iron Decor \| Jodhpur, India<\/title>/, '<title>Wholesale &amp; Trade Program — FOB Mundra Pricing | Arawali Arts</title>');

// header already carries the homepage title only if sliced after </head>; it starts at <!DOCTYPE, so strip its head.
const headEnd = header.indexOf('</head>') + '</head>'.length;
const navOnly = header.slice(headEnd).replace(/^\s*<body>\s*/i, '');

const doc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wholesale &amp; Trade Program — FOB Mundra Pricing | Arawali Arts</title>
  <meta name="description" content="Apply for an Arawali Arts trade account: 500-SKU price file, sample box, mixed-container planning, FOB Mundra terms and full export documentation from Jodhpur.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=2026.32">
  <link rel="canonical" href="https://arawali.endeavoracademy.us/website/trade.html">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Arawali Arts">
  <meta property="og:title" content="Wholesale & Trade Program — Arawali Arts">
  <meta property="og:description" content="Direct factory pricing, sample box, mixed containers and full export documentation from Jodhpur.">
  <meta property="og:image" content="https://arawali.endeavoracademy.us/assets/og/arawali-og.jpg">
  <meta property="og:url" content="https://arawali.endeavoracademy.us/website/trade.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#14100E">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
</head>
<body>
${navOnly}
${body}`;

fs.writeFileSync(path.join(WEB, 'trade.html'), doc);
console.log('trade.html', doc.length, 'bytes');
