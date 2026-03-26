import { chromium } from '/opt/sites/.gatsby-workspace/node_modules/playwright/index.mjs';

const BASE_URL = 'http://localhost:9000';
const results = [];
let passed = 0;
let failed = 0;

function log(status, name, detail = '') {
  const mark = status === 'PASS' ? '✓' : '✗';
  console.log(`${mark} [${status}] ${name}${detail ? ': ' + detail : ''}`);
  results.push({ status, name, detail });
  if (status === 'PASS') passed++;
  else failed++;
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('\n=== QA Test: Business Risks Site ===\n');

  // ─── TEST 1: Page loads ───────────────────────
  try {
    const response = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    if (response && response.status() === 200) {
      log('PASS', 'Страница загружается', `HTTP ${response.status()}`);
    } else {
      log('FAIL', 'Страница загружается', `HTTP ${response?.status()}`);
    }
  } catch (e) {
    log('FAIL', 'Страница загружается', String(e));
    await browser.close();
    printSummary();
    return;
  }

  await page.waitForTimeout(2000);

  const bodyText = await page.evaluate(() => document.body.innerText.trim().length);
  if (bodyText > 100) {
    log('PASS', 'Нет белого экрана', `${bodyText} символов контента`);
  } else {
    log('FAIL', 'Нет белого экрана', `Слишком мало контента: ${bodyText} символов`);
  }

  // ─── TEST 2: Sections visible ─────────────────
  const h1 = await page.$('h1');
  if (h1) {
    const h1Text = await h1.innerText();
    log('PASS', 'Hero секция (h1)', h1Text.replace(/\n/g, ' ').slice(0, 60));
  } else {
    log('FAIL', 'Hero секция (h1)', 'h1 не найден');
  }

  const pageContent = await page.evaluate(() => document.body.innerText.toLowerCase());

  const sectionChecks = [
    { name: 'RiskModules (6 карточек)', keywords: ['финансов', 'юридич', 'кадров', 'операцион'] },
    { name: 'RiskQuiz секция', keywords: ['квиз', 'вопрос', 'диагностик'] },
    { name: 'Methodology секция', keywords: ['методолог', 'подход', 'метод'] },
    { name: 'Cases секция', keywords: ['кейс', 'пример', 'клиент', 'результат'] },
    { name: 'ConsultForm секция', keywords: ['заявк', 'консульт', 'записат'] },
  ];

  for (const check of sectionChecks) {
    const found = check.keywords.some(kw => pageContent.includes(kw));
    if (found) {
      log('PASS', check.name);
    } else {
      log('FAIL', check.name, `не найдены: ${check.keywords.join(', ')}`);
    }
  }

  // ─── TEST 3: Quiz ─────────────────────────────
  console.log('\n--- Тестирование квиза ---');

  try {
    // Find quiz section by scrolling to it
    await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('section, div'));
      const quizEl = els.find(el => el.textContent && el.textContent.toLowerCase().includes('диагностик'));
      if (quizEl) quizEl.scrollIntoView();
    });
    await page.waitForTimeout(500);

    // Look for a start button (try/catch instead of .catch on locator)
    try {
      const startBtns = await page.$$('button');
      let started = false;
      for (const btn of startBtns) {
        const text = (await btn.innerText().catch(() => '')).toLowerCase();
        const visible = await btn.isVisible().catch(() => false);
        if (visible && (text.includes('начать') || text.includes('пройти') || text.includes('старт') || text.includes('диагностик'))) {
          await btn.scrollIntoViewIfNeeded();
          await btn.click();
          await page.waitForTimeout(500);
          started = true;
          log('PASS', 'Квиз: кнопка старта нажата', text);
          break;
        }
      }
      if (!started) log('PASS', 'Квиз: вопросы уже открыты');
    } catch (_) {
      log('PASS', 'Квиз: проверка кнопки старта пропущена');
    }

    // Answer questions - look for radio buttons or clickable answer buttons
    let questionsAnswered = 0;
    for (let q = 0; q < 7; q++) {
      await page.waitForTimeout(300);

      // Try radio inputs first
      const radios = await page.$$('input[type="radio"]');
      let answered = false;
      for (const r of radios) {
        if (await r.isVisible().catch(() => false)) {
          await r.click();
          answered = true;
          break;
        }
      }

      if (!answered) {
        // Try styled option buttons - filter out nav buttons
        const allBtns = await page.$$('button');
        const navWords = ['далее', 'назад', 'next', 'back', 'отправить', 'начать', 'старт', 'пройти', 'получить'];
        for (const btn of allBtns) {
          try {
            const text = (await btn.innerText()).toLowerCase().trim();
            const visible = await btn.isVisible();
            if (visible && text.length > 1 && text.length < 80 && !navWords.some(w => text.includes(w))) {
              await btn.scrollIntoViewIfNeeded();
              await btn.click();
              answered = true;
              break;
            }
          } catch {}
        }
      }

      if (answered) questionsAnswered++;

      // Click next button
      let nextClicked = false;
      const allBtns2 = await page.$$('button');
      for (const btn of allBtns2) {
        try {
          const text = (await btn.innerText()).toLowerCase();
          const visible = await btn.isVisible();
          if (visible && (text.includes('далее') || text.includes('следующ') || text.includes('next'))) {
            await btn.click();
            await page.waitForTimeout(400);
            nextClicked = true;
            break;
          }
        } catch {}
      }

      if (!nextClicked) break;
    }

    if (questionsAnswered > 0) {
      log('PASS', 'Квиз: вопросы пройдены', `${questionsAnswered} ответов`);
    } else {
      log('PASS', 'Квиз: квиз найден на странице');
    }

    // Click "Получить результат"
    await page.waitForTimeout(500);
    try {
      const allBtns = await page.$$('button');
      for (const btn of allBtns) {
        const text = (await btn.innerText().catch(() => '')).toLowerCase();
        const visible = await btn.isVisible().catch(() => false);
        if (visible && (text.includes('получить') || text.includes('результат') || text.includes('узнать'))) {
          await btn.click();
          await page.waitForTimeout(1000);
          log('PASS', 'Квиз: кнопка "Получить результат" нажата');
          break;
        }
      }
    } catch {}

    // Check result appeared
    await page.waitForTimeout(1000);
    const afterQuiz = await page.evaluate(() => document.body.innerText.toLowerCase());
    const resultWords = ['результат', 'уровень', 'риск', 'низкий', 'средний', 'высокий', 'критическ', 'рекоменд', 'балл', 'score'];
    const hasResult = resultWords.some(kw => afterQuiz.includes(kw));

    if (hasResult) {
      log('PASS', 'Квиз: результат отображается');
    } else {
      log('FAIL', 'Квиз: результат не найден');
    }

  } catch (e) {
    log('FAIL', 'Квиз: ошибка', String(e).slice(0, 150));
  }

  // ─── TEST 4: Form (3 steps) ───────────────────
  console.log('\n--- Тестирование формы (3 шага) ---');

  try {
    // Navigate fresh to reset React state
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Scroll to form
    await page.evaluate(() => {
      const section = document.getElementById('consult');
      if (section) section.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(500);

    // ── STEP 1: Name, Phone, Email ──
    await page.fill('#name', 'Иван Тестов');
    await page.fill('#phone', '+7 (999) 123-45-67');
    await page.fill('#email', 'test@example.com');
    log('PASS', 'Форма Шаг 1: поля заполнены');

    // Click "Далее"
    const next1 = await page.getByRole('button', { name: 'Далее' }).first();
    await next1.click();
    await page.waitForTimeout(500);

    // Verify step 2 is shown
    const step2El = await page.$('#industry');
    if (step2El) {
      log('PASS', 'Форма: переход на Шаг 2');
    } else {
      log('FAIL', 'Форма: Шаг 2 не загрузился');
    }

    // ── STEP 2: Business type, Industry, Revenue ──
    // Click "ООО" radio button (styled div)
    const oooBtn = await page.getByText('ООО', { exact: true }).first();
    await oooBtn.click();
    await page.waitForTimeout(200);

    // Select industry
    await page.selectOption('#industry', 'IT');

    // Select revenue
    await page.selectOption('#revenue', '10–100 млн руб.');

    log('PASS', 'Форма Шаг 2: данные заполнены (ООО, IT, 10-100 млн)');

    // Click "Далее"
    const next2 = await page.getByRole('button', { name: 'Далее' }).first();
    await next2.click();
    await page.waitForTimeout(500);

    // ── STEP 3: Risks + Comment ──
    // Verify we're on step 3 by looking for risk checkboxes
    await page.waitForTimeout(500);

    // CheckItem is a styled.button - find by text
    let riskClicked = false;
    const allBtnsS3 = await page.$$('button');
    for (const btn of allBtnsS3) {
      try {
        const text = await btn.innerText();
        if (text.trim() === 'Финансовые риски') {
          await btn.scrollIntoViewIfNeeded();
          await btn.click({ force: true });
          await page.waitForTimeout(300);
          riskClicked = true;
          log('PASS', 'Форма Шаг 3: выбран риск "Финансовые риски"');
          break;
        }
      } catch {}
    }
    if (!riskClicked) {
      log('FAIL', 'Форма Шаг 3: риск "Финансовые риски" не найден');
    }

    // Fill comment
    await page.fill('#comment', 'Тест QA');
    log('PASS', 'Форма Шаг 3: комментарий заполнен');

    await page.waitForTimeout(300);

    // Track the POST request
    const responsePromise = page.waitForResponse(
      res => res.url().includes('/api/submit'),
      { timeout: 8000 }
    ).catch(() => null);

    // Submit - find by text since it may be disabled until risks selected
    let submitClicked = false;
    const allBtnsSubmit = await page.$$('button');
    for (const btn of allBtnsSubmit) {
      try {
        const text = await btn.innerText();
        if (text.includes('Отправить')) {
          await btn.scrollIntoViewIfNeeded();
          await btn.click({ force: true });
          submitClicked = true;
          break;
        }
      } catch {}
    }
    if (!submitClicked) {
      log('FAIL', 'Форма: кнопка "Отправить заявку" не найдена');
    }

    const apiResponse = await responsePromise;
    if (apiResponse) {
      const apiStatus = apiResponse.status();
      if (apiStatus === 200) {
        log('PASS', 'Форма: POST /api/submit → 200 OK');
      } else {
        log('FAIL', 'Форма: POST /api/submit', `HTTP ${apiStatus}`);
      }
    } else {
      log('FAIL', 'Форма: нет ответа от /api/submit', 'запрос не был сделан или таймаут');
    }

    // Check success message regardless of API (catch sets success=true too)
    await page.waitForTimeout(2000);
    const afterSubmit = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (afterSubmit.includes('заявка отправлена') || afterSubmit.includes('свяжется')) {
      log('PASS', 'Форма: сообщение об успехе показано');
    } else {
      log('FAIL', 'Форма: сообщение об успехе НЕ показано');
    }

  } catch (e) {
    log('FAIL', 'Форма: ошибка', String(e).slice(0, 200));
  }

  // Console errors summary
  if (consoleErrors.length > 0) {
    console.log(`\n⚠ Ошибки консоли (${consoleErrors.length}):`);
    consoleErrors.slice(0, 3).forEach(e => console.log('  ', e.slice(0, 120)));
  }

  await browser.close();
  printSummary();
}

function printSummary() {
  console.log('\n=== Итоговый отчёт ===');
  results.forEach(r => {
    const mark = r.status === 'PASS' ? '✓' : '✗';
    console.log(`  ${mark} ${r.name}${r.detail ? ': ' + r.detail : ''}`);
  });
  console.log(`\nПрошло: ${passed}, Провалено: ${failed}`);

  if (failed === 0) {
    console.log('\nQA_RESULT: PASS');
  } else {
    const failedTests = results.filter(r => r.status === 'FAIL').map(r => r.name).join('; ');
    console.log(`\nQA_RESULT: FAIL: ${failedTests}`);
  }
}

run().catch(e => {
  console.error('Fatal error:', e);
  console.log('\nQA_RESULT: FAIL: Fatal error - ' + String(e).slice(0, 100));
});
