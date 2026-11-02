// Run with PLAYWRIGHT_MODULE_DIR pointing to a separately installed Playwright package.
// Speech is stubbed deliberately: this verifies UI/audio error handling, not real pronunciation.
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_DIR || 'playwright');
const server = await createServer({ server: { host: '127.0.0.1', port: 4173, strictPort: true } });
await server.listen();
let browser;
const key = 'aster_pilot_hsk1_greetings_v1';
const output = 'artifacts/pilot-browser';
await mkdir(output, { recursive: true });
try {
  browser = await chromium.launch({ headless: true });
  for (const width of [320, 390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: width < 500 ? 844 : 800 },
      isMobile: width < 500, hasTouch: width < 500, reducedMotion: 'reduce' });
    await context.addInitScript(({ dark }) => {
      localStorage.setItem('aster_hsk_theme', dark ? 'dark' : 'light');
      window.__pilotAudio = 'ok';
      window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
      Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
        getVoices: () => window.__pilotAudio === 'missing' ? [] : [{ lang: 'zh-CN' }],
        cancel() {}, speak(utterance) { queueMicrotask(() => utterance.onend?.()); },
      } });
      if (!localStorage.getItem('aster_completed_nodes')) localStorage.setItem('aster_completed_nodes', '["node-hsk1-0-1"]');
    }, { dark: width === 390 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const click = name => page.getByRole('button', { name, exact: true }).click();
    const answer = async (choice, next) => { await click(choice); await click('Kiểm tra'); await click(next); };
    const geometry = async () => {
      const box = await page.locator('.pilot-dialog').evaluate(el => ({ width: el.clientWidth, scroll: el.scrollWidth }));
      assert.ok(box.scroll <= box.width + 1, `horizontal overflow at ${width}`);
      const contrast = await page.locator('.pilot-dialog').evaluate(el => {
        const style = getComputedStyle(el);
        const luminance = css => {
          const channels = css.match(/[\d.]+/g).slice(0, 3).map(Number).map(c => c / 255).map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };
        const a = luminance(style.color), b = luminance(style.backgroundColor);
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      });
      assert.ok(contrast >= 4.5, `body text contrast at ${width}: ${contrast}`);
      const sizes = await page.locator('.pilot-dialog button:visible').evaluateAll(buttons => buttons.map(el => el.getBoundingClientRect().height));
      assert.ok(sizes.every(height => height >= 44), `tap target at ${width}`);
    };
    await page.goto('http://127.0.0.1:4173/');
    await click('Thử bài mẫu: Chào hỏi và xin lỗi');
    const untouched = await page.evaluate(key => Object.fromEntries(Object.keys(localStorage).filter(k => k !== key).map(k => [k, localStorage.getItem(k)])), key);
    await geometry(); await page.screenshot({ path: `${output}/${width}-intro.png` });
    await click('Học bài mẫu');
    await geometry(); await page.screenshot({ path: `${output}/${width}-learn.png` });
    await click('Luyện có hướng dẫn'); // Playwright scrolls to this button at the bottom of the teaching section.
    await answer('您好！', 'Câu tiếp theo'); await answer('没关系。', 'Bắt đầu tự làm');
    await page.keyboard.press('Escape');
    await page.getByRole('heading', { name: 'Thoát bài đang học?' }).waitFor();
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Thoát và giữ kết quả cũ');
    await click('Tiếp tục bài đang làm');
    await answer('对不起。', 'Câu tiếp theo');
    assert.equal(await page.locator('.pilot-dialog').getByText('你们好', { exact: true }).count(), 0);
    assert.equal(await page.getByRole('button', { name: /你们好/ }).count(), 0);
    await page.evaluate(() => { window.__pilotAudio = 'missing'; });
    await click('Nghe câu hỏi (giọng thiết bị)');
    await page.getByText(/Chưa có giọng tiếng Trung sẵn sàng/).waitFor();
    assert.ok(await page.getByRole('button', { name: 'Kiểm tra', exact: true }).isDisabled());
    await geometry(); await page.screenshot({ path: `${output}/${width}-listening.png` });
    await page.evaluate(() => { window.__pilotAudio = 'ok'; });
    await click('Nghe câu hỏi (giọng thiết bị)');
    await answer('Chào các bạn', 'Câu tiếp theo'); await answer('没关系。', 'Câu tiếp theo');
    await answer('nǐ hǎo', 'Xong phần tự làm');
    await click('Ôn câu vừa sai'); await answer('对不起。', 'Xem kết quả');
    await page.evaluate(key => {
      const original = Storage.prototype.setItem;
      window.__restoreStorage = () => { Storage.prototype.setItem = original; };
      Storage.prototype.setItem = function(k, value) { if (k === key) throw new Error('test quota'); return original.call(this, k, value); };
    }, key);
    await click('Lưu kết quả'); await page.getByRole('alert').filter({ hasText: 'Chưa lưu được kết quả' }).waitFor();
    await page.evaluate(() => window.__restoreStorage());
    await click('Lưu kết quả'); await page.getByRole('heading', { name: 'Đã lưu kết quả bài mẫu' }).waitFor();
    const result = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
    assert.equal(result.correct, 3); assert.equal(result.reviewCorrect, 0); assert.equal(result.reviewTotal, 1);
    assert.deepEqual(await page.evaluate(key => Object.fromEntries(Object.keys(localStorage).filter(k => k !== key).map(k => [k, localStorage.getItem(k)])), key), untouched);
    await geometry(); await page.screenshot({ path: `${output}/${width}-result.png` });
    assert.equal(await page.locator('.pilot-dialog').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.reload(); await click('Thử bài mẫu: Chào hỏi và xin lỗi');
    await page.getByRole('region', { name: 'Kết quả đã lưu' }).waitFor();
    await page.getByText('Đúng lần đầu: 3 / 4 câu.').waitFor();
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: teach/guided/self/listen error/review/save retry/reload/unchanged roadmap/keyboard/tap targets/reduced motion`);
    await context.close();
  }
} finally { await browser?.close(); await server.close(); }
