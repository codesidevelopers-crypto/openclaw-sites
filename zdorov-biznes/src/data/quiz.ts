import type { QuizCategory, Recommendation, ResultLevel } from '../types'

export const quizCategories: QuizCategory[] = [
  {
    id: 'finance',
    title: 'Финансы',
    icon: '💰',
    color: '#FFC93C',
    questions: [
      {
        id: 'fin_1',
        text: 'Как изменилась выручка вашего бизнеса за последний год?',
        options: [
          { label: 'Выросла более чем на 20%', score: 3 },
          { label: 'Выросла на 5–20%', score: 2 },
          { label: 'Осталась примерно прежней', score: 1 },
          { label: 'Снизилась', score: 0 },
        ],
      },
      {
        id: 'fin_2',
        text: 'На сколько месяцев вперёд хватит вашей финансовой подушки?',
        options: [
          { label: 'Более 6 месяцев', score: 3 },
          { label: 'От 3 до 6 месяцев', score: 2 },
          { label: 'От 1 до 3 месяцев', score: 1 },
          { label: 'Финансовой подушки нет', score: 0 },
        ],
      },
      {
        id: 'fin_3',
        text: 'Какова рентабельность вашего бизнеса?',
        options: [
          { label: 'Более 20% чистой прибыли', score: 3 },
          { label: 'От 10 до 20%', score: 2 },
          { label: 'Менее 10%', score: 1 },
          { label: 'Работаем в ноль или в убыток', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Маркетинг',
    icon: '📣',
    color: '#FF4D6D',
    questions: [
      {
        id: 'mkt_1',
        text: 'Как клиенты обычно узнают о вашем бизнесе?',
        options: [
          { label: 'Сильный бренд — приходят сами', score: 3 },
          { label: 'Несколько стабильных каналов', score: 2 },
          { label: 'В основном сарафанное радио', score: 1 },
          { label: 'Мало кто знает о нас', score: 0 },
        ],
      },
      {
        id: 'mkt_2',
        text: 'Какова конверсия из заявки/лида в реального клиента?',
        options: [
          { label: 'Более 30%', score: 3 },
          { label: 'От 15 до 30%', score: 2 },
          { label: 'От 5 до 15%', score: 1 },
          { label: 'Менее 5%', score: 0 },
        ],
      },
      {
        id: 'mkt_3',
        text: 'Есть ли у вас выстроенная маркетинговая стратегия с метриками?',
        options: [
          { label: 'Да, с чёткими KPI и аналитикой', score: 3 },
          { label: 'Есть план, но следуем не всегда', score: 2 },
          { label: 'Действуем ситуативно', score: 1 },
          { label: 'Стратегии нет', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'operations',
    title: 'Операции',
    icon: '⚙️',
    color: '#00D2C1',
    questions: [
      {
        id: 'ops_1',
        text: 'Насколько отлажены ключевые бизнес-процессы?',
        options: [
          { label: 'Все процессы задокументированы и автоматизированы', score: 3 },
          { label: 'Ключевые процессы описаны', score: 2 },
          { label: 'Зависим от конкретных людей', score: 1 },
          { label: 'Всё держится на одном человеке', score: 0 },
        ],
      },
      {
        id: 'ops_2',
        text: 'Как вы оцениваете мотивацию и вовлечённость команды?',
        options: [
          { label: 'Высокая — все инициативны и вовлечены', score: 3 },
          { label: 'В целом хорошая', score: 2 },
          { label: 'Есть проблемы с мотивацией', score: 1 },
          { label: 'Высокая текучка и безразличие', score: 0 },
        ],
      },
      {
        id: 'ops_3',
        text: 'Используете ли современные инструменты и автоматизацию?',
        options: [
          { label: 'Активно используем CRM, BI, автоматизацию', score: 3 },
          { label: 'Частично автоматизировано', score: 2 },
          { label: 'Много ручной работы', score: 1 },
          { label: 'Работаем по старинке', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'customers',
    title: 'Клиенты',
    icon: '👥',
    color: '#A78BFA',
    questions: [
      {
        id: 'cst_1',
        text: 'Как клиенты относятся к вашему продукту / услуге?',
        options: [
          { label: 'Активно рекомендуют другим', score: 3 },
          { label: 'В целом довольны', score: 2 },
          { label: 'Нейтральны', score: 1 },
          { label: 'Много жалоб и негатива', score: 0 },
        ],
      },
      {
        id: 'cst_2',
        text: 'Какова доля повторных покупок / продлений?',
        options: [
          { label: 'Более 50%', score: 3 },
          { label: 'От 30 до 50%', score: 2 },
          { label: 'От 10 до 30%', score: 1 },
          { label: 'Менее 10%', score: 0 },
        ],
      },
      {
        id: 'cst_3',
        text: 'Есть ли у вас чёткое конкурентное преимущество в глазах клиентов?',
        options: [
          { label: 'Да, явное и сложно копируемое', score: 3 },
          { label: 'Есть, но конкуренты могут повторить', score: 2 },
          { label: 'Слабое преимущество', score: 1 },
          { label: 'Не уверен, чем отличаемся', score: 0 },
        ],
      },
    ],
  },
  {
    id: 'strategy',
    title: 'Стратегия',
    icon: '🎯',
    color: '#2EC47E',
    questions: [
      {
        id: 'str_1',
        text: 'Есть ли у вас стратегия развития на 1–3 года?',
        options: [
          { label: 'Да, чёткая с KPI и дорожной картой', score: 3 },
          { label: 'Общее направление есть', score: 2 },
          { label: 'Думаем только о текущем квартале', score: 1 },
          { label: 'Стратегии нет', score: 0 },
        ],
      },
      {
        id: 'str_2',
        text: 'Как вы принимаете ключевые решения?',
        options: [
          { label: 'На основе данных и аналитики', score: 3 },
          { label: 'Используем базовые метрики', score: 2 },
          { label: 'Интуитивно, редко смотрим на цифры', score: 1 },
          { label: 'По ситуации, без системы', score: 0 },
        ],
      },
      {
        id: 'str_3',
        text: 'Насколько активно вы внедряете инновации?',
        options: [
          { label: 'Регулярно тестируем и внедряем новое', score: 3 },
          { label: 'Иногда экспериментируем', score: 2 },
          { label: 'Редко что-то меняем', score: 1 },
          { label: 'Всё по-старому, боимся менять', score: 0 },
        ],
      },
    ],
  },
]

export const MAX_SCORE_PER_CATEGORY = 9
export const MAX_TOTAL_SCORE = quizCategories.length * MAX_SCORE_PER_CATEGORY

export function getLevelFromPercentage(pct: number): ResultLevel {
  if (pct >= 81) return 'strong'
  if (pct >= 61) return 'developing'
  if (pct >= 34) return 'weak'
  return 'critical'
}

export const levelLabels: Record<ResultLevel, string> = {
  strong: 'Здоровый бизнес',
  developing: 'Развивающийся',
  weak: 'Требует внимания',
  critical: 'Критическая зона',
}

export const levelColors: Record<ResultLevel, string> = {
  strong: '#2EC47E',
  developing: '#00D2C1',
  weak: '#F9A825',
  critical: '#E53935',
}

export const recommendations: Recommendation[] = [
  // Finance
  {
    categoryId: 'finance',
    title: 'Постройте финансовую модель',
    text: 'Создайте P&L, Cash Flow и Balance sheet на 12 месяцев. Ежемесячно сравнивайте план и факт.',
    priority: 'high',
  },
  {
    categoryId: 'finance',
    title: 'Создайте резервный фонд',
    text: 'Откладывайте 10% выручки до достижения подушки на 3 месяца операционных расходов.',
    priority: 'high',
  },
  {
    categoryId: 'finance',
    title: 'Оптимизируйте структуру затрат',
    text: 'Проведите ABC-анализ расходов и устраните неэффективные статьи.',
    priority: 'medium',
  },
  // Marketing
  {
    categoryId: 'marketing',
    title: 'Диверсифицируйте каналы привлечения',
    text: 'Не зависьте от одного канала. Тестируйте контент-маркетинг, SEO, партнёрства.',
    priority: 'high',
  },
  {
    categoryId: 'marketing',
    title: 'Внедрите CRM и воронку продаж',
    text: 'Настройте CRM, опишите этапы воронки, замеряйте конверсию на каждом шаге.',
    priority: 'high',
  },
  {
    categoryId: 'marketing',
    title: 'Разработайте контент-стратегию',
    text: 'Создавайте экспертный контент, который решает проблемы вашей аудитории.',
    priority: 'medium',
  },
  // Operations
  {
    categoryId: 'operations',
    title: 'Задокументируйте ключевые процессы',
    text: 'Опишите топ-5 бизнес-процессов в регламентах. Это снизит зависимость от людей.',
    priority: 'high',
  },
  {
    categoryId: 'operations',
    title: 'Внедрите систему OKR',
    text: 'Поставьте квартальные цели и ключевые результаты для каждого члена команды.',
    priority: 'medium',
  },
  {
    categoryId: 'operations',
    title: 'Автоматизируйте рутинные задачи',
    text: 'Выявите операции, занимающие более 2 часов в неделю — автоматизируйте их.',
    priority: 'medium',
  },
  // Customers
  {
    categoryId: 'customers',
    title: 'Запустите программу лояльности',
    text: 'Внедрите NPS-опросы, реферальную программу и бонусы за повторные покупки.',
    priority: 'high',
  },
  {
    categoryId: 'customers',
    title: 'Создайте уникальное торговое предложение',
    text: 'Сформулируйте чёткое УТП: чем вы лучше конкурентов и почему клиент должен выбрать вас.',
    priority: 'high',
  },
  {
    categoryId: 'customers',
    title: 'Постройте систему обратной связи',
    text: 'Собирайте отзывы после каждой сделки и используйте их для улучшения продукта.',
    priority: 'medium',
  },
  // Strategy
  {
    categoryId: 'strategy',
    title: 'Разработайте стратегический план',
    text: 'Проведите стратегическую сессию, определите цели на 1, 3 и 5 лет с конкретными KPI.',
    priority: 'high',
  },
  {
    categoryId: 'strategy',
    title: 'Внедрите дашборд ключевых метрик',
    text: 'Настройте еженедельный отчёт с 5–7 ключевыми показателями здоровья бизнеса.',
    priority: 'high',
  },
  {
    categoryId: 'strategy',
    title: 'Выделите бюджет на эксперименты',
    text: 'Резервируйте 10–15% бюджета на тестирование новых гипотез и инноваций.',
    priority: 'medium',
  },
]
