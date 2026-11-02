import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_DIR || 'playwright');
const server = await createServer({server:{host:'127.0.0.1',port:4176,strictPort:true}});
await server.listen();
let browser;
await mkdir('artifacts/pilot-browser',{recursive:true});
try {
 browser=await chromium.launch({headless:true});
 for(const width of [390,1280]) {
  const page=await browser.newPage({viewport:{width,height:844}});
  await page.goto('http://127.0.0.1:4176');
  await page.locator('.sidebar-nav').waitFor({state:'attached'});
  assert.equal(await page.getByText('Đấu Trường Game',{exact:true}).count(),0);
  assert.equal(await page.locator('.topbar-stat-pill.gems, .live-presence-pill').count(),0);
  for(const label of ['Giáo Trình HSK 1','Tủ Sách PDF Gốc','Phát Âm Pinyin','Tập Viết Chữ Hán','Luyện Nói AI']) {
   if(width<768) await page.getByRole('button',{name:'Mở Menu',exact:true}).click();
   const button=page.locator('.sidebar-nav').getByRole('button',{name:label,exact:true});
   await button.scrollIntoViewIfNeeded();
   await button.click();
   await page.locator('.sidebar-nav-btn.active').filter({hasText:label}).waitFor({state:'attached'});
   // Wait for the lazy view to replace its loading placeholder.
   await page.getByText('Đang nạp dữ liệu Aster HSK...', {exact:true}).waitFor({state:'hidden'});
  }
  for(const pdf of ['New_HSK_Course_1_HSK3.0.pdf','New_HSK_Course_2_HSK3.0.pdf']) {
   const res=await page.request.get('http://127.0.0.1:4176/books/'+pdf);
   assert.ok(res.ok()); assert.equal((await res.body()).subarray(0,4).toString(),'%PDF');
  }
  await page.screenshot({path:`artifacts/pilot-browser/${width}-learning-navigation.png`});
  console.log(`PASS learning navigation ${width}px and local PDF resources`);
  await page.close();
 }
} finally {await browser?.close();await server.close();}
