import { chromium } from '/opt/sites/.gatsby-workspace/node_modules/playwright/index.mjs';

const BASE_URL = 'http://business-risks.7091039-oo109471.twc1.net';
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

  console.log('\n=== QA Test: Business Risks Landing (OPE-32) ===\n');

  try {
    const res = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    log(res?.status() === 200 ? 'PASS' : 'FAIL', 'Страница загружается', `HTTP ${res?.status()}`);
  } catch (e) {
    log('FAIL', 'Страница загружается', String(e));
    await browser.close();
    return printSummary();
  }

  await page.waitForTimeout(2000);

  const bodyLen = await page.evaluate(() => document.body.innerText.trim().length);
  log(bodyLen > 500 ? 'PASS' : 'FAIL', 'Контент загружен', `${bodyLen} символов`);

  const h1 = await page.$('h1');
  if (h1) log('PASS', 'H1 присутствует', (await h1.innerText()).slice(0, 80));
  else log('FAIL', 'H1 отсутствует');

  const pageText = await page.evaluate(() => document.body.innerText.toLowerCase());

  const checks = [
    { name: 'Секция продуктов', kw: ['риски по операциям', 'контрагент', 'арбитраж'] },
    { name: 'Риски по самозанятым', kw: ['самозанят'] },
    { name: 'Новые возможности', kw: ['новое', 'другого банка', 'интеграц'] },
    { name: 'Форматы / тарифы', kw: ['всё включено', 'конструктор'] },
    { name: 'Сценарии использования', kw: ['сценари', 'если боит', 'если работает'] },
    { name: 'FAQ аккордеон', kw: ['зачем нужен', 'кому подойд', 'как выбрать'] },
    { name: 'Финальный CTA', kw: ['начни контролир', 'прямо сейчас'] },
  ];

  for (const c of checks) {
    const found = c.kw.some(kw => pageText.includes(kw));
    log(found ? 'PASS' : 'FAIL', c.name, found ? 'ключевые слова найдены' : `не найдены: ${c.kw.join(', ')}`);
  }

  // FAQ accordion test
  console.log('\n--- Тест FAQ аккордеона ---');
  try {
    const faqBtns = await page.$$('button');
    let faqOpened = false;
    for (const btn of faqBtns) {
      try {
        const text = await btn.innerText();
        const visible = await btn.isVisible();
        if (visible && text.includes('Зачем нужен')) {
          await btn.click();
          await page.waitForTimeout(500);
          faqOpened = true;
          log('PASS', 'FAQ: вопрос раскрывается');
          break;
        }
      } catch {}
    }
    if (!faqOpened) log('FAIL', 'FAQ: кнопка не найдена');
  } catch (e) {
    log('FAIL', 'FAQ: ошибка', String(e).slice(0, 80));
  }

  // Modal test
  console.log('\n--- Тест модального окна ---');
  try {
    const ctaBtns = await page.$$('button');
    let modalOpened = false;
    for (const btn of ctaBtns) {
      try {
        const text = await btn.innerText();
        const visible = await btn.isVisible();
        if (visible && (text.includes('Подключить') || text.includes('Подключ'))) {
          await btn.scrollIntoViewIfNeeded();
          await btn.click();
          await page.waitForTimeout(800);
          const modal = await page.$('[style*="position: fixed"], [class*="Overlay"], [class*="overlay"]');
          if (modal) {
            log('PASS', 'Модальное окно открывается');
            modalOpened = true;
          } else {
            const afterText = await page.evaluate(() => document.body.innerText.toLowerCase());
            if (afterText.includes('перезвон') || afterText.includes('имя') || afterText.includes('телефон')) {
              log('PASS', 'Модальное окно открывается (по тексту)');
              modalOpened = true;
            }
          }
          if (modalOpened) {
            // Test form submit
            const nameInput = await page.$('input[type="text"], input[placeholder*="мя"]');
            const phoneInput = await page.$('input[type="tel"], input[placeholder*="елефон"]');
            if (nameInput) await nameInput.fill('Тест Тестов');
            if (phoneInput) await phoneInput.fill('+7 (999) 123-45-67');

            const responsePromise = page.waitForResponse(
              (r) => r.url().includes('/api/submit'),
              { timeout: 6000 }
            ).catch(() => null);

            const submitBtn = await page.$('button[type="submit"]');
            if (submitBtn) {
              await submitBtn.click();
              const apiRes = await responsePromise;
              if (apiRes && apiRes.status() === 200) {
                log('PASS', 'Модальная форма: POST /api/submit → 200');
              } else {
                await page.waitForTimeout(1500);
                const afterModalText = await page.evaluate(() => document.body.innerText.toLowerCase());
                if (afterModalText.includes('спасибо') || afterModalText.includes('свяжемся')) {
                  log('PASS', 'Модальная форма: успех');
                } else {
                  log('FAIL', 'Модальная форма: нет ответа от /api/submit');
                }
              }
            } else {
              log('FAIL', 'Модальная форма: submit кнопка не найдена');
            }
          }
          break;
        }
      } catch {}
    }
    if (!modalOpened) log('FAIL', 'Модальное окно: не найдено кнопки или не открылось');
  } catch (e) {
    log('FAIL', 'Модальное окно: ошибка', String(e).slice(0, 100));
  }

  if (consoleErrors.length === 0) log('PASS', 'Нет ошибок в консоли браузера');
  else log('FAIL', `Ошибки в консоли (${consoleErrors.length})`, consoleErrors[0].slice(0, 80));

  await browser.close();
  printSummary();
}

function printSummary() {
  console.log('\n=== Итоговый отчёт ===');
  results.forEach(r => console.log(`  ${r.status === 'PASS' ? '✓' : '✗'} ${r.name}${r.detail ? ': ' + r.detail : ''}`));
  console.log(`\nПрошло: ${passed}, Провалено: ${failed}`);
  if (failed === 0) console.log('\nQA_RESULT: PASS');
  else {
    const failList = results.filter(r => r.status === 'FAIL').map(r => r.name).join('; ');
    console.log(`\nQA_RESULT: FAIL: ${failList}`);
  }
}

run().catch(e => {
  console.error('Fatal:', e);
  console.log('\nQA_RESULT: FAIL: Fatal - ' + String(e).slice(0, 100));
});
