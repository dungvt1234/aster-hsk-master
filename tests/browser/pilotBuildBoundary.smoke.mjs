// Validates built artifacts. A preview feature flag is not access control.
import { createRequire } from 'node:module';
import { mkdtemp, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { build, preview } from 'vite';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_DIR || 'playwright');
const root = await mkdtemp(join(tmpdir(), 'aster-pilot-boundary-'));
const original = process.env.VITE_HSK1_PILOT_PREVIEW;
let browser;
await mkdir('artifacts/pilot-browser', { recursive: true });
try {
  browser = await chromium.launch({ headless: true });
  for (const [mode, enabled, expected] of [['production', 'true', false], ['hsk1-preview', '', false], ['hsk1-preview', 'true', true]]) {
    if (enabled) process.env.VITE_HSK1_PILOT_PREVIEW = enabled; else delete process.env.VITE_HSK1_PILOT_PREVIEW;
    const outDir = join(root, `${mode}-${enabled || 'off'}`);
    await build({ mode, publicDir: false, logLevel: 'error', build: { outDir, emptyOutDir: true } });
    const server = await preview({ mode, build: { outDir }, preview: { host: '127.0.0.1', port: 4175, strictPort: true } });
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    try {
      const page = await context.newPage();
      await page.goto('http://127.0.0.1:4175/?pilot=1');
      await page.locator('.duo-path-layout').waitFor();
      const button = page.getByRole('button', { name: 'Thử bài mẫu: Chào hỏi và xin lỗi', exact: true });
      assert.equal(await button.count(), expected ? 1 : 0, `pilot entry: ${mode} flag=${enabled}`);
      if (expected) {
        await button.click();
        await page.getByRole('dialog', { name: 'Chào hỏi và xin lỗi' }).waitFor();
        await page.screenshot({ path: 'artifacts/pilot-browser/390-built-preview.png' });
      } else assert.equal(await page.getByRole('dialog', { name: 'Chào hỏi và xin lỗi' }).count(), 0);
      console.log(`PASS built pilot boundary: mode=${mode} flag=${enabled || 'off'} visible=${expected}`);
    } finally { await context.close(); await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve())); }
  }
} finally {
  await browser?.close();
  if (original === undefined) delete process.env.VITE_HSK1_PILOT_PREVIEW; else process.env.VITE_HSK1_PILOT_PREVIEW = original;
  await rm(root, { recursive: true, force: true });
}
