# pd-152-kit

Короткий B2B fake door лендинг для услуги по подготовке комплекта документов по 152-ФЗ.

## Что внутри
- Gatsby + TypeScript
- адаптивный лендинг
- двухшаговая форма
- отправка заявок на `POST /api/submit`
- success screen
- сбор UTM / referrer / page_url
- события аналитики
- место под Яндекс.Метрику через env

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

## Аналитика
На странице заложены события:
- `page_view`
- `hero_cta_click`
- `pricing_view`
- `tariff_click`
- `form_start`
- `form_step_1_submit`
- `form_step_2_submit`
- `form_success`
- `faq_open`
- `final_cta_click`

По умолчанию события:
- пишутся в `console.info`
- пушатся в `window.dataLayer`, если он существует
- отправляются в `ym(..., 'reachGoal', ...)`, если подключена Метрика и задан `GATSBY_YANDEX_METRIKA_ID`

## Заявки
Форма отправляет JSON на:
`POST /api/submit`

В payload включены:
- имя
- телефон
- email
- сайт
- ИНН
- выбранный тариф
- ответы шага 2
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `referrer`
- `page_url`

## Куда падают заявки
В текущей реализации лендинг отправляет данные в внешний обработчик по маршруту `/api/submit`.

Важно:
- сам Gatsby-сайт только формирует и отправляет payload;
- фактическое хранение зависит от server-side обработчика, который проксирует `/api/submit`;
- на текущем сервере этот маршрут должен быть подключён через nginx к backend-обработчику.

## Как выгружать заявки
Это зависит от backend-слоя, куда проксируется `/api/submit`.

Если используется таблица / CRM / кастомный обработчик, выгрузка делается уже на его стороне.

## Деплой
Production-схема для этого проекта:
1. `npm install`
2. `npm run build`
3. скопировать содержимое `public/` в продовую директорию сайта
4. убедиться, что nginx раздаёт статику и проксирует `POST /api/submit`

Пример директории на сервере:
`/opt/sites/pd152kit/public`

## Что важно не ломать
- `gatsby-config.ts` — SEO и favicon
- `src/pages/index.tsx` — форма, аналитика, UTM
- маршрут `POST /api/submit`
