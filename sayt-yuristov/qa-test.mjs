import { chromium } from '/opt/sites/.gatsby-workspace/node_modules/playwright/index.mjs';

const BASE_URL = 'http://sayt-yuristov.7091039-oo109471.twc1.net';
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
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

  console.log('\n=== QA Test: Sayt-Yuristov ===\n');

  // TEST 1: Page loads
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
    return printSummary();
  }

  await page.waitForTimeout(2000);

  const bodyLen = await page.evaluate(() => document.body.innerText.trim().length);
  log(bodyLen > 100 ? 'PASS' : 'FAIL', 'Нет белого экрана', `${bodyLen} символов`);

  const h1 = await page.$('h1');
  if (h1) {
    log('PASS', 'H1 присутствует', (await h1.innerText()).slice(0, 60));
  } else {
    log('FAIL', 'H1 присутствует', 'h1 не найден');
  }

  const pageText = await page.evaluate(() => document.body.innerText.toLowerCase());

  const sectionChecks = [
    { name: 'Услуги', keywords: ['услуг', 'гражданск', 'корпоратив', 'семейн'] },
    { name: 'Команда', keywords: ['команд', 'юрист', 'партнёр', 'воронов', 'смирнова', 'карпов'] },
    { name: 'Почему мы', keywords: ['почему', 'опыт', 'дел', 'лет', 'побед'] },
    { name: 'Форма обратной связи', keywords: ['имя', 'телефон', 'email', 'заявк', 'обращени', 'консульт'] },
  ];

  for (const check of sectionChecks) {
    const found = check.keywords.some(kw => pageText.includes(kw));
    log(found ? 'PASS' : 'FAIL', check.name, found ? 'ключевые слова найдены' : `не найдены: ${check.keywords.join(', ')}`);
  }

  // TEST: Form submission
  console.log('\n--- Тестирование формы ---');
  try {
    const nameInput = await page.$('input[name*="name"], input[placeholder*="мя"], input[placeholder*="Name"]');
    const phoneInput = await page.$('input[name*="phone"], input[type="tel"], input[placeholder*="елефон"]');
    const emailInput = await page.$('input[type="email"], input[name*="email"]');

    if (nameInput) { await nameInput.fill('Тест Тестов'); log('PASS', 'Форма: поле Имя'); }
    else log('FAIL', 'Форма: поле Имя не найдено');

    if (phoneInput) { await phoneInput.fill('+7 (999) 123-45-67'); log('PASS', 'Форма: поле Телефон'); }
    else log('FAIL', 'Форма: поле Телефон не найдено');

    if (emailInput) { await emailInput.fill('test@example.com'); log('PASS', 'Форма: поле Email'); }
    else log('FAIL', 'Форма: поле Email не найдено');

    const selects = await page.$$('select');
    if (selects.length > 0) {
      await selects[0].selectOption({ index: 1 });
      log('PASS', 'Форма: выпадающий список');
    }

    const textareas = await page.$$('textarea');
    if (textareas.length > 0) {
      await textareas[0].fill('Тестовое обращение для QA проверки');
      log('PASS', 'Форма: поле описания');
    }

    const responsePromise = page.waitForResponse(
      res => res.url().includes('/api/submit'),
      { timeout: 8000 }
    ).catch(() => null);

    // Click submit
    const buttons = await page.$$('button[type="submit"], button');
    for (const btn of buttons) {
      try {
        const text = await btn.innerText();
        const visible = await btn.isVisible();
        if (visible && (text.includes('Отправить') || text.includes('Записаться') || text.includes('Получить') || text.includes('Связаться'))) {
          await btn.click();
          break;
        }
      } catch {}
    }

    const apiResp = await responsePromise;
    if (apiResp && apiResp.status() === 200) {
      log('PASS', 'Форма: POST /api/submit → 200 OK');
    } else {
      await page.waitForTimeout(2000);
      const afterText = await page.evaluate(() => document.body.innerText.toLowerCase());
      const successKw = ['спасибо', 'отправлено', 'получили', 'свяжемся', 'успех'];
      if (successKw.some(kw => afterText.includes(kw))) {
        log('PASS', 'Форма: успех (сообщение показано)');
      } else {
        log('FAIL', 'Форма: нет ответа от /api/submit и нет success-сообщения');
      }
    }
  } catch (e) {
    log('FAIL', 'Форма: ошибка', String(e).slice(0, 100));
  }

  if (consoleErrors.length === 0) {
    log('PASS', 'Нет ошибок в консоли браузера');
  } else {
    log('FAIL', `Ошибки в консоли (${consoleErrors.length})`, consoleErrors[0].slice(0, 80));
  }

  await browser.close();
  printSummary();
}

function printSummary() {
  console.log('\n=== Итоговый отчёт ===');
  results.forEach(r => {
    console.log(`  ${r.status === 'PASS' ? '✓' : '✗'} ${r.name}${r.detail ? ': ' + r.detail : ''}`);
  });
  console.log(`\nПрошло: ${passed}, Провалено: ${failed}`);
  if (failed === 0) {
    console.log('\nQA_RESULT: PASS');
  } else {
    const failedList = results.filter(r => r.status === 'FAIL').map(r => r.name).join('; ');
    console.log(`\nQA_RESULT: FAIL: ${failedList}`);
  }
}

run().catch(e => {
  console.error('Fatal:', e);
  console.log('\nQA_RESULT: FAIL: Fatal - ' + String(e).slice(0, 100));
});
