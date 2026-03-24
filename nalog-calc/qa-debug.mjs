import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE_URL = 'http://nalog-calc.7091039-oo109471.twc1.net';
const SCREENSHOT_DIR = './qa-screenshots';
mkdirSync(SCREENSHOT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/playwright-browsers/chromium-1208/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });

  const page = await browser.newPage();
  page.on('pageerror', err => console.log('JS ERROR:', err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
  });

  // Listen for network requests
  page.on('request', req => {
    if (req.url().includes('/api/')) {
      console.log('REQUEST:', req.method(), req.url(), req.postData()?.substring(0, 200));
    }
  });
  page.on('response', res => {
    if (res.url().includes('/api/')) {
      console.log('RESPONSE:', res.status(), res.url());
    }
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Get page title and check H1
  const title = await page.title();
  const h1 = await page.locator('h1').first().textContent().catch(() => 'N/A');
  console.log('Title:', title);
  console.log('H1:', h1);

  // Click CTA
  const cta = page.getByText('Начать расчёт').first();
  await cta.click();
  await page.waitForTimeout(500);

  // Q1: ИП
  console.log('\n--- Q1 ---');
  const q1Text = await page.locator('body').textContent();
  console.log('Page text snippet:', q1Text?.substring(0, 300));

  const ip = page.getByText('ИП').first();
  await ip.click();
  await page.waitForTimeout(200);

  // Далее
  const next1 = page.getByText('Далее').first();
  await next1.click();
  await page.waitForTimeout(400);

  // Q2: Revenue
  console.log('\n--- Q2 ---');
  const q2Text = await page.locator('body').textContent();
  console.log('Page text snippet:', q2Text?.substring(0, 300));

  // Find all inputs
  const inputs = page.locator('input');
  const inputCount = await inputs.count();
  console.log(`Found ${inputCount} inputs`);
  for (let i = 0; i < inputCount; i++) {
    const inp = inputs.nth(i);
    const type = await inp.getAttribute('type').catch(() => 'unknown');
    const val = await inp.inputValue().catch(() => 'N/A');
    const vis = await inp.isVisible().catch(() => false);
    console.log(`  Input ${i}: type=${type}, value=${val}, visible=${vis}`);
  }

  // Set revenue - try text input
  const textInputs = page.locator('input[type="text"]');
  const textCount = await textInputs.count();
  console.log(`Text inputs: ${textCount}`);
  if (textCount > 0) {
    const ti = textInputs.first();
    await ti.click({ clickCount: 3 });
    await ti.fill('5000000');
    await page.waitForTimeout(200);
    const newVal = await ti.inputValue();
    console.log('Revenue input value after fill:', newVal);
  }

  // Далее
  const next2 = page.getByText('Далее').first();
  await next2.click();
  await page.waitForTimeout(400);

  // Q3: Expenses 40%
  console.log('\n--- Q3 ---');
  const q3Text = await page.locator('body').textContent();
  console.log('Page text snippet:', q3Text?.substring(0, 300));

  const p40 = page.getByText('40%').first();
  if (await p40.isVisible().catch(() => false)) {
    await p40.click();
  }
  await page.waitForTimeout(200);

  const next3 = page.getByText('Далее').first();
  await next3.click();
  await page.waitForTimeout(400);

  // Q4: Employees 2
  console.log('\n--- Q4 ---');
  const q4Text = await page.locator('body').textContent();
  console.log('Page text snippet:', q4Text?.substring(0, 400));

  const plusBtn = page.locator('button').filter({ hasText: '+' }).first();
  if (await plusBtn.isVisible().catch(() => false)) {
    await plusBtn.click();
    await page.waitForTimeout(150);
    await plusBtn.click();
    await page.waitForTimeout(150);
    console.log('Clicked + twice for employees');
  }

  // Payroll
  await page.waitForTimeout(300);
  const q4AllInputs = page.locator('input');
  const q4InputCount = await q4AllInputs.count();
  console.log(`Q4 inputs: ${q4InputCount}`);
  for (let i = 0; i < q4InputCount; i++) {
    const inp = q4AllInputs.nth(i);
    const type = await inp.getAttribute('type').catch(() => 'unknown');
    const val = await inp.inputValue().catch(() => 'N/A');
    const vis = await inp.isVisible().catch(() => false);
    console.log(`  Input ${i}: type=${type}, value=${val}, visible=${vis}`);
  }

  const payInputs = page.locator('input[type="text"]');
  const payCount = await payInputs.count();
  if (payCount > 0) {
    const payInput = payInputs.first();
    if (await payInput.isVisible().catch(() => false)) {
      await payInput.click({ clickCount: 3 });
      await payInput.fill('100000');
      console.log('Set payroll to 100000');
    }
  }

  await page.screenshot({ path: `${SCREENSHOT_DIR}/debug-q4.png`, fullPage: true });

  const next4 = page.getByText('Далее').first();
  await next4.click();
  await page.waitForTimeout(400);

  // Q5: Нет
  console.log('\n--- Q5 ---');
  const q5Text = await page.locator('body').textContent();
  console.log('Page text snippet:', q5Text?.substring(0, 300));

  const noBtn = page.getByText('Нет').first();
  if (await noBtn.isVisible().catch(() => false)) {
    await noBtn.click();
    console.log('Clicked Нет');
  }
  await page.waitForTimeout(200);

  const next5 = page.getByText('Далее').first();
  await next5.click();
  await page.waitForTimeout(400);

  // Q6: Москва
  console.log('\n--- Q6 ---');
  const q6Text = await page.locator('body').textContent();
  console.log('Page text snippet:', q6Text?.substring(0, 300));

  const select = page.locator('select').first();
  if (await select.isVisible().catch(() => false)) {
    await select.selectOption('Москва');
    console.log('Selected Москва');
  }

  await page.screenshot({ path: `${SCREENSHOT_DIR}/debug-q6.png`, fullPage: true });

  // Click Рассчитать
  console.log('\n--- CALCULATE ---');
  const calcBtn = page.getByText('Рассчитать').first();
  const calcVis = await calcBtn.isVisible().catch(() => false);
  console.log('Рассчитать visible:', calcVis);

  if (calcVis) {
    await calcBtn.click();
    console.log('Clicked Рассчитать');
  }

  // Wait for results
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/debug-results.png`, fullPage: true });

  console.log('\n--- RESULTS PAGE CONTENT ---');
  const resultsText = await page.locator('body').textContent();
  console.log('Full body text length:', resultsText?.length);
  console.log('Body text (first 2000 chars):\n', resultsText?.substring(0, 2000));

  // Check for specific text
  const checks = ['УСН 6%', 'УСН 15%', 'ОСНО', 'Патент', 'ПСН', 'Самый выгодный', 'Лучший', 'Пересчитать', '₽', 'млн', 'тыс'];
  for (const check of checks) {
    console.log(`Contains "${check}": ${resultsText?.includes(check)}`);
  }

  // Check current URL
  console.log('Current URL:', page.url());

  await browser.close();
})();
