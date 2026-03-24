import { generateId } from './uid'
import type {
  RawTransaction,
  Transaction,
  EngineResult,
  QuestionnaireAnswers,
  ClassificationConfidence,
} from './types'
import { classifyTransaction } from './classify'
import { detectTransfers } from './transfers'
import { detectRecurring, computeEssentialMonthlyOutflow } from './recurring'
import {
  computeMonthlyStats,
  computeWeeklyPattern,
  computeTopPayers,
  computeTargetReserveMonths,
  computeCashGapRisk,
  computeCashResilienceScore,
  p25,
  stdDev,
} from './metrics'
import { computeConfidence } from './confidence'

function detectDuplicates(txs: RawTransaction[]): Set<number> {
  const dupes = new Set<number>()
  const seen = new Map<string, number>()

  for (let i = 0; i < txs.length; i++) {
    const tx = txs[i]
    const key = `${tx.date.getTime()}-${tx.amount}-${tx.counterparty.toLowerCase().slice(0, 20)}`
    if (seen.has(key)) {
      dupes.add(i)
    } else {
      seen.set(key, i)
    }
  }
  return dupes
}

export function runEngine(rawTxs: RawTransaction[], answers: QuestionnaireAnswers): EngineResult {
  // Step 1: Detect transfers
  const transferIndices = detectTransfers(rawTxs)

  // Step 2: Detect duplicates
  const dupeIndices = detectDuplicates(rawTxs)

  // Step 3: Classify and build Transaction objects
  const classified: Transaction[] = rawTxs.map((raw, i) => {
    const isTransfer = transferIndices.has(i)
    const rawForClassify: RawTransaction = isTransfer
      ? { ...raw, direction: 'transfer' }
      : raw

    const classification = classifyTransaction(rawForClassify)
    return {
      ...raw,
      id: generateId(),
      direction: isTransfer ? 'transfer' : raw.direction,
      class: classification.class,
      classConfidence: classification.confidence,
      recurringHint: classification.recurringHint,
      isDuplicate: dupeIndices.has(i),
      isTransfer,
    }
  })

  // Step 4: Period
  const validTxs = classified.filter((tx) => !tx.isDuplicate && !tx.isTransfer)
  const dates = validTxs.map((tx) => tx.date.getTime())
  const periodStart = dates.length > 0 ? new Date(Math.min(...dates)) : new Date()
  const periodEnd = dates.length > 0 ? new Date(Math.max(...dates)) : new Date()
  const periodMonths = Math.max(
    1,
    (periodEnd.getFullYear() - periodStart.getFullYear()) * 12 +
      (periodEnd.getMonth() - periodStart.getMonth()) + 1,
  )

  // Step 5: Monthly stats
  const monthlyStats = computeMonthlyStats(classified)

  // Step 6: Detect recurring
  const recurringExpenses = detectRecurring(classified)

  // Step 7: Essential outflow
  const { essentialOutflow: essentialRecurringOutflow, usedFallback } =
    computeEssentialMonthlyOutflow(recurringExpenses, classified, periodMonths)

  // Step 8: Monthly inflow stats
  const monthlyInflows = monthlyStats.map((m) => m.operatingInflow).filter((v) => v > 0)
  const avgMonthlyOperatingInflow =
    monthlyInflows.length > 0
      ? monthlyInflows.reduce((a, b) => a + b, 0) / monthlyInflows.length
      : 0
  const p25Inflow = p25(monthlyInflows)
  const inflowCV =
    avgMonthlyOperatingInflow > 0 ? stdDev(monthlyInflows) / avgMonthlyOperatingInflow : 1

  // Step 9: Survival months
  const cashNow = answers.cashNow
  const hardSurvivalMonths =
    essentialRecurringOutflow > 0 ? cashNow / essentialRecurringOutflow : 99

  const weakInflow = p25Inflow
  const stressNetBurn = Math.max(essentialRecurringOutflow - weakInflow, 0)
  const stressSurvivalMonths =
    stressNetBurn > 0 ? cashNow / stressNetBurn : 99

  // Step 10: Bad months
  const badMonthCount = monthlyStats.filter((m) => m.isNegative).length
  const totalMonthCount = monthlyStats.length
  const badMonthRate = totalMonthCount > 0 ? badMonthCount / totalMonthCount : 0

  // Step 11: Top payers
  const topPayers = computeTopPayers(classified)
  const top1PayerShare = topPayers[0]?.share ?? 0
  const top3Share = topPayers.slice(0, 3).reduce((s, p) => s + p.share, 0)

  // Step 12: Reserve
  const targetReserveMonths = computeTargetReserveMonths(answers, badMonthRate, top1PayerShare)
  const targetReserveAmount = targetReserveMonths * essentialRecurringOutflow

  // Step 13: Risk + score
  const cashGapRisk = computeCashGapRisk(stressSurvivalMonths, badMonthRate)
  const cashResilienceScore = computeCashResilienceScore({
    stressSurvivalMonths,
    targetReserveMonths,
    inflowCV,
    badMonthRate,
    top1PayerShare,
    cashGapRisk,
  })

  // Step 14: Weekly pattern
  const weeklyPattern = computeWeeklyPattern(classified)

  // Step 15: Confidence
  const recurringCoreConf: ClassificationConfidence =
    recurringExpenses.filter((r) => r.isEssential && r.confidence === 'high').length >= 2
      ? 'high'
      : recurringExpenses.filter((r) => r.isEssential).length >= 1
        ? 'medium'
        : 'low'

  const { level: confidenceLevel, factors: confidenceFactors } = computeConfidence(
    classified,
    periodMonths,
    answers.coverageLevel,
    recurringCoreConf,
  )

  return {
    transactions: classified,
    totalCount: classified.filter((tx) => !tx.isDuplicate).length,
    duplicateCount: dupeIndices.size,
    periodStart,
    periodEnd,
    periodMonths,

    essentialRecurringOutflow,
    avgMonthlyOperatingInflow,
    p25MonthlyOperatingInflow: p25Inflow,
    inflowCV,

    hardSurvivalMonths,
    weakInflow,
    stressNetBurn,
    stressSurvivalMonths,

    badMonthRate,
    badMonthCount,
    totalMonthCount,

    top1PayerShare,
    top3PayerShare: top3Share,
    topPayers,

    targetReserveMonths,
    targetReserveAmount,

    cashGapRisk,
    cashResilienceScore,

    recurringExpenses,
    monthlyStats,
    weeklyPattern,

    confidenceLevel,
    confidenceFactors,

    usedFallback,
  }
}
