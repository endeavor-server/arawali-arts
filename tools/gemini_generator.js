#!/usr/bin/env node
/**
 * Automated Gemini Studio Product Image Generator
 * Drives Google Gemini Pro in Chrome via Apple Events / DOM execution
 * Extracts canvas data URLs and saves directly to assets/sku_<clean_sku>.jpg
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, 'website', 'products_500.json');
const ASSETS_DIR = path.join(ROOT, 'assets');

function runChromeJS(js) {
  const appleScript = `tell application "Google Chrome" to execute active tab of front window javascript ${JSON.stringify(js)}`;
  const proc = spawnSync('osascript', ['-e', appleScript], { maxBuffer: 30 * 1024 * 1024, encoding: 'utf8' });
  if (proc.error) throw proc.error;
  if (proc.status !== 0) {
    throw new Error(`osascript error: ${proc.stderr}`);
  }
  return proc.stdout.trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ensureImagesPage() {
  console.log('Verifying Gemini prompt input readiness...');
  for (let attempt = 1; attempt <= 3; attempt++) {
    const checkStateJS = `(() => {
      const ql = document.querySelector("rich-textarea .ql-editor");
      return JSON.stringify({
        url: window.location.href,
        hasEditor: !!ql
      });
    })()`;
    
    try {
      const state = JSON.parse(runChromeJS(checkStateJS));
      if (state.hasEditor) return true;
    } catch (e) {}

    console.log(`Navigating to https://gemini.google.com/images (attempt ${attempt})...`);
    runChromeJS(`window.location.href = "https://gemini.google.com/images"`);
    await sleep(4000);
  }
  return false;
}

async function getImagesCount() {
  const js = `(() => {
    const imgs = document.querySelectorAll("img.image");
    return imgs.length;
  })()`;
  try {
    return parseInt(runChromeJS(js), 10) || 0;
  } catch (e) {
    return 0;
  }
}

async function generateSKUImage(product) {
  const cleanSku = product.SKU.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const targetPath = path.join(ASSETS_DIR, `sku_${cleanSku}.jpg`);

  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 10000) {
    console.log(`[SKIP] ${product.SKU} already exists on disk.`);
    return true;
  }

  const prompt = `High-end commercial export product photograph of ${product.Product_Name}, ${product.Material_Construction}, styled in a bright minimalist architectural studio, clean warm neutral lighting, 8k photorealistic export catalog style.`;

  console.log(`\n========================================`);
  console.log(`Generating: ${product.SKU} - ${product.Product_Name}`);
  console.log(`Prompt: ${prompt.slice(0, 90)}...`);

  const initialCount = await getImagesCount();

  // Ensure editor is ready in DOM
  for (let waitAttempt = 0; waitAttempt < 6; waitAttempt++) {
    const checkJS = `!!document.querySelector("rich-textarea .ql-editor")`;
    if (runChromeJS(checkJS) === 'true') break;
    await sleep(1500);
  }

  // Insert prompt into editor
  const insertJS = `(() => {
    const ql = document.querySelector("rich-textarea .ql-editor");
    if (!ql) return "no_editor";
    ql.focus();
    document.execCommand("selectAll", false, null);
    document.execCommand("delete", false, null);
    document.execCommand("insertText", false, ${JSON.stringify(prompt)});
    return "inserted";
  })()`;

  const insertRes = runChromeJS(insertJS);
  if (insertRes !== 'inserted') {
    console.error('Failed to insert prompt:', insertRes);
    return false;
  }

  // Wait for Angular to bind the send button
  await sleep(400);

  // Click Send
  const sendJS = `(() => {
    const btn = document.querySelector('button[aria-label="Send message"]');
    if (!btn) return "no_send_button";
    btn.click();
    return "sent";
  })()`;

  const sendRes = runChromeJS(sendJS);
  if (sendRes !== 'sent') {
    console.error('Failed to send:', sendRes);
    return false;
  }

  console.log('Prompt dispatched. Waiting for generation (~6-12s)...');

  // Fast polling loop
  const startTime = Date.now();
  let completed = false;

  while (Date.now() - startTime < 35000) {
    await sleep(2000);
    const pollJS = `(() => {
      const stopBtn = document.querySelector("button[aria-label*='Stop' i]");
      const imgs = document.querySelectorAll("img.image");
      const count = imgs.length;
      let ready = false;
      if (count > ${initialCount}) {
        const last = imgs[count - 1];
        if (last && last.complete && (last.naturalWidth > 100 || last.width > 100) && !stopBtn) {
          ready = true;
        }
      }
      return JSON.stringify({ ready, count, isStopping: !!stopBtn });
    })()`;

    try {
      const status = JSON.parse(runChromeJS(pollJS));
      if (status.ready) {
        completed = true;
        break;
      }
    } catch (e) {}
  }

  if (!completed) {
    console.warn(`Timeout polling for ${product.SKU}. Checking count...`);
    const countNow = await getImagesCount();
    if (countNow <= initialCount) {
      console.error(`Failed generation for ${product.SKU}`);
      return false;
    }
  }

  // Extract latest image via canvas with retry
  console.log('Extracting image canvas data...');
  let dataUrl = '';
  for (let retry = 0; retry < 3; retry++) {
    const extractJS = `(() => {
      const imgs = document.querySelectorAll("img.image");
      if (imgs.length === 0) return "no_img";
      const img = imgs[imgs.length - 1];
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/jpeg", 0.95);
    })()`;

    try {
      dataUrl = runChromeJS(extractJS);
      if (dataUrl && dataUrl.startsWith('data:image/jpeg;base64,')) {
        break;
      }
    } catch (e) {}
    await sleep(1500);
  }

  if (!dataUrl || !dataUrl.startsWith('data:image/jpeg;base64,')) {
    console.error(`Failed to extract dataUrl for ${product.SKU}`);
    return false;
  }

  const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
  fs.writeFileSync(targetPath, Buffer.from(base64Data, 'base64'));
  const size = fs.statSync(targetPath).size;
  console.log(`✓ Saved ${product.SKU} -> assets/sku_${cleanSku}.jpg (${size} bytes)`);

  product.Image = `../assets/sku_${cleanSku}.jpg`;
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  let limit = 200;
  const limitIdx = args.indexOf('--limit');
  if (limitIdx !== -1 && args[limitIdx + 1]) {
    limit = parseInt(args[limitIdx + 1], 10);
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const missing = products.filter(p => {
    const cleanSku = p.SKU.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const targetPath = path.join(ASSETS_DIR, `sku_${cleanSku}.jpg`);
    return !fs.existsSync(targetPath) || fs.statSync(targetPath).size < 10000;
  });

  console.log(`Found ${missing.length} missing product images. Target limit: ${limit}`);
  await ensureImagesPage();

  let generated = 0;
  for (let i = 0; i < missing.length && generated < limit; i++) {
    const p = missing[i];
    
    // Refresh page / new chat every 12 images to keep Chrome lean and snappy
    if (generated > 0 && generated % 12 === 0) {
      console.log('\n--- Resetting session context to keep Chrome responsive ---');
      runChromeJS(`window.location.href = "https://gemini.google.com/images"`);
      await sleep(3500);
    }

    const ok = await generateSKUImage(p);
    if (ok) {
      generated++;
      // Checkpoint JSON
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    } else {
      // On failure, navigate to new chat to clear any stuck UI
      console.log('Encountered issue, resetting page state...');
      runChromeJS(`window.location.href = "https://gemini.google.com/images"`);
      await sleep(3500);
    }

    // Small courteous pause
    await sleep(1500);
  }

  console.log(`\nCompleted generation run: ${generated} new images created.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
