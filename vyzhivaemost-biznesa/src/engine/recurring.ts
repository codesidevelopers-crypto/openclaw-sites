import type { Transaction, RecurringExpense, TransactionClass } from './types'

const LEGAL_SUFFIXES = [
  /\bооо\b/gi, /\боао\b/gi, /\бзао\b/gi, /\бпао\b/gi, /\бао\b/gi,
  /\бип\b/gi, /\бнко\b/gi, /\бфгуп\b/gi, /\бмуп\b/gi,
  '"', '«', '»', "'",
]

export function normalizeCounterpartyName(name: string): string {
  let n = name.toLowerCase().trim()
  for (const suffix of LEGAL_SUFFIXES) {
    n = n.replace(suffix, '')
  }
  n = n.replace(/[^\wа-яёa-z0-9]/gi, ' ').replace(/\s+/g, ' ').trim()
  return n.slice(0, 40) // limit length for grouping
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

function cv(arr: number[]): number {
  if (arr.length < 2) return 0
  const mean = arr.reduce((s, v) => s + v, 0) / arr.length
  if (mean === 0) return 0
  const variance = arr.reduce((s, v) => s + (v - mean) ** 2, 0) / arr.length
  return Math.sqrt(variance) / mean
}

function detectFrequency(intervals: number[]): { frequency: RecurringExpense['frequency']; avgInterval: number } {
  if (intervals.length === 0) return { frequency: 'irregular', avgInterval: 30 }
  const avg = intervals.reduce((s, v) => s + v, 0) / intervals.length
  if (avg <= 10) return { frequency: 'weekly', avgInterval: avg }
  if (avg <= 45) return { frequency: 'monthly', avgInterval: avg }
  if (avg <= 100) return { frequency: 'quarterly', avgInterval: avg }
  return { frequency: 'irregular', avgInterval: avg }
}

const ESSENTIAL_CLASSES: TransactionClass[] = ['tax', 'operating_outflow']

export function findRecurringExpenses(transactions: Transaction[]): RecurringExpense[] {
  // Only look at outflows (non-transfer)
  const outflows = transactions.filter(
    tx => tx.amount < 0 && !tx.isTransfer && tx.classification !== 'owner_draw'
  )

  // Group by normalized counterparty
  const groups = new Map<string, Transaction[]>()
  for (const tx of outflows) {
    const key = normalizeCounterpartyName(tx.counterparty) || normalizeCounterpartyName(tx.description)
    if (!key) continue
    const existing = groups.get(key)
    if (existing) existing.push(tx)
    else groups.set(key, [tx])
  }

  const recurring: RecurringExpense[] = []

  for (const [normalizedName, txGroup] of groups) {
    if (txGroup.length < 3) continue

    const amounts = txGroup.map(tx => Math.abs(tx.amount))
    const cvVal = cv(amounts)

    if (cvVal > 0.4) continue // Too variable

    // Calculate intervals between payments
    const sortedDates = txGroup.map(tx => tx.date.getTime()).sort((a, b) => a - b)
    const intervals: number[] = []
    for (let i = 1; i < sortedDates.length; i++) {
      intervals.push((sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24))
    }

    const { frequency, avgInterval } = detectFrequency(intervals)
    const medianAmt = median(amounts)

    // Compute monthly equivalent
    let monthlyAmount: number
    switch (frequency) {
      case 'weekly': monthlyAmount = medianAmt * 4.33; break
      case 'monthly': monthlyAmount = medianAmt; break
      case 'quarterly': monthlyAmount = medianAmt / 3; break
      default: monthlyAmount = medianAmt * (30 / Math.max(avgInterval, 30)); break
    }

    const mostCommonClass = txGroup[0].classification
    const isEssential = ESSENTIAL_CLASSES.includes(mostCommonClass) || frequency === 'monthly'

    const lastDate = new Date(Math.max(...txGroup.map(tx => tx.date.getTime())))

    recurring.push({
      counterparty: txGroup[0].counterparty,
      normalizedName,
      amounts,
      medianAmount: medianAmt,
      cv: cvVal,
      frequency,
      intervalDays: avgInterval,
      monthlyAmount,
      isEssential,
      classification: mostCommonClass,
      occurrences: txGroup.length,
      lastDate,
    })
  }

  // Sort by monthly amount desc
  return recurring.sort((a, b) => b.monthlyAmount - a.monthlyAmount)
}
