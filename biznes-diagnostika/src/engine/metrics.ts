import type {
  Transaction,
  MonthlyStats,
  WeeklyPattern,
  TopPayer,
  CashGapRisk,
  QuestionnaireAnswers,
} from './types'

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  return Math.sqrt(values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length)
}

function p25(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const idx = Math.floor(sorted.length * 0.25)
  return sorted[idx]
}

export function computeMonthlyStats(transactions: Transaction[]): MonthlyStats[] {
  const map = new Map<string, MonthlyStats>()
  const MONTH_NAMES = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
  ]

  for (const tx of transactions) {
    if (tx.isTransfer || tx.isDuplicate) continue
    const key = `${tx.date.getFullYear()}-${String(tx.date.getMonth() + 1).padStart(2, '0')}`

    if (!map.has(key)) {
      map.set(key, {
        year: tx.date.getFullYear(),
        month: tx.date.getMonth() + 1,
        label: `${MONTH_NAMES[tx.date.getMonth()]} ${String(tx.date.getFullYear()).slice(2)}`,
        operatingInflow: 0,
        operatingOutflow: 0,
        netFlow: 0,
        isNegative: false,
      })
    }

    const stats = map.get(key)!
    if (
      (tx.class === 'operating_inflow' || tx.class === 'financing_inflow') &&
      tx.direction === 'inflow'
    ) {
      stats.operatingInflow += tx.amount
    } else if (tx.direction === 'outflow') {
      stats.operatingOutflow += tx.amount
    }
  }

  const result = Array.from(map.values()).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    return a.month - b.month
  })

  for (const stats of result) {
    stats.netFlow = stats.operatingInflow - stats.operatingOutflow
    stats.isNegative = stats.netFlow < 0
  }

  return result
}

export function computeWeeklyPattern(transactions: Transaction[]): WeeklyPattern[] {
  const WEEK_LABELS = ['1-я неделя', '2-я неделя', '3-я неделя', '4-я неделя']

  // Group by month + week_of_month
  const monthWeekMap = new Map<string, Map<number, number>>()

  for (const tx of transactions) {
    if (tx.isTransfer || tx.isDuplicate) continue
    const day = tx.date.getDate()
    const week: 1 | 2 | 3 | 4 = day <= 7 ? 1 : day <= 14 ? 2 : day <= 21 ? 3 : 4
    const monthKey = `${tx.date.getFullYear()}-${tx.date.getMonth()}`

    if (!monthWeekMap.has(monthKey)) {
      monthWeekMap.set(monthKey, new Map<number, number>())
    }
    const weekMap = monthWeekMap.get(monthKey)!
    const current = weekMap.get(week) ?? 0
    const delta = tx.direction === 'inflow' ? tx.amount : -tx.amount
    weekMap.set(week, current + delta)
  }

  const weekTotals: [number[], number[], number[], number[]] = [[], [], [], []]

  for (const weekMap of monthWeekMap.values()) {
    for (let w = 1; w <= 4; w++) {
      const val = weekMap.get(w) ?? 0
      weekTotals[w - 1].push(val)
    }
  }

  return [1, 2, 3, 4].map((w) => {
    const vals = weekTotals[w - 1]
    const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
    return {
      week: w as 1 | 2 | 3 | 4,
      avgNetFlow: avg,
      label: WEEK_LABELS[w - 1],
    }
  })
}

export function computeTopPayers(transactions: Transaction[]): TopPayer[] {
  const inflowMap = new Map<string, number>()
  let totalInflow = 0

  for (const tx of transactions) {
    if (tx.class !== 'operating_inflow' || tx.isTransfer || tx.isDuplicate) continue
    const key = tx.counterparty || 'Неизвестно'
    inflowMap.set(key, (inflowMap.get(key) ?? 0) + tx.amount)
    totalInflow += tx.amount
  }

  if (totalInflow === 0) return []

  const sorted = Array.from(inflowMap.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  return sorted.map(([counterparty, total]) => ({
    counterparty,
    totalInflow: total,
    share: total / totalInflow,
  }))
}

export function computeTargetReserveMonths(
  answers: QuestionnaireAnswers,
  badMonthRate: number,
  top1PayerShare: number,
): number {
  const baseMap: Record<QuestionnaireAnswers['businessType'], number> = {
    services: 2,
    trade: 2,
    manufacturing: 3,
    construction: 3,
    it: 2,
    transport: 2,
    other: 2,
  }

  let months = baseMap[answers.businessType]

  if (answers.volatility === 'moderate') months += 1
  if (answers.volatility === 'high') months += 2

  if (badMonthRate > 0.3) months += 1
  if (top1PayerShare > 0.4) months += 1

  if (answers.creditLoad === 'pressure') months += 1
  if (answers.creditLoad === 'heavy') months += 1

  if (answers.seasonality === 'moderate') months += 1
  if (answers.seasonality === 'strong') months += 1

  return clamp(months, 2, 6)
}

export function computeCashGapRisk(
  stressSurvivalMonths: number,
  badMonthRate: number,
): CashGapRisk {
  if (stressSurvivalMonths < 1 || badMonthRate > 0.4) return 'Высокий'
  if (stressSurvivalMonths < 2 || badMonthRate > 0.25) return 'Повышенный'
  if (stressSurvivalMonths < 4) return 'Средний'
  return 'Низкий'
}

export function computeCashResilienceScore(params: {
  stressSurvivalMonths: number
  targetReserveMonths: number
  inflowCV: number
  badMonthRate: number
  top1PayerShare: number
  cashGapRisk: CashGapRisk
}): number {
  const { stressSurvivalMonths, targetReserveMonths, inflowCV, badMonthRate, top1PayerShare, cashGapRisk } = params

  const bufferScore = Math.min(stressSurvivalMonths / Math.max(targetReserveMonths, 1), 1)
  const stabilityScore = Math.max(0, 1 - inflowCV)
  const badMonthScore = 1 - badMonthRate
  const concentrationScore = 1 - clamp((top1PayerShare - 0.2) / 0.5, 0, 1)
  const timingMap: Record<CashGapRisk, number> = {
    'Низкий': 1,
    'Средний': 0.7,
    'Повышенный': 0.4,
    'Высокий': 0.1,
  }
  const timingScore = timingMap[cashGapRisk]

  const raw =
    0.45 * bufferScore +
    0.2 * stabilityScore +
    0.2 * badMonthScore +
    0.1 * concentrationScore +
    0.05 * timingScore

  return Math.round(100 * raw)
}

export { p25, stdDev }
