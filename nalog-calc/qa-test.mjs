import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

const BASE_URL = 'http://nalog-calc.7091039-oo109471.twc1.net';
const SCREENSHOT_DIR = './qa-screenshots';

mkdirSync(SCREENSHOT_DIR, { recursive: true });

const results = [];
let passCount = 0;
let failCount = 0;

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

function pass(test) {
  results.push({ test, status: 'PASS' });
  passCount++;
  log(`✅ PASS: ${test}`);
}

function fail(test, reason) {
  results.push({ test, status: 'FAIL', reason });
  failCount++;
  log(`❌ FAIL: ${test} — ${reason}`);
}

async function screenshot(page, name) {
  const path = `${SCREENSHOT_DIR}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  log(`📸 Screenshot: ${path}`);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/playwright-browsers/chromium-1208/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });

  // ─── TEST 1: Landing page loads, no JS errors, all sections visible ───
  log('\n=== TEST 1: Landing page ===');
  const page = await browser.newPage();
  const jsErrors = [];
  page.on('pageerror', err => jsErrors.push(err.message));

  try {
    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    if (!response || response.status() !== 200) {
      fail('Landing page loads (HTTP 200)', `Status: ${response?.status()}`);
    } else {
      pass('Landing page loads (HTTP 200)');
    }

    await screenshot(page, '01-landing');

    if (jsErrors.length > 0) {
      fail('Landing page — no JS errors', jsErrors.join('; '));
    } else {
      pass('Landing page — no JS errors');
    }

    // Check key sections visible
    const sectionsToCheck = [
      { selector: 'h1', label: 'H1 heading' },
      { selector: 'button, a', label: 'CTA button exists' },
    ];

    for (const { selector, label } of sectionsToCheck) {
      const el = page.locator(selector).first();
      const visible = await el.isVisible().catch(() => false);
      if (visible) {
        pass(`Landing section visible: ${label}`);
      } else {
        fail(`Landing section visible: ${label}`, 'Element not visible');
      }
    }

    // Check text content
    const bodyText = await page.textContent('body');
    if (bodyText && bodyText.length > 100) {
      pass('Landing page has substantial content');
    } else {
      fail('Landing page has substantial content', 'Body text too short');
    }

  } catch (e) {
    fail('Landing page loads', String(e));
    await screenshot(page, '01-landing-error');
  }

  // ─── TEST 2: Click "Начать расчёт" → wizard opens ───
  log('\n=== TEST 2: Open wizard ===');
  try {
    // Find CTA button
    const ctaButton = page.getByText('Начать расчёт').first();
    const ctaVisible = await ctaButton.isVisible().catch(() => false);
    if (!ctaVisible) {
      fail('CTA button "Начать расчёт" visible', 'Button not found');
    } else {
      pass('CTA button "Начать расчёт" visible');
      await ctaButton.click();
      await page.waitForTimeout(500);
      await screenshot(page, '02-wizard-open');

      // Check wizard opened (look for question text or progress indicator)
      const wizardVisible = await page.locator('text=Вопрос').first().isVisible().catch(() => false);
      const altWizardVisible = await page.locator('text=1 из 6').first().isVisible().catch(() => false);
      if (wizardVisible || altWizardVisible) {
        pass('Wizard opened (progress indicator visible)');
      } else {
        // Try checking for step 1 content
        const step1 = await page.locator('text=ИП').first().isVisible().catch(() => false);
        if (step1) {
          pass('Wizard opened (step 1 content visible)');
        } else {
          fail('Wizard opened', 'No wizard content found after clicking CTA');
        }
      }
    }
  } catch (e) {
    fail('Open wizard', String(e));
    await screenshot(page, '02-wizard-error');
  }

  // ─── TEST 3: Complete full questionnaire ───
  log('\n=== TEST 3: Complete questionnaire ===');

  // Q1: Select ИП
  try {
    await page.waitForTimeout(300);
    const ipButton = page.getByText('ИП').first();
    const ipVisible = await ipButton.isVisible().catch(() => false);
    if (ipVisible) {
      await ipButton.click();
      await page.waitForTimeout(300);
      pass('Q1: Selected ИП');
    } else {
      fail('Q1: Select ИП', 'ИП option not visible');
    }
    await screenshot(page, '03-q1-ip');
  } catch (e) {
    fail('Q1: Select ИП', String(e));
  }

  // Click "Далее" to go to Q2
  try {
    const nextBtn = page.getByText('Далее').first();
    await nextBtn.click();
    await page.waitForTimeout(400);
    pass('Q1 → Q2 navigation');
  } catch (e) {
    fail('Q1 → Q2 navigation', String(e));
  }

  // Q2: Revenue ~5 000 000
  try {
    await page.waitForTimeout(300);
    await screenshot(page, '03-q2-revenue');

    // Try to find a manual input field for revenue
    const inputs = page.locator('input[type="text"], input:not([type="range"])');
    const inputCount = await inputs.count();
    log(`Found ${inputCount} text inputs on Q2`);

    // Look for preset buttons or a text input for revenue
    // Try clicking the "5M" or "10M" preset if available, otherwise use the text input
    let revenueSet = false;

    // Try preset button for ~5M
    const preset5m = page.getByText('5 млн').first();
    const preset5mVis = await preset5m.isVisible().catch(() => false);
    if (preset5mVis) {
      await preset5m.click();
      await page.waitForTimeout(200);
      revenueSet = true;
      pass('Q2: Set revenue via 5M preset');
    } else {
      // Try the text input
      const textInput = inputs.first();
      const inputVis = await textInput.isVisible().catch(() => false);
      if (inputVis) {
        await textInput.click({ clickCount: 3 });
        await textInput.fill('5000000');
        await page.waitForTimeout(200);
        revenueSet = true;
        pass('Q2: Set revenue via text input (5000000)');
      } else {
        // Try range slider - set via JavaScript to ~5M
        const slider = page.locator('input[type="range"]').first();
        const sliderVis = await slider.isVisible().catch(() => false);
        if (sliderVis) {
          // The slider is logarithmic: 50k-300M. 5M is roughly in the middle.
          // Let's try setting value directly
          await slider.evaluate((el) => {
            el.value = '5000000';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          });
          await page.waitForTimeout(200);
          revenueSet = true;
          pass('Q2: Set revenue via slider (5000000)');
        } else {
          fail('Q2: Set revenue', 'No input mechanism found');
        }
      }
    }

    if (!revenueSet) {
      // Last resort: find any input and try to set revenue
      log('Trying fallback: locate revenue input by placeholder or label');
    }

    await screenshot(page, '03-q2-revenue-set');
  } catch (e) {
    fail('Q2: Set revenue', String(e));
  }

  // Click "Далее" to go to Q3
  try {
    const nextBtn = page.getByText('Далее').first();
    await nextBtn.click();
    await page.waitForTimeout(400);
    pass('Q2 → Q3 navigation');
  } catch (e) {
    fail('Q2 → Q3 navigation', String(e));
  }

  // Q3: Expenses ~2 000 000 (about 40% of 5M)
  try {
    await page.waitForTimeout(300);
    await screenshot(page, '03-q3-expenses');

    // Look for expense preset buttons (40%)
    const preset40 = page.getByText('40%').first();
    const preset40Vis = await preset40.isVisible().catch(() => false);
    if (preset40Vis) {
      await preset40.click();
      await page.waitForTimeout(200);
      pass('Q3: Set expenses via 40% preset (~2M)');
    } else {
      // Try slider
      const slider = page.locator('input[type="range"]').first();
      const sliderVis = await slider.isVisible().catch(() => false);
      if (sliderVis) {
        await slider.evaluate((el) => {
          // expenses as % of revenue (0-100), 40% = 40
          el.value = '40';
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        });
        await page.waitForTimeout(200);
        pass('Q3: Set expenses via slider (40%)');
      } else {
        fail('Q3: Set expenses', 'No input mechanism found');
      }
    }
    await screenshot(page, '03-q3-expenses-set');
  } catch (e) {
    fail('Q3: Set expenses', String(e));
  }

  // Click "Далее" to go to Q4
  try {
    const nextBtn = page.getByText('Далее').first();
    await nextBtn.click();
    await page.waitForTimeout(400);
    pass('Q3 → Q4 navigation');
  } catch (e) {
    fail('Q3 → Q4 navigation', String(e));
  }

  // Q4: Employees: 2, salary fund ~100 000/month
  try {
    await page.waitForTimeout(300);
    await screenshot(page, '03-q4-employees');

    // Find employee count input or +/- buttons
    // The questionnaire uses a counter with + and - buttons, or preset buttons
    // Preset buttons: 0, 1–5, 6–15, 16–100, 100+
    // Try clicking "1–5" preset first, then setting exact number

    // Look for the counter increment button
    const plusBtn = page.locator('button').filter({ hasText: '+' }).first();
    const plusVisible = await plusBtn.isVisible().catch(() => false);
    if (plusVisible) {
      // Click + twice to get 2 employees
      await plusBtn.click();
      await page.waitForTimeout(150);
      await plusBtn.click();
      await page.waitForTimeout(150);
      pass('Q4: Set employees to 2 via + button');
    } else {
      // Try number input
      const numInput = page.locator('input[type="number"]').first();
      const numInputVis = await numInput.isVisible().catch(() => false);
      if (numInputVis) {
        await numInput.fill('2');
        await page.waitForTimeout(200);
        pass('Q4: Set employees to 2 via number input');
      } else {
        // Try text that says "1–5" preset
        const preset15 = page.getByText('1–5').first();
        const preset15Vis = await preset15.isVisible().catch(() => false);
        if (preset15Vis) {
          await preset15.click();
          await page.waitForTimeout(200);
          pass('Q4: Set employees via 1-5 preset');
        } else {
          fail('Q4: Set employees', 'No employee input found');
        }
      }
    }

    // Set salary fund ~100 000/month
    await page.waitForTimeout(300);
    await screenshot(page, '03-q4-employees-set');

    // Look for payroll input (appears after setting employees > 0)
    const payrollInputs = page.locator('input[type="text"], input:not([type="range"]):not([type="number"])');
    const payrollCount = await payrollInputs.count();
    log(`Found ${payrollCount} text inputs for payroll`);

    // Try "100k" preset
    const preset100k = page.getByText('100 000').first();
    const preset100kVis = await preset100k.isVisible().catch(() => false);
    if (preset100kVis) {
      await preset100k.click();
      await page.waitForTimeout(200);
      pass('Q4: Set payroll via 100k preset');
    } else {
      // Try to find payroll text input
      const payInput = payrollInputs.first();
      const payInputVis = await payInput.isVisible().catch(() => false);
      if (payInputVis) {
        await payInput.click({ clickCount: 3 });
        await payInput.fill('100000');
        await page.waitForTimeout(200);
        pass('Q4: Set payroll via text input');
      } else {
        log('Payroll input not found - may not be visible yet');
      }
    }

    await screenshot(page, '03-q4-payroll-set');
  } catch (e) {
    fail('Q4: Set employees/payroll', String(e));
  }

  // Click "Далее" to go to Q5
  try {
    const nextBtn = page.getByText('Далее').first();
    await nextBtn.click();
    await page.waitForTimeout(400);
    pass('Q4 → Q5 navigation');
  } catch (e) {
    fail('Q4 → Q5 navigation', String(e));
  }

  // Q5: VAT — "Нет, не важно"
  try {
    await page.waitForTimeout(300);
    await screenshot(page, '03-q5-vat');

    const noVatBtn = page.getByText('Нет').first();
    const noVatVis = await noVatBtn.isVisible().catch(() => false);
    if (noVatVis) {
      await noVatBtn.click();
      await page.waitForTimeout(200);
      pass('Q5: Selected Нет (НДС not important)');
    } else {
      // Try full text
      const noVatFull = page.getByText('Нет, не важно').first();
      const noVatFullVis = await noVatFull.isVisible().catch(() => false);
      if (noVatFullVis) {
        await noVatFull.click();
        await page.waitForTimeout(200);
        pass('Q5: Selected Нет, не важно');
      } else {
        fail('Q5: Select Нет (VAT)', 'Button not found');
      }
    }
    await screenshot(page, '03-q5-vat-set');
  } catch (e) {
    fail('Q5: Select VAT option', String(e));
  }

  // Click "Далее" to go to Q6
  try {
    const nextBtn = page.getByText('Далее').first();
    await nextBtn.click();
    await page.waitForTimeout(400);
    pass('Q5 → Q6 navigation');
  } catch (e) {
    fail('Q5 → Q6 navigation', String(e));
  }

  // Q6: Region — Москва (default)
  try {
    await page.waitForTimeout(300);
    await screenshot(page, '03-q6-region');

    // Check if Москва is already selected (it's the default)
    const moscowVisible = await page.getByText('Москва').first().isVisible().catch(() => false);
    if (moscowVisible) {
      pass('Q6: Москва visible (default region)');
    } else {
      // Try to select from dropdown
      const regionSelect = page.locator('select').first();
      const selectVis = await regionSelect.isVisible().catch(() => false);
      if (selectVis) {
        await regionSelect.selectOption('Москва');
        await page.waitForTimeout(200);
        pass('Q6: Selected Москва from dropdown');
      } else {
        fail('Q6: Set region to Москва', 'No region selector found');
      }
    }
    await screenshot(page, '03-q6-region-set');
  } catch (e) {
    fail('Q6: Set region', String(e));
  }

  // ─── TEST 4: Click calculate → results page ───
  log('\n=== TEST 4: Calculate ===');
  let submitRequestOk = false;
  let submitPayload = null;

  // Listen for the /api/submit request
  page.on('request', req => {
    if (req.url().includes('/api/submit')) {
      log(`📡 /api/submit request detected: ${req.method()} ${req.url()}`);
      try {
        submitPayload = JSON.parse(req.postData() || '{}');
        log(`📦 Payload: ${JSON.stringify(submitPayload, null, 2)}`);
      } catch (_) {
        log('Could not parse submit payload');
      }
    }
  });

  page.on('response', res => {
    if (res.url().includes('/api/submit')) {
      log(`📡 /api/submit response: ${res.status()}`);
      if (res.status() === 200) {
        submitRequestOk = true;
      }
    }
  });

  try {
    // Find "Рассчитать" button
    const calcBtn = page.getByText('Рассчитать').first();
    const calcVis = await calcBtn.isVisible().catch(() => false);
    if (calcVis) {
      await calcBtn.click();
      await page.waitForTimeout(3000); // Wait for results to render
      pass('Clicked "Рассчитать" button');
    } else {
      fail('Click "Рассчитать"', 'Button not found');
    }
    await screenshot(page, '04-results');
  } catch (e) {
    fail('Click calculate', String(e));
  }

  // ─── TEST 5: Verify results show all regimes ───
  log('\n=== TEST 5: Verify results ===');
  try {
    await page.waitForTimeout(500);
    const bodyText = await page.textContent('body') || '';

    const regimes = [
      { key: 'УСН 6%', label: 'USN 6%' },
      { key: 'УСН 15%', label: 'USN 15%' },
      { key: 'ОСНО', label: 'ОСНО' },
    ];

    for (const { key, label } of regimes) {
      if (bodyText.includes(key)) {
        pass(`Results show ${label}`);
      } else {
        fail(`Results show ${label}`, `Text "${key}" not found in results`);
      }
    }

    // Patent might not be available at 5M revenue (limit is 60M, so should be available for ИП)
    if (bodyText.includes('Патент') || bodyText.includes('ПСН')) {
      pass('Results show Патент/ПСН');
    } else {
      fail('Results show Патент', 'Patent not found in results — may be unavailable or text differs');
    }

    await screenshot(page, '05-results-full');
  } catch (e) {
    fail('Verify results show regimes', String(e));
  }

  // ─── TEST 6: Verify "Самый выгодный" is highlighted ───
  log('\n=== TEST 6: Best regime highlighted ===');
  try {
    const bodyText = await page.textContent('body') || '';
    if (bodyText.includes('Лучший') || bodyText.includes('Самый выгодный') || bodyText.includes('Рекомендуем') || bodyText.includes('Оптимальный')) {
      pass('"Лучший" / best-regime indicator found');
    } else {
      fail('"Лучший" highlighted', 'Best regime indicator text not found');
    }
  } catch (e) {
    fail('"Самый выгодный" highlighted', String(e));
  }

  // ─── TEST 7: Verify numbers are reasonable ───
  log('\n=== TEST 7: Verify reasonable numbers ===');
  try {
    const bodyText = await page.textContent('body') || '';

    // Check no NaN
    if (bodyText.includes('NaN')) {
      fail('No NaN in results', 'NaN found in page text');
    } else {
      pass('No NaN in results');
    }

    // Check no obvious zeros where we expect money amounts
    // Look for ₽ symbol appearing with numbers
    const rubMatches = bodyText.match(/[\d\s]+₽/g) || [];
    log(`Found ${rubMatches.length} ₽ amount(s) in results`);

    if (rubMatches.length >= 3) {
      pass(`Results show ${rubMatches.length} monetary amounts`);
    } else {
      fail('Results show monetary amounts', `Only ${rubMatches.length} ₽ amounts found`);
    }

    // Check no negative amounts displayed
    const negativeAmounts = bodyText.match(/-\d+[\s\d]*₽/g) || [];
    if (negativeAmounts.length > 0) {
      fail('No negative tax amounts', `Found: ${negativeAmounts.join(', ')}`);
    } else {
      pass('No negative tax amounts displayed');
    }

    // Check the savings amount seems reasonable (should be positive for IP at 5M)
    if (bodyText.includes('экономия') || bodyText.includes('Экономия') || bodyText.includes('сэкономить')) {
      pass('Savings/economy section visible');
    } else {
      log('Note: Savings text not found (may use different wording)');
    }

  } catch (e) {
    fail('Verify reasonable numbers', String(e));
  }

  // ─── TEST 8: Test "Пересчитать" button ───
  log('\n=== TEST 8: Пересчитать button ===');
  try {
    const recalcBtn = page.getByText('Пересчитать').first();
    const recalcVis = await recalcBtn.isVisible().catch(() => false);
    if (recalcVis) {
      await recalcBtn.click();
      await page.waitForTimeout(500);
      pass('Clicked "Пересчитать" button');

      // Check we went back to wizard or landing
      const bodyText = await page.textContent('body') || '';
      if (bodyText.includes('Вопрос') || bodyText.includes('ИП') || bodyText.includes('Начать')) {
        pass('"Пересчитать" navigated back to wizard/landing');
      } else {
        fail('"Пересчитать" navigation', 'Did not navigate back to wizard after clicking Пересчитать');
      }
      await screenshot(page, '08-recalculate');
    } else {
      fail('"Пересчитать" button visible', 'Button not found on results page');
      await screenshot(page, '08-recalculate-missing');
    }
  } catch (e) {
    fail('"Пересчитать" button', String(e));
  }

  await page.close();

  // ─── TEST 9: Mobile viewport 375px ───
  log('\n=== TEST 9: Mobile viewport 375px ===');
  const mobilePage = await browser.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 812 });

  try {
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await screenshot(mobilePage, '09-mobile-landing');

    // Check no horizontal overflow
    const hasOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    if (hasOverflow) {
      const overflowAmount = await mobilePage.evaluate(() => {
        return document.documentElement.scrollWidth - document.documentElement.clientWidth;
      });
      fail('Mobile 375px — no horizontal overflow', `Overflow: ${overflowAmount}px`);
    } else {
      pass('Mobile 375px — no horizontal overflow');
    }

    // Check page is usable on mobile
    const h1Visible = await mobilePage.locator('h1').first().isVisible().catch(() => false);
    if (h1Visible) {
      pass('Mobile 375px — H1 visible');
    } else {
      fail('Mobile 375px — H1 visible', 'H1 not visible on mobile');
    }

    // Navigate to results on mobile
    const ctaBtn = mobilePage.getByText('Начать расчёт').first();
    const ctaVis = await ctaBtn.isVisible().catch(() => false);
    if (ctaVis) {
      await ctaBtn.click();
      await mobilePage.waitForTimeout(500);
      await screenshot(mobilePage, '09-mobile-wizard');

      // Quick flow through wizard
      const ipBtn = mobilePage.getByText('ИП').first();
      const ipVis = await ipBtn.isVisible().catch(() => false);
      if (ipVis) {
        await ipBtn.click();
        await mobilePage.waitForTimeout(200);
      }

      // Navigate through all steps quickly
      for (let step = 1; step <= 5; step++) {
        const nextBtn = mobilePage.getByText(step === 5 ? 'Рассчитать' : 'Далее').first();
        const nextVis = await nextBtn.isVisible().catch(() => false);
        if (nextVis) {
          await nextBtn.click();
          await mobilePage.waitForTimeout(300);
        }
      }

      // Click Рассчитать if not already done
      const calcBtnMobile = mobilePage.getByText('Рассчитать').first();
      const calcVis = await calcBtnMobile.isVisible().catch(() => false);
      if (calcVis) {
        await calcBtnMobile.click();
        await mobilePage.waitForTimeout(1500);
      }

      await screenshot(mobilePage, '09-mobile-results');

      // Check results page overflow on mobile
      const resultsOverflow = await mobilePage.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (resultsOverflow) {
        const overflowAmount = await mobilePage.evaluate(() => {
          return document.documentElement.scrollWidth - document.documentElement.clientWidth;
        });
        fail('Mobile 375px results — no horizontal overflow', `Overflow: ${overflowAmount}px`);
      } else {
        pass('Mobile 375px results — no horizontal overflow');
      }
    }

  } catch (e) {
    fail('Mobile viewport test', String(e));
    await screenshot(mobilePage, '09-mobile-error');
  }
  await mobilePage.close();

  // ─── TEST 10: POST to /api/submit with Russian keys ───
  log('\n=== TEST 10: /api/submit POST verification ===');

  // We already captured the request earlier
  // Let's do another fresh run to verify
  const submitPage = await browser.newPage();
  let capturedSubmitPayload = null;
  let capturedSubmitStatus = null;

  submitPage.on('request', req => {
    if (req.url().includes('/api/submit')) {
      try {
        capturedSubmitPayload = JSON.parse(req.postData() || '{}');
      } catch (_) {}
    }
  });

  submitPage.on('response', async res => {
    if (res.url().includes('/api/submit')) {
      capturedSubmitStatus = res.status();
      log(`📡 /api/submit response status: ${capturedSubmitStatus}`);
    }
  });

  try {
    await submitPage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Quick wizard run to reach results
    const cta = submitPage.getByText('Начать расчёт').first();
    if (await cta.isVisible().catch(() => false)) {
      await cta.click();
      await submitPage.waitForTimeout(400);
    }

    // Q1: ИП
    const ip = submitPage.getByText('ИП').first();
    if (await ip.isVisible().catch(() => false)) {
      await ip.click();
      await submitPage.waitForTimeout(200);
    }

    // Navigate through all 6 steps
    for (let step = 1; step <= 6; step++) {
      const btnText = step === 6 ? 'Рассчитать' : 'Далее';
      const btn = submitPage.getByText(btnText).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        await submitPage.waitForTimeout(300);
      }
    }

    // Wait for submit to fire (it happens on Results mount)
    await submitPage.waitForTimeout(4000);
    await screenshot(submitPage, '10-submit-results');

    if (capturedSubmitPayload) {
      log(`📦 Captured submit payload: ${JSON.stringify(capturedSubmitPayload, null, 2)}`);

      // Check for Russian keys
      const keys = Object.keys(capturedSubmitPayload);
      log(`Keys: ${keys.join(', ')}`);

      const russianKeyPattern = /[а-яА-ЯёЁ]/;
      const russianKeys = keys.filter(k => russianKeyPattern.test(k));

      if (russianKeys.length > 0) {
        pass(`/api/submit has Russian keys: ${russianKeys.join(', ')}`);
      } else {
        fail('/api/submit has Russian keys', `All keys are non-Russian: ${keys.join(', ')}`);
      }

      // Check form field
      if (capturedSubmitPayload.form) {
        pass(`/api/submit has "form" field: "${capturedSubmitPayload.form}"`);
      } else {
        fail('/api/submit has "form" field', 'No "form" key in payload');
      }

    } else {
      log('No /api/submit request captured — checking if it was already fired from previous test');
      if (submitPayload) {
        log(`Using previously captured payload: ${JSON.stringify(submitPayload, null, 2)}`);
        const keys = Object.keys(submitPayload);
        const russianKeyPattern = /[а-яА-ЯёЁ]/;
        const russianKeys = keys.filter(k => russianKeyPattern.test(k));
        if (russianKeys.length > 0) {
          pass(`/api/submit has Russian keys (from previous capture): ${russianKeys.join(', ')}`);
        } else {
          fail('/api/submit has Russian keys', 'No Russian keys found');
        }
      } else {
        fail('/api/submit POST captured', 'No /api/submit request was captured in any test run');
      }
    }

    if (capturedSubmitStatus === 200) {
      pass('/api/submit returned HTTP 200');
    } else if (capturedSubmitStatus !== null) {
      fail('/api/submit returned HTTP 200', `Got status: ${capturedSubmitStatus}`);
    } else if (submitRequestOk) {
      pass('/api/submit returned HTTP 200 (from previous capture)');
    } else {
      fail('/api/submit status check', 'No response status captured');
    }

  } catch (e) {
    fail('/api/submit POST test', String(e));
  }
  await submitPage.close();

  await browser.close();

  // ─── Final Report ───
  console.log('\n' + '='.repeat(60));
  console.log('QA TEST RESULTS');
  console.log('='.repeat(60));
  for (const r of results) {
    const icon = r.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${r.status}: ${r.test}${r.reason ? ` — ${r.reason}` : ''}`);
  }
  console.log('='.repeat(60));
  console.log(`TOTAL: ${passCount} passed, ${failCount} failed`);
  console.log('='.repeat(60));

  if (failCount === 0) {
    console.log('\nQA_RESULT: PASS');
  } else {
    console.log('\nQA_RESULT: FAIL');
  }
})();
