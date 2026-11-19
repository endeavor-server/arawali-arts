const fs = require("fs");
const path = require("path");

const brochurePath = path.join(__dirname, "../catalogue/arawali_arts_corporate_brochure.html");
let html = fs.readFileSync(brochurePath, "utf8");

// 1. Replace the page-inner, spread-header, spread-footer, mag-product-grid, mag-product-card styles
const oldStyleBlockStart = `.page-inner {
      padding: clamp(16px, 3.2vw, 28px);
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      position: relative;
      justify-content: space-between;
    }`;

const newStyleBlock = `.page-inner {
      padding: 14px 16px;
      height: 100%;
      max-height: 100%;
      width: 100%;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      position: relative;
      justify-content: space-between;
      overflow: hidden;
    }

    .stf__item.--left .page-inner {
      padding-right: 22px;
      padding-left: 14px;
    }

    .stf__item.--right .page-inner {
      padding-left: 22px;
      padding-right: 14px;
    }

    /* Running Header & Footer with Strict Zero-Overflow Ellipsis */
    .spread-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-size: 0.60rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #8C7E72;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(184, 149, 82, 0.25);
      margin-bottom: 8px;
      font-weight: 700;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      flex-shrink: 0;
    }

    .spread-header span,
    .spread-header strong {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .spread-header strong {
      color: var(--accent-gold);
      text-align: right;
    }

    .spread-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-size: 0.62rem;
      color: #8C7E72;
      padding-top: 6px;
      border-top: 1px solid rgba(184, 149, 82, 0.2);
      margin-top: auto;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      flex-shrink: 0;
    }

    .spread-footer span:first-child {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .spread-page-num {
      font-family: var(--font-cinzel);
      font-weight: 700;
      color: var(--primary);
      flex-shrink: 0;
    }`;

// Check if old style block exists
if (html.includes(oldStyleBlockStart)) {
  // Replace from oldStyleBlockStart to .spread-page-num block
  const startIdx = html.indexOf(oldStyleBlockStart);
  const endMarker = `.spread-page-num {\n      font-family: var(--font-cinzel);\n      font-weight: 700;\n      color: var(--primary);\n    }`;
  const endIdx = html.indexOf(endMarker);
  if (endIdx !== -1) {
    html = html.slice(0, startIdx) + newStyleBlock + html.slice(endIdx + endMarker.length);
    console.log("Replaced page-inner, spread-header, and spread-footer styles.");
  }
}

// 2. Replace product grid & card styles
const oldGridBlockStart = `/* PRODUCT GRID IN SPREAD */\n    .mag-product-grid {`;
const oldGridBlockEnd = `.mag-btn-add:hover {\n      background: var(--accent-gold);\n      color: #12100E;\n    }`;

const newGridBlock = `/* PRODUCT GRID IN SPREAD — FIXED FOR ZERO CROPPING (STRICT MINMAX) */
    .mag-product-grid {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 8px !important;
      margin: 4px 0 !important;
      flex-grow: 1;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      min-width: 0 !important;
      align-content: stretch;
    }

    .mag-product-card {
      background: #FFFFFF;
      border: 1px solid #ECE6DE;
      border-radius: 6px;
      padding: 6px 8px !important;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 10px rgba(18, 16, 14, 0.04);
      transition: all 0.2s ease;
      min-width: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }

    .mag-product-card:hover {
      box-shadow: 0 8px 18px rgba(184, 149, 82, 0.15);
      border-color: rgba(184, 149, 82, 0.4);
    }

    .mag-product-img {
      width: 100%;
      height: clamp(65px, 11vh, 100px);
      border-radius: 4px;
      background-size: cover;
      background-position: center;
      margin-bottom: 4px;
      position: relative;
      flex-shrink: 0;
    }

    .mag-sku-badge {
      position: absolute;
      top: 3px;
      left: 3px;
      background: rgba(18, 16, 14, 0.88);
      color: var(--accent-light);
      font-size: 0.55rem;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 3px;
      letter-spacing: 0.04em;
    }

    .mag-product-title {
      font-family: var(--font-serif);
      font-weight: 600;
      font-size: 0.72rem;
      color: var(--primary);
      line-height: 1.2;
      margin-bottom: 3px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 2.4em;
      word-break: break-word;
    }

    .mag-product-meta {
      font-size: 0.56rem;
      color: #7E7266;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      display: block;
    }

    .mag-product-pricing {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 4px;
      margin-top: auto;
      padding-top: 4px;
      border-top: 1px solid #F0EAE1;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .mag-fob-price {
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 0.64rem;
      color: var(--primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      min-width: 0;
    }

    .mag-btn-add {
      background: rgba(184, 149, 82, 0.12);
      border: 1px solid rgba(184, 149, 82, 0.4);
      color: #7D5E23;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.56rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }

    .mag-btn-add:hover {
      background: var(--accent-gold);
      color: #12100E;
    }`;

if (html.includes(oldGridBlockStart)) {
  const startIdx = html.indexOf(oldGridBlockStart);
  const endIdx = html.indexOf(oldGridBlockEnd);
  if (endIdx !== -1) {
    html = html.slice(0, startIdx) + newGridBlock + html.slice(endIdx + oldGridBlockEnd.length);
    console.log("Replaced mag-product-grid & card styles.");
  }
}

// 3. Replace calcBookDimensions function
const oldCalcStart = `function calcBookDimensions() {`;
const oldCalcEnd = `isPortrait: false\n          };\n        }\n      }`;

const newCalcBlock = `function calcBookDimensions() {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const isMobile = winWidth <= 800;

        if (isMobile) {
          // Portrait single-page mode - guarantee clean fit within mobile screen bounds
          const availW = Math.min(winWidth - 16, 420);
          const availH = winHeight - 110;
          let w = availW;
          let h = w * 1.414;
          if (h > availH) {
            h = availH;
            w = h / 1.414;
          }
          return {
            width: Math.floor(Math.max(w, 280)),
            height: Math.floor(Math.max(h, 400)),
            isPortrait: true
          };
        } else {
          // Desktop 2-page spread mode
          // Maintain true ISO 216 / A4 spread ratio (2 * singleW) : height = 1.4142 : 1
          const availW = Math.max(winWidth - 60, 600);
          const availH = Math.max(winHeight - 120, 500);

          let spreadH = availH;
          let spreadW = spreadH * 1.4142;

          if (spreadW > availW) {
            spreadW = availW;
            spreadH = spreadW / 1.4142;
          }

          // Bound spread height between 520px and 820px
          spreadH = Math.min(Math.max(spreadH, 500), 820);
          spreadW = spreadH * 1.4142;

          // Re-check width bound
          if (spreadW > availW) {
            spreadW = availW;
            spreadH = spreadW / 1.4142;
          }

          const singleW = Math.floor(spreadW / 2);
          const singleH = Math.floor(spreadH);

          return {
            width: singleW,
            height: singleH,
            isPortrait: false
          };
        }
      }`;

if (html.includes(oldCalcStart)) {
  const startIdx = html.indexOf(oldCalcStart);
  const endIdx = html.indexOf(oldCalcEnd);
  if (endIdx !== -1) {
    html = html.slice(0, startIdx) + newCalcBlock + html.slice(endIdx + oldCalcEnd.length);
    console.log("Replaced calcBookDimensions function.");
  }
}

// 4. Replace resize listener
const oldResizeBlock = `let resizeTimer = null;\n      window.addEventListener("resize", () => {\n        clearTimeout(resizeTimer);\n        resizeTimer = setTimeout(() => {\n          if (pageFlipInstance && currentViewMode === "flipbook") {\n            try {\n              pageFlipInstance.update();\n            } catch (e) {}\n          }\n        }, 250);\n      });`;

const newResizeBlock = `let resizeTimer = null;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (pageFlipInstance && currentViewMode === "flipbook") {
            try {
              const newDims = calcBookDimensions();
              const currentBounds = pageFlipInstance.getBoundsRect ? pageFlipInstance.getBoundsRect() : null;
              if (currentBounds && (Math.abs(currentBounds.pageWidth - newDims.width) > 30 || Math.abs(currentBounds.height - newDims.height) > 30)) {
                const curPage = pageFlipInstance.getCurrentPageIndex();
                pageFlipInstance.destroy();
                pageFlipInstance = null;
                initMagazine();
                if (pageFlipInstance && curPage > 0) {
                  pageFlipInstance.turnToPage(curPage);
                }
              } else {
                pageFlipInstance.update();
              }
            } catch (e) {
              console.warn("Resize update error:", e);
            }
          }
        }, 300);
      });`;

if (html.includes(oldResizeBlock)) {
  html = html.replace(oldResizeBlock, newResizeBlock);
  console.log("Replaced resize listener.");
}

fs.writeFileSync(brochurePath, html, "utf8");
console.log("Successfully wrote all crop fixes to catalogue/arawali_arts_corporate_brochure.html!");
