import type {
  Transaction,
  RecurringExpense,
  MonthlyFlow,
  WeeklyPattern,
  TopPayer,
  DiagnosticResult,
  QuestionnaireAnswers,
  RiskLevel,
  Recommendation,
  ConfidenceDetails,
  ConfidenceLevel,
} from './types'

function percentile(arr: number[], p: number): number {
  if (arr.length === 0) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const idx = (p / 100) * (sorted.length - 1)
  const lo = Math.floor(idx)
  const hi = Math.ceil(idx)
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo)
}

function stddev(arr: number[]): number {
  if (arr.length < 2) return 0
  const mean = arr.reduce((s, v) => s + v, 0) / arr.length
  return Math.sqrt(arr.reduce((s, v) => s + (v - mean) ** 2, 0) / arr.length)
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

function formatMonthLabel(year: number, month: number): string {
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  return `${months[month - 1]} ${year}`
}

export function buildMonthlyFlows(transactions: Transaction[]): MonthlyFlow[] {
  const map = new Map<string, MonthlyFlow>()

  for (const tx of transactions) {
    if (tx.isTransfer) continue
    const y = tx.date.getFullYear()
    const m = tx.date.getMonth() + 1
    const key = `${y}-${String(m).padStart(2, '0')}`

    if (!map.has(key)) {
      map.set(key, {
        month: key,
        label: formatMonthLabel(y, m),
        inflow: 0,
        outflow: 0,
        net: 0,
        operatingInflow: 0,
        operatingOutflow: 0,
      })
    }

    const mf = map.get(key)!
    if (tx.amount > 0) {
      mf.inflow += tx.amount
      if (tx.classification === 'operating_inflow') mf.operatingInflow += tx.amount
    } else {
      mf.outflow += Math.abs(tx.amount)
      if (tx.classification === 'operating_outflow') mf.operatingOutflow += Math.abs(tx.amount)
    }
    mf.net = mf.inflow - mf.outflow
  }

  return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month))
}

export function buildWeeklyPatterns(transactions: Transaction[]): WeeklyPattern[] {
  // Group transactions by week-of-month (1-4)
  const weekGroups: Record<number, { inflow: number[]; outflow: number[] }> = {
    1: { inflow: [], outflow: [] },
    2: { inflow: [], outflow: [] },
    3: { inflow: [], outflow: [] },
    4: { inflow: [], outflow: [] },
  }

  // Build monthly totals by week
  const monthWeekMap = new Map<string, Record<number, { inflow: number; outflow: number }>>()

  for (const tx of transactions) {
    if (tx.isTransfer) continue
    const y = tx.date.getFullYear()
    const m = tx.date.getMonth() + 1
    const monthKey = `${y}-${m}`
    const day = tx.date.getDate()
    const week = Math.min(Math.ceil(day / 7), 4)

    if (!monthWeekMap.has(monthKey)) {
      monthWeekMap.set(monthKey, {
        1: { inflow: 0, outflow: 0 },
        2: { inflow: 0, outflow: 0 },
        3: { inflow: 0, outflow: 0 },
        4: { inflow: 0, outflow: 0 },
      })
    }

    const weekData = monthWeekMap.get(monthKey)![week]
    if (tx.amount > 0) weekData.inflow += tx.amount
    else weekData.outflow += Math.abs(tx.amount)
  }

  for (const weekData of monthWeekMap.values()) {
    for (const [wStr, data] of Object.entries(weekData)) {
      const w = parseInt(wStr) as 1 | 2 | 3 | 4
      weekGroups[w].inflow.push(data.inflow)
      weekGroups[w].outflow.push(data.outflow)
    }
  }

  const labels = ['1-я неделя', '2-я неделя', '3-я неделя', '4-я неделя']

  return [1, 2, 3, 4].map(w => {
    const inf = weekGroups[w].inflow
    const out = weekGroups[w].outflow
    const avgInflow = inf.length > 0 ? inf.reduce((s, v) => s + v, 0) / inf.length : 0
    const avgOutflow = out.length > 0 ? out.reduce((s, v) => s + v, 0) / out.length : 0
    return {
      week: w,
      label: labels[w - 1],
      avgInflow,
      avgOutflow,
      avgNet: avgInflow - avgOutflow,
    }
  })
}

export function buildTopPayers(transactions: Transaction[]): TopPayer[] {
  const inflows = transactions.filter(tx => tx.amount > 0 && !tx.isTransfer && tx.classification !== 'financing_inflow')
  const totalInflow = inflows.reduce((s, tx) => s + tx.amount, 0)
  if (totalInflow === 0) return []

  const map = new Map<string, number>()
  for (const tx of inflows) {
    const key = tx.counterparty || '(без имени)'
    map.set(key, (map.get(key) ?? 0) + tx.amount)
  }

  return Array.from(map.entries())
    .map(([counterparty, total]) => ({
      counterparty,
      total,
      share: total / totalInflow,
      count: inflows.filter(tx => tx.counterparty === counterparty).length,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
}

function baseReserveMonths(q: QuestionnaireAnswers): number {
  const bases: Record<string, number> = {
    services: 2,
    trade: 2,
    manufacturing: 3,
    construction: 4,
    it: 2,
    transport: 3,
    other: 3,
  }
  return bases[q.businessType] ?? 3
}

function computeTargetReserve(q: QuestionnaireAnswers, inflowCV: number, top1Share: number): number {
  let months = baseReserveMonths(q)

  if (q.seasonality === 'strong') months += 1
  else if (q.seasonality === 'moderate') months += 0.5

  if (q.debtLevel === 'heavy') months += 1
  else if (q.debtLevel === 'pressure') months += 0.5

  if (inflowCV > 0.5) months += 0.5
  if (top1Share > 0.5) months += 1

  return clamp(months, 2, 6)
}

function computeCashGapRisk(weeklyPatterns: WeeklyPattern[]): RiskLevel {
  const negativeWeeks = weeklyPatterns.filter(w => w.avgNet < 0).length
  if (negativeWeeks === 0) return 'low'
  if (negativeWeeks === 1) return 'medium'
  if (negativeWeeks === 2) return 'elevated'
  return 'high'
}

function computeConfidence(
  transactions: Transaction[],
  monthlyFlows: MonthlyFlow[],
  recurringCore: RecurringExpense[],
  q: QuestionnaireAnswers
): ConfidenceDetails {
  const unknownCount = transactions.filter(tx => tx.classification === 'unknown' && !tx.isTransfer).length
  const unknownRatio = transactions.length > 0 ? unknownCount / transactions.length : 1
  const periodMonths = monthlyFlows.length
  const recurringQuality = recurringCore.length > 0 ? Math.min(recurringCore.length / 5, 1) : 0

  let score = 1.0
  if (unknownRatio > 0.3) score -= 0.3
  else if (unknownRatio > 0.1) score -= 0.1

  if (periodMonths < 3) score -= 0.3
  else if (periodMonths < 6) score -= 0.15

  if (recurringQuality < 0.4) score -= 0.1

  if (q.accountsCoverage === 'partial') score -= 0.2
  else if (q.accountsCoverage === 'most') score -= 0.1

  score = clamp(score, 0, 1)

  let level: ConfidenceLevel = 'high'
  if (score < 0.4) level = 'low'
  else if (score < 0.7) level = 'medium'

  const reasons: string[] = []
  if (unknownRatio > 0.3) reasons.push('Много транзакций с неопределённой категорией')
  if (periodMonths < 3) reasons.push('Слишком короткий период — менее 3 месяцев')
  if (q.accountsCoverage === 'partial') reasons.push('Загружены данные только по части счетов')

  return { level, score, unknownRatio, periodMonths, recurringQuality, accountsCoverage: q.accountsCoverage, reasons }
}

function generateRecommendations(
  result: Omit<DiagnosticResult, 'recommendations'>,
  q: QuestionnaireAnswers
): Recommendation[] {
  const recs: Recommendation[] = []

  // Stress survival
  if (result.stressSurvival < result.targetReserveMonths) {
    recs.push({
      id: 'build_reserve',
      priority: result.stressSurvival < 1 ? 'critical' : 'high',
      title: 'Нарастите резервный фонд',
      body: `Цель — ${result.targetReserveMonths.toFixed(1)} мес. расходов (${formatRub(result.targetReserveAmount)}). Сейчас стресс-запас составляет ${result.stressSurvival < 100 ? `${result.stressSurvival.toFixed(1)} мес.` : '∞'}`,
      action: 'Откладывайте 10–15% выручки ежемесячно до достижения цели',
    })
  }

  // Cash gap
  if (result.cashGapRisk === 'high' || result.cashGapRisk === 'elevated') {
    const worstWeek = result.weeklyPatterns.reduce((a, b) => a.avgNet < b.avgNet ? a : b)
    recs.push({
      id: 'cash_gap',
      priority: result.cashGapRisk === 'high' ? 'high' : 'medium',
      title: 'Управляйте сроками платежей',
      body: `${worstWeek.label} — самая «тяжёлая» по кассе. Попробуйте перенести крупные выплаты равномернее по месяцу.`,
      action: 'Договоритесь с поставщиками о другой дате оплаты',
    })
  }

  // Concentration
  if (result.top1Share > 0.4) {
    recs.push({
      id: 'concentration',
      priority: result.top1Share > 0.6 ? 'high' : 'medium',
      title: 'Снизьте зависимость от одного источника',
      body: `Один клиент/источник даёт ${(result.top1Share * 100).toFixed(0)}% выручки. Это серьёзный риск.`,
      action: 'Добавьте 2–3 новых источника дохода до конца года',
    })
  }

  // Bad months
  if (result.badMonths / Math.max(result.totalMonths, 1) > 0.3) {
    recs.push({
      id: 'negative_months',
      priority: 'medium',
      title: 'Подготовьтесь к убыточным периодам',
      body: `${result.badMonths} из ${result.totalMonths} месяцев — с отрицательным балансом. Деньги «проедаются» регулярно.`,
      action: 'Составьте план действий на случай плохого месяца',
    })
  }

  // Debt
  if (q.debtLevel === 'heavy' || q.debtLevel === 'pressure') {
    recs.push({
      id: 'debt',
      priority: q.debtLevel === 'heavy' ? 'high' : 'medium',
      title: 'Пересмотрите долговую нагрузку',
      body: 'Долговые выплаты существенно давят на денежный поток. Рефинансирование или реструктуризация могут снизить нагрузку.',
      action: 'Обратитесь в банк за пересчётом условий',
    })
  }

  // Seasonality + low reserve
  if (q.seasonality !== 'none' && result.hardSurvival < result.targetReserveMonths + 1) {
    recs.push({
      id: 'seasonality',
      priority: 'medium',
      title: 'Готовьтесь к сезонному спаду заранее',
      body: 'При наличии сезонности особенно важно накопить резерв до «низкого» сезона.',
      action: 'Планируйте пополнение резерва в «высокий» сезон',
    })
  }

  return recs.slice(0, 5)
}

function formatRub(amount: number): string {
  return `${Math.round(amount).toLocaleString('ru-RU')} ₽`
}

export function computeMetrics(
  transactions: Transaction[],
  recurringCore: RecurringExpense[],
  q: QuestionnaireAnswers
): DiagnosticResult {
  const nonTransfer = transactions.filter(tx => !tx.isTransfer)
  const monthlyFlows = buildMonthlyFlows(nonTransfer)
  const weeklyPatterns = buildWeeklyPatterns(nonTransfer)
  const topPayers = buildTopPayers(nonTransfer)

  const operatingInflows = nonTransfer.filter(tx => tx.classification === 'operating_inflow')
  const operatingOutflows = nonTransfer.filter(tx => tx.classification === 'operating_outflow')

  // Monthly operating inflows
  const moiMap = new Map<string, number>()
  for (const tx of operatingInflows) {
    const key = `${tx.date.getFullYear()}-${tx.date.getMonth()}`
    moiMap.set(key, (moiMap.get(key) ?? 0) + tx.amount)
  }
  const monthlyOpInflows = Array.from(moiMap.values())

  // Monthly operating outflows
  const mooMap = new Map<string, number>()
  for (const tx of operatingOutflows) {
    const key = `${tx.date.getFullYear()}-${tx.date.getMonth()}`
    mooMap.set(key, (mooMap.get(key) ?? 0) + Math.abs(tx.amount))
  }
  const monthlyOpOutflows = Array.from(mooMap.values())

  const avgMonthlyInflow = monthlyFlows.length > 0
    ? monthlyFlows.reduce((s, m) => s + m.inflow, 0) / monthlyFlows.length
    : 0
  const avgMonthlyOutflow = monthlyFlows.length > 0
    ? monthlyFlows.reduce((s, m) => s + m.outflow, 0) / monthlyFlows.length
    : 0

  const inflowMean = monthlyOpInflows.length > 0
    ? monthlyOpInflows.reduce((s, v) => s + v, 0) / monthlyOpInflows.length
    : 0
  const inflowCV = inflowMean > 0 ? stddev(monthlyOpInflows) / inflowMean : 1

  // Essential monthly outflow
  const essentialRecurring = recurringCore.filter(r => r.isEssential)
  let essentialMonthlyOutflow = essentialRecurring.reduce((s, r) => s + r.monthlyAmount, 0)

  // Also include average tax outflows
  const taxOutflows = nonTransfer.filter(tx => tx.classification === 'tax')
  const taxMonthlyAvg = monthlyFlows.length > 0
    ? taxOutflows.reduce((s, tx) => s + Math.abs(tx.amount), 0) / monthlyFlows.length
    : 0
  essentialMonthlyOutflow += taxOutflows.length > 0 ? taxMonthlyAvg : 0

  // Fallback: if essential outflow too low, use median monthly outflow * 0.6
  const medianMonthlyOutflow = monthlyOpOutflows.length > 0
    ? monthlyOpOutflows.sort((a, b) => a - b)[Math.floor(monthlyOpOutflows.length / 2)]
    : avgMonthlyOutflow
  const fallbackEssential = medianMonthlyOutflow * 0.6
  if (essentialMonthlyOutflow < fallbackEssential * 0.3) {
    essentialMonthlyOutflow = fallbackEssential
  }

  const cashNow = q.cashBalance

  // Weak inflow = 25th percentile of monthly operating inflows
  const weakInflow = monthlyOpInflows.length > 0 ? percentile(monthlyOpInflows, 25) : 0
  const stressNetBurn = Math.max(essentialMonthlyOutflow - weakInflow, 0)

  const hardSurvival = essentialMonthlyOutflow > 0
    ? clamp(cashNow / essentialMonthlyOutflow, 0, 60)
    : 60

  const stressSurvival = stressNetBurn > 0
    ? clamp(cashNow / stressNetBurn, 0, 60)
    : 60

  const top1Share = topPayers.length > 0 ? topPayers[0].share : 0
  const top3Share = topPayers.slice(0, 3).reduce((s, p) => s + p.share, 0)

  const targetReserveMonths = computeTargetReserve(q, inflowCV, top1Share)
  const targetReserveAmount = targetReserveMonths * essentialMonthlyOutflow

  const badMonths = monthlyFlows.filter(m => m.net < 0).length
  const totalMonths = monthlyFlows.length

  const cashGapRisk = computeCashGapRisk(weeklyPatterns)

  // Resilience score components
  const bufferScore = clamp(stressSurvival / targetReserveMonths, 0, 1)
  const stabilityScore = clamp(1 - inflowCV, 0, 1)
  const badMonthScore = totalMonths > 0 ? 1 - badMonths / totalMonths : 0.5
  const concentrationScore = clamp(1 - top1Share, 0, 1)
  const timingScore = cashGapRisk === 'low' ? 1 : cashGapRisk === 'medium' ? 0.75 : cashGapRisk === 'elevated' ? 0.5 : 0.25

  const cashResilienceScore = Math.round(
    100 * (0.45 * bufferScore + 0.20 * stabilityScore + 0.20 * badMonthScore + 0.10 * concentrationScore + 0.05 * timingScore)
  )

  const periodDates = nonTransfer.map(tx => tx.date.getTime())
  const periodStart = new Date(Math.min(...periodDates))
  const periodEnd = new Date(Math.max(...periodDates))

  const confidence = computeConfidence(transactions, monthlyFlows, recurringCore, q)

  const totalEssentialMonthly = essentialMonthlyOutflow

  const partial: Omit<DiagnosticResult, 'recommendations'> = {
    hardSurvival,
    stressSurvival,
    cashResilienceScore,
    cashGapRisk,
    cashNow,
    essentialMonthlyOutflow,
    weakInflow,
    stressNetBurn,
    targetReserveMonths,
    targetReserveAmount,
    monthlyFlows,
    badMonths,
    totalMonths,
    recurringCore,
    totalEssentialMonthly,
    weeklyPatterns,
    top1Share,
    top3Share,
    topPayers,
    avgMonthlyInflow,
    avgMonthlyOutflow,
    inflowCV,
    totalTransactions: transactions.length,
    periodStart,
    periodEnd,
    confidence,
  }

  return { ...partial, recommendations: generateRecommendations(partial, q) }
}
