import type { BusinessFormData, DashboardData, ScoreCategory, Recommendation } from '../types'

interface UseBusinessScoreReturn {
  calculateScore: (data: BusinessFormData) => DashboardData
}

const scoreRevenue = (value: string): number => {
  const map: Record<string, number> = {
    'lt100k': 1,
    '100k-500k': 3,
    '500k-2m': 6,
    '2m-10m': 8,
    'gt10m': 10,
  }
  return map[value] ?? 0
}

const scoreGrowth = (value: string): number => {
  const map: Record<string, number> = {
    'negative': 0,
    '0-10': 4,
    '10-30': 7,
    '30-50': 9,
    'gt50': 10,
  }
  return map[value] ?? 0
}

const scoreMargin = (value: string): number => {
  const map: Record<string, number> = {
    'negative': 0,
    '0-5': 3,
    '5-15': 6,
    '15-25': 8,
    'gt25': 10,
  }
  return map[value] ?? 0
}

const scoreCashFlow = (value: string): number => {
  const map: Record<string, number> = {
    'critical': 0,
    'tight': 3,
    'stable': 7,
    'strong': 10,
  }
  return map[value] ?? 0
}

const scoreTeamSize = (value: string): number => {
  const map: Record<string, number> = {
    'solo': 3,
    '2-5': 6,
    '6-20': 8,
    '21-100': 9,
    'gt100': 10,
  }
  return map[value] ?? 0
}

const scoreEfficiency = (value: string): number => {
  const map: Record<string, number> = {
    'low': 2,
    'medium': 5,
    'high': 8,
    'excellent': 10,
  }
  return map[value] ?? 0
}

const scoreAutomation = (value: string): number => {
  const map: Record<string, number> = {
    'none': 1,
    'partial': 4,
    'mostly': 7,
    'full': 10,
  }
  return map[value] ?? 0
}

const scoreCAC = (value: string): number => {
  const map: Record<string, number> = {
    'unknown': 2,
    'high': 3,
    'medium': 6,
    'low': 9,
    'optimized': 10,
  }
  return map[value] ?? 0
}

const scoreLTV = (value: string): number => {
  const map: Record<string, number> = {
    'lt3x': 2,
    '3x-5x': 5,
    '5x-10x': 8,
    'gt10x': 10,
  }
  return map[value] ?? 0
}

const scoreConversion = (value: string): number => {
  const map: Record<string, number> = {
    'lt1': 2,
    '1-3': 5,
    '3-7': 8,
    'gt7': 10,
  }
  return map[value] ?? 0
}

const scoreNPS = (value: string): number => {
  const map: Record<string, number> = {
    'negative': 0,
    '0-20': 3,
    '20-50': 6,
    '50-70': 8,
    'gt70': 10,
  }
  return map[value] ?? 0
}

const scoreChurn = (value: string): number => {
  const map: Record<string, number> = {
    'gt10': 1,
    '5-10': 4,
    '2-5': 7,
    'lt2': 10,
  }
  return map[value] ?? 0
}

const scorePMF = (value: string): number => {
  const map: Record<string, number> = {
    'searching': 2,
    'early': 5,
    'found': 8,
    'strong': 10,
  }
  return map[value] ?? 0
}

const getLabel = (score: number, max: number): string => {
  const pct = (score / max) * 100
  if (pct >= 80) return 'Отлично'
  if (pct >= 60) return 'Хорошо'
  if (pct >= 40) return 'Удовлетворительно'
  if (pct >= 20) return 'Слабо'
  return 'Критично'
}

const getCategoryColor = (score: number, max: number): string => {
  const pct = (score / max) * 100
  if (pct >= 80) return '#00d9a3'
  if (pct >= 60) return '#6c63ff'
  if (pct >= 40) return '#ff9f43'
  if (pct >= 20) return '#ff6584'
  return '#cc2a4a'
}

const getGrade = (score: number): { grade: string; label: string } => {
  if (score >= 85) return { grade: 'A+', label: 'Превосходный бизнес' }
  if (score >= 75) return { grade: 'A', label: 'Сильный бизнес' }
  if (score >= 65) return { grade: 'B+', label: 'Хороший бизнес' }
  if (score >= 55) return { grade: 'B', label: 'Развивающийся бизнес' }
  if (score >= 45) return { grade: 'C+', label: 'Средний бизнес' }
  if (score >= 35) return { grade: 'C', label: 'Требует внимания' }
  if (score >= 20) return { grade: 'D', label: 'Серьёзные проблемы' }
  return { grade: 'F', label: 'Критическое состояние' }
}

export const useBusinessScore = (): UseBusinessScoreReturn => {
  const calculateScore = (data: BusinessFormData): DashboardData => {
    const financeItems = [
      { label: 'Ежемесячная выручка', value: data.monthlyRevenue, score: scoreRevenue(data.monthlyRevenue), maxScore: 10 },
      { label: 'Рост выручки', value: data.revenueGrowth, score: scoreGrowth(data.revenueGrowth), maxScore: 10 },
      { label: 'Чистая маржа', value: data.netMargin, score: scoreMargin(data.netMargin), maxScore: 10 },
      { label: 'Денежный поток', value: data.cashFlow, score: scoreCashFlow(data.cashFlow), maxScore: 10 },
    ]

    const opsItems = [
      { label: 'Размер команды', value: data.teamSize, score: scoreTeamSize(data.teamSize), maxScore: 10 },
      { label: 'Операционная эффективность', value: data.operationalEfficiency, score: scoreEfficiency(data.operationalEfficiency), maxScore: 10 },
      { label: 'Автоматизация процессов', value: data.processAutomation, score: scoreAutomation(data.processAutomation), maxScore: 10 },
    ]

    const marketingItems = [
      { label: 'Стоимость привлечения клиента', value: data.customerAcquisitionCost, score: scoreCAC(data.customerAcquisitionCost), maxScore: 10 },
      { label: 'Пожизненная ценность клиента', value: data.customerLifetimeValue, score: scoreLTV(data.customerLifetimeValue), maxScore: 10 },
      { label: 'Конверсия', value: data.conversionRate, score: scoreConversion(data.conversionRate), maxScore: 10 },
    ]

    const productItems = [
      { label: 'NPS (лояльность клиентов)', value: data.npsScore, score: scoreNPS(data.npsScore), maxScore: 10 },
      { label: 'Отток клиентов', value: data.churnRate, score: scoreChurn(data.churnRate), maxScore: 10 },
      { label: 'Product-Market Fit', value: data.productMarketFit, score: scorePMF(data.productMarketFit), maxScore: 10 },
    ]

    const financeScore = financeItems.reduce((s, i) => s + i.score, 0)
    const opsScore = opsItems.reduce((s, i) => s + i.score, 0)
    const marketingScore = marketingItems.reduce((s, i) => s + i.score, 0)
    const productScore = productItems.reduce((s, i) => s + i.score, 0)

    const categories: ScoreCategory[] = [
      {
        name: 'Финансы',
        score: financeScore,
        maxScore: 40,
        label: getLabel(financeScore, 40),
        color: getCategoryColor(financeScore, 40),
        items: financeItems,
      },
      {
        name: 'Операции',
        score: opsScore,
        maxScore: 30,
        label: getLabel(opsScore, 30),
        color: getCategoryColor(opsScore, 30),
        items: opsItems,
      },
      {
        name: 'Маркетинг и продажи',
        score: marketingScore,
        maxScore: 30,
        label: getLabel(marketingScore, 30),
        color: getCategoryColor(marketingScore, 30),
        items: marketingItems,
      },
      {
        name: 'Продукт и клиенты',
        score: productScore,
        maxScore: 30,
        label: getLabel(productScore, 30),
        color: getCategoryColor(productScore, 30),
        items: productItems,
      },
    ]

    const totalScore = financeScore + opsScore + marketingScore + productScore
    const totalMax = 130
    const overallScore = Math.round((totalScore / totalMax) * 100)
    const { grade, label: gradeLabel } = getGrade(overallScore)

    const recommendations: Recommendation[] = []

    if (scoreCashFlow(data.cashFlow) < 5) {
      recommendations.push({
        priority: 'high',
        category: 'Финансы',
        title: 'Улучшите управление денежным потоком',
        description: 'Внедрите еженедельный мониторинг ДДС, сократите дебиторскую задолженность и создайте резервный фонд на 3 месяца.',
      })
    }
    if (scoreMargin(data.netMargin) < 5) {
      recommendations.push({
        priority: 'high',
        category: 'Финансы',
        title: 'Повысьте рентабельность',
        description: 'Проведите анализ структуры затрат, выявите неэффективные статьи расходов и оптимизируйте ценообразование.',
      })
    }
    if (scoreAutomation(data.processAutomation) < 5) {
      recommendations.push({
        priority: 'medium',
        category: 'Операции',
        title: 'Автоматизируйте рутинные процессы',
        description: 'Инвестируйте в CRM, автоматизацию документооборота и бизнес-процессов. Это освободит время команды для роста.',
      })
    }
    if (scoreCAC(data.customerAcquisitionCost) < 5) {
      recommendations.push({
        priority: 'high',
        category: 'Маркетинг',
        title: 'Снизьте стоимость привлечения клиента',
        description: 'Пересмотрите маркетинговые каналы, внедрите реферальную программу и сосредоточьтесь на контент-маркетинге.',
      })
    }
    if (scoreLTV(data.customerLifetimeValue) < 5) {
      recommendations.push({
        priority: 'medium',
        category: 'Маркетинг',
        title: 'Увеличьте пожизненную ценность клиента',
        description: 'Разработайте программу лояльности, внедрите upsell/cross-sell стратегии и улучшите клиентский сервис.',
      })
    }
    if (scoreChurn(data.churnRate) < 5) {
      recommendations.push({
        priority: 'high',
        category: 'Продукт',
        title: 'Снизьте отток клиентов',
        description: 'Проведите интервью с ушедшими клиентами, внедрите систему раннего предупреждения и улучшите онбординг.',
      })
    }
    if (scoreNPS(data.npsScore) < 5) {
      recommendations.push({
        priority: 'medium',
        category: 'Продукт',
        title: 'Повысьте лояльность клиентов',
        description: 'Регулярно собирайте обратную связь, быстро реагируйте на жалобы и создавайте истории успеха клиентов.',
      })
    }
    if (scorePMF(data.productMarketFit) < 6) {
      recommendations.push({
        priority: 'high',
        category: 'Продукт',
        title: 'Укрепите Product-Market Fit',
        description: 'Проведите глубинные интервью с клиентами, сфокусируйтесь на ключевых болях рынка и итерируйте быстро.',
      })
    }

    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'low',
        category: 'Стратегия',
        title: 'Масштабируйте успешные практики',
        description: 'Ваш бизнес в отличной форме. Сосредоточьтесь на масштабировании и выходе на новые рынки.',
      })
    }

    return { overallScore, grade, gradeLabel, categories, recommendations, formData: data }
  }

  return { calculateScore }
}
