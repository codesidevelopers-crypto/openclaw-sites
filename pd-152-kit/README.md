# pd-152-kit

Короткий B2B fake door лендинг для услуги по подготовке комплекта документов по 152-ФЗ.

## Что внутри
- Gatsby + TypeScript
- адаптивный лендинг
- двухшаговая форма
- success screen
- сбор UTM / referrer / landing_url
- события аналитики
- место под Яндекс.Метрику через env
- подготовка интеграции с Google Sheets через Apps Script / webhook

## Структура лендинга
1. Hero
2. Кому это актуально
3. Что клиент получает
4. Как работает процесс
5. Тарифы
6. Заявка
7. FAQ

## Локальный запуск
```bash
npm install
npm run develop
```

## Production build
```bash
npm run build
npm run serve
```

## ENV
См. `.env.example`

Используется:
- `GATSBY_YANDEX_METRIKA_ID` — id счётчика Метрики для client-side reachGoal
- `GOOGLE_SHEETS_WEBHOOK_URL` — URL вебхука Google Apps Script или другого приёмника лидов
- `GOOGLE_SHEETS_SHEET_ID` — id таблицы
- `GOOGLE_SHEETS_SHEET_NAME` — лист для лидов

## Аналитика
На странице заложены события:
- `page_view`
- `hero_cta_click`
- `pricing_view`
- `tariff_click`
- `form_start`
- `form_step_1_submit`
- `form_submit_step1`
- `form_step_2_submit`
- `form_success`
- `faq_open`
- `final_cta_click`

По умолчанию события:
- пишутся в `console.info`
- пушатся в `window.dataLayer`, если он существует
- отправляются в `ym(..., 'reachGoal', ...)`, если подключена Метрика и задан `GATSBY_YANDEX_METRIKA_ID`

## Как теперь работает заявка
Фронт отправляет JSON на `POST /api/submit`.

В payload входят:
- дата/время на стороне приёмника
- имя
- телефон
- email
- сайт компании
- ИНН
- выбранный тариф
- ответы анкеты:
  - есть ли формы на сайте
  - используются ли cookies / Метрика / CRM
  - есть ли сотрудники
  - подавалось ли уведомление в РКН
  - что нужно клиенту
- маркетинговые поля:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_content`
  - `utm_term`
  - `referrer`
  - `landing_url`
- технические поля, если добавлены на стороне приёмника:
  - `user_agent`
  - `source_page`

## Google Sheets: как подключить
Рекомендуемый путь — Google Apps Script webhook.

### 1. Создайте Google Sheet
Добавьте лист `Leads` и шапку столбцов:
- timestamp
- name
- phone
- email
- website
- inn
- selectedTariff
- tariffPrice
- hasForms
- usesTools
- hasEmployees
- filedNoticeBefore
- needType
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term
- referrer
- landing_url
- user_agent
- source_page

### 2. Создайте Apps Script
Откройте Extensions → Apps Script и вставьте код из файла:
`google-apps-script-example.js`

### 3. Настройте Script Properties
Добавьте:
- `SHEET_ID`
- `SHEET_NAME`

### 4. Deploy as Web App
- Execute as: Me
- Who has access: Anyone with the link

### 5. Подключите webhook на backend `/api/submit`
Важно: сейчас продовый `/api/submit` отвечает ошибкой `invalid_grant`, то есть текущая серверная интеграция сломана на стороне Google auth / webhook-конфига.

Нужно либо:
- заменить backend-прокси на рабочий webhook из Apps Script,
- либо починить текущую Google auth-интеграцию на сервере.

## Как проверить, что заявка работает
1. Откройте лендинг
2. Выберите тариф
3. Заполните Step 1 и Step 2
4. Отправьте заявку
5. Убедитесь, что:
   - появляется success screen
   - в логах backend нет 500
   - в Google Sheet появилась новая строка

## Текущий статус интеграции
На момент последней проверки:
- фронтенд-логика формы исправлена
- UX success screen настроен
- тариф передаётся в payload
- вторичная CTA логика исправлена
- продовый `POST /api/submit` возвращал `500 {"ok":false,"error":"invalid_grant"}`

Это значит, что для полного рабочего сбора лидов нужно починить именно серверную Google-интеграцию или заменить её на Apps Script webhook.

## Деплой
Production-схема:
1. `npm install`
2. `npm run build`
3. скопировать содержимое `public/` в продовую директорию сайта
4. убедиться, что nginx раздаёт статику и проксирует `POST /api/submit` на рабочий backend

Пример директории на сервере:
`/opt/sites/pd152kit/public`

## Что важно не ломать
- `gatsby-config.ts` — SEO и favicon
- `src/pages/index.tsx` — форма, аналитика, UTM
- маршрут `POST /api/submit`
