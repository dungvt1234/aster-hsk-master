import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_DIR || 'playwright');
const server = await createServer({ server: { host: '127.0.0.1', port: 4174, strictPort: true } });
await server.listen();
let browser;
await mkdir('artifacts/pilot-browser', { recursive: true });
try {
  browser = await chromium.launch({ headless: true });
  for (const width of [320, 390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: width < 500, hasTouch: width < 500, reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      localStorage.setItem('aster_completed_nodes', '["node-hsk1-0-1","node-hsk1-0-2","node-hsk1-0-3"]');
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:4174/');
    const focus = page.getByRole('region', { name: 'Học và ôn HSK 1' });
    await focus.getByText('Ôn số đếm', { exact: true }).waitFor();
    const before = await page.evaluate(() => localStorage.getItem('aster_completed_nodes'));
    assert.equal(await page.getByText('Ôn thẻ từ nhanh', { exact: true }).isVisible(), false);
    await focus.getByRole('button', { name: 'Tiếp tục học' }).click();
    await page.locator('.duo-node-popup h3').filter({ hasText: 'Cúp Vinh Quang Số Đếm' }).waitFor();
    await page.locator('.duo-node-popup-overlay').click({ position: { x: 1, y: 1 } });
    await focus.locator('summary').click();
    assert.equal(await focus.getByRole('button', { name: /^Học lại:/ }).count(), 3);
    assert.ok(await focus.getByRole('button', { name: 'Xem bài ôn: Ôn lời xã giao' }).isDisabled());
    const review = focus.getByRole('button', { name: 'Xem bài ôn: Ôn số đếm' });
    await review.focus(); await page.keyboard.press('Enter');
    await page.locator('.duo-node-popup h3').filter({ hasText: 'Cúp Vinh Quang Số Đếm' }).waitFor();
    await page.locator('.duo-node-popup-overlay').click({ position: { x: 1, y: 1 } });
    await focus.getByRole('button', { name: 'Ôn câu đã sai' }).click();
    await page.getByRole('heading', { name: 'Sổ Tay Lỗi Sai' }).waitFor();
    await page.keyboard.press('Escape');
    // Existing mistakes modal may use its own close button; reload reads the same saved progress.
    await page.reload();
    await page.getByRole('region', { name: 'Học và ôn HSK 1' }).waitFor();
    await page.getByText('Công cụ luyện tập và học vượt', { exact: true }).click();
    await page.getByRole('button', { name: 'Ôn thẻ từ nhanh' }).waitFor({ state: 'visible' });
    assert.equal(await page.evaluate(() => localStorage.getItem('aster_completed_nodes')), before);
    const box = await page.locator('.path-learning-focus').evaluate(el => ({ w: el.clientWidth, s: el.scrollWidth }));
    assert.ok(box.s <= box.w + 1);
    await page.getByText('Công cụ luyện tập và học vượt', { exact: true }).click();
    await page.screenshot({ path: `artifacts/pilot-browser/${width}-path-focus.png` });
    assert.deepEqual(errors, []);
    console.log(`PASS path ${width}px: next legacy trophy, review locks, learned replay, mistakes entry, collapsed tools, reload preserves IDs`);
    await context.close();
  }
} finally { await browser?.close(); await server.close(); }
