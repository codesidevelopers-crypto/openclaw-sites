# Тестовый сайт

Демонстрационный стенд: Gatsby 5 + TypeScript + styled-components.

## Требования

- Node.js 18+
- npm 9+

## Команды

```bash
# Установить зависимости
npm install

# Запустить dev-сервер (http://localhost:8000)
npm run develop

# Проверить типы без сборки
npm run typecheck

# Собрать продакшн-сборку
npm run build

# Запустить собранный сайт локально
npm run serve

# Очистить кэш Gatsby
npm run clean
```

## Структура

```
src/
  components/
    Layout.tsx         — обёртка страницы
    Hero.tsx           — герой-секция с бейджем тестового режима
    Features.tsx       — 4 карточки того, что тестируется
    Timeline.tsx       — 4-шаговый процесс
    ContactForm.tsx    — форма → POST /api/submit
    Footer.tsx         — подвал с навигацией и tech-бейджами
  pages/
    index.tsx          — главная страница + <Head />
  styles/
    theme.ts           — typed const theme
    GlobalStyle.ts     — базовые CSS-сбросы
    styled.d.ts        — augment DefaultTheme
gatsby-config.ts
gatsby-browser.tsx     — ThemeProvider + GlobalStyle
gatsby-ssr.tsx         — зеркало browser-файла для SSR
```

## Форма

Отправляет `POST /api/submit` с телом:

```json
{
  "Имя": "Иван Иванов",
  "Телефон": "+7 999 123-45-67",
  "Комментарий": "Тестовый комментарий"
}
```

Без живого API эндпоинт вернёт 404 — форма покажет состояние ошибки.
Для проверки успешного пути нужен локальный прокси или мок-сервер.

## QA-чеклист

- [ ] `npm run develop` запускается без ошибок
- [ ] `npm run typecheck` проходит без ошибок TypeScript
- [ ] Все 5 секций отображаются корректно
- [ ] Форма валидирует пустые поля
- [ ] Форма показывает состояние загрузки при отправке
- [ ] Форма показывает состояние ошибки при недоступном API
- [ ] Адаптивный вид на мобильных (≤768px)
- [ ] `npm run build` завершается без ошибок
