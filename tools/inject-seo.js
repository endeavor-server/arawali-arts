#!/usr/bin/env node
/**
 * Inject the shared SEO head block (canonical, Open Graph, Twitter, favicon)
 * into every hand-maintained page in website/. Idempotent: skips if already present.
 */
const fs = require('fs');
const path = require('path');

const WEB = path.resolve(__dirname, '..', 'website');
const BASE = 'https://arawali.endeavoracademy.us/website/';
const OG = 'https://arawali.endeavoracademy.us/assets/og/arawali-og.jpg';

const files = fs.readdirSync(WEB).filter((f) => f.endsWith('.html') && f !== '404.html');

for (const f of files) {
  const file = path.join(WEB, f);
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes('<!-- seo-head -->')) {
    console.log('skip', f);
    continue;
  }

  const title = (s.match(/<title>([^<]*)<\/title>/) || [, 'Arawali Arts'])[1];
  const desc = (s.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [, title])[1];
  const canonical = BASE + f;

  const block = `  <!-- seo-head -->
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Arawali Arts">
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${desc.replace(/"/g, '&quot;')}">
  <meta property="og:image" content="${OG}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
  <meta name="twitter:description" content="${desc.replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="${OG}">
  <meta name="theme-color" content="#14100E">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../assets/og/arawali-og.jpg">
  <!-- /seo-head -->`;

  s = s.replace(/(<title>[^<]*<\/title>)/, `$1\n${block}`);

  // Organization + WebSite entity graph on the homepage only.
  if (f === 'index.html' && !s.includes('"@type": "Organization"')) {
    const ld = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://arawali.endeavoracademy.us/#org',
          name: 'Arawali Arts',
          url: 'https://arawali.endeavoracademy.us/',
          logo: 'https://arawali.endeavoracademy.us/assets/og/arawali-og.jpg',
          description:
            'Manufacturer and exporter of solid hardwood furniture, architectural wrought-iron decor and luxury tabletop from Jodhpur, India.',
          foundingDate: '2011',
          address: { '@type': 'PostalAddress', addressLocality: 'Jodhpur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
          email: 'export@arawaliarts.com',
          areaServed: ['US', 'GB', 'DE', 'FR', 'NL', 'CA', 'AU'],
          knowsAbout: ['solid wood furniture', 'wrought iron decor', 'OEM manufacturing', 'export compliance', 'US Lacey Act', 'EUDR']
        },
        {
          '@type': 'WebSite',
          '@id': 'https://arawali.endeavoracademy.us/#site',
          name: 'Arawali Arts',
          url: 'https://arawali.endeavoracademy.us/website/index.html',
          publisher: { '@id': 'https://arawali.endeavoracademy.us/#org' },
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: 'https://arawali.endeavoracademy.us/website/collections.html?q={search_term_string}' },
            'query-input': 'required name=search_term_string'
          }
        }
      ]
    };
    s = s.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(ld)}</script>\n</head>`);
  }

  fs.writeFileSync(file, s);
  console.log('updated', f);
}
