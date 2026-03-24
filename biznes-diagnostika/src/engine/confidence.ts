import type { Transaction, ConfidenceLevel, ConfidenceFactors, ClassificationConfidence } from './types'

export function computeConfidence(
  transactions: Transaction[],
  periodMonths: number,
  coverageLevel: 'all' | 'most' | 'partial',
  recurringCoreConfidence: ClassificationConfidence,
): { level: ConfidenceLevel; factors: ConfidenceFactors } {
  const nonTransfer = transactions.filter((tx) => !tx.isTransfer && !tx.isDuplicate)
  const unknownCount = nonTransfer.filter((tx) => tx.class === 'unknown').length
  const unknownPercent = nonTransfer.length > 0 ? unknownCount / nonTransfer.length : 1

  const coverageComplete = coverageLevel === 'all'

  const factors: ConfidenceFactors = {
    unknownOpsPercent: unknownPercent,
    periodMonths,
    coverageComplete,
    recurringCoreConfidence,
  }

  let level: ConfidenceLevel

  if (
    unknownPercent < 0.1 &&
    coverageComplete &&
    periodMonths >= 12 &&
    (recurringCoreConfidence === 'high' || recurringCoreConfidence === 'medium')
  ) {
    level = 'Высокая'
  } else if (unknownPercent > 0.25 || periodMonths < 6) {
    level = 'Ниже обычной'
  } else {
    level = 'Средняя'
  }

  return { level, factors }
}
