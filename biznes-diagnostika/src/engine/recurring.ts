import type { Transaction, RecurringExpense, ClassificationConfidence } from './types'
import { isEssentialClass, isRentLike, isSalaryLike } from './classify'

function normalizeCounterpartyKey(counterparty: string, description: string): string {
  const text = counterparty.trim()
  if (text.length > 3) return text.toLowerCase().replace(/\s+/g, ' ')
  // Fall back to first meaningful words of description
  return description.toLowerCase().replace(/\s+/g, ' ').slice(0, 30)
}

function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

function coefficientOfVariation(values: number[]): number {
  if (values.length < 2) return 0
  const avg = values.reduce((a, b) => a + b, 0) / values.length
  if (avg === 0) return 0
  const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length
  return Math.sqrt(variance) / avg
}

function avgInterval(dates: Date[]): number {
  if (dates.length < 2) return 0
  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime())
  const intervals: number[] = []
  for (let i = 1; i < sorted.length; i++) {
    intervals.push((sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24))
  }
  return intervals.reduce((a, b) => a + b, 0) / intervals.length
}

function isMonthlyPattern(avgDays: number): boolean {
  return avgDays >= 20 && avgDays <= 40
}

function getConfidence(cv: number, count: number, avgDays: number): ClassificationConfidence {
  if (cv < 0.15 && count >= 3 && isMonthlyPattern(avgDays)) return 'high'
  if (cv < 0.3 && count >= 3) return 'medium'
  return 'low'
}

function getCategoryLabel(tx: Transaction): string {
  if (tx.class === 'tax') return 'Налоги'
  if (tx.class === 'financing_outflow') return 'Кредиты/лизинг'
  if (isRentLike(tx)) return 'Аренда'
  if (isSalaryLike(tx)) return 'Зарплата'
  return 'Прочие постоянные'
}

export function detectRecurring(transactions: Transaction[]): RecurringExpense[] {
  const outflows = transactions.filter(
    (tx) => tx.direction === 'outflow' && !tx.isTransfer && !tx.isDuplicate,
  )

  // Group by normalized counterparty
  const groups = new Map<string, Transaction[]>()
  for (const tx of outflows) {
    const key = normalizeCounterpartyKey(tx.counterparty, tx.description)
    const group = groups.get(key) ?? []
    group.push(tx)
    groups.set(key, group)
  }

  const results: RecurringExpense[] = []

  for (const [key, txs] of groups) {
    if (txs.length < 2) continue

    const amounts = txs.map((tx) => tx.amount)
    const cv = coefficientOfVariation(amounts)
    const dates = txs.map((tx) => tx.date)
    const avgDays = avgInterval(dates)
    const confidence = getConfidence(cv, txs.length, avgDays)

    // Include if: 3+ occurrences with CV < 0.3, or 2+ with essential class
    const firstTx = txs[0]
    const isEssential =
      isEssentialClass(firstTx.class) ||
      isRentLike(firstTx) ||
      isSalaryLike(firstTx) ||
      (confidence === 'high' && isMonthlyPattern(avgDays))

    if (txs.length >= 3 && cv < 0.3) {
      results.push({
        normalizedCounterparty: key,
        originalCounterparty: txs[txs.length - 1].counterparty || key,
        medianAmount: median(amounts),
        avgIntervalDays: avgDays,
        occurrences: txs.length,
        confidence,
        isEssential,
        category: getCategoryLabel(firstTx),
      })
    } else if (txs.length >= 2 && isEssential) {
      results.push({
        normalizedCounterparty: key,
        originalCounterparty: txs[txs.length - 1].counterparty || key,
        medianAmount: median(amounts),
        avgIntervalDays: avgDays,
        occurrences: txs.length,
        confidence: 'low',
        isEssential: true,
        category: getCategoryLabel(firstTx),
      })
    }
  }

  return results.sort((a, b) => b.medianAmount - a.medianAmount)
}

export function computeEssentialMonthlyOutflow(
  recurring: RecurringExpense[],
  transactions: Transaction[],
  periodMonths: number,
): { essentialOutflow: number; usedFallback: boolean } {
  const essentialItems = recurring.filter((r) => r.isEssential)

  if (essentialItems.length > 0) {
    // Convert to monthly: if interval is ~30 days => 1/month, ~7 days => ~4/month
    const monthlyTotal = essentialItems.reduce((sum, item) => {
      const perMonth = item.avgIntervalDays > 0 ? 30 / item.avgIntervalDays : 1
      return sum + item.medianAmount * Math.min(perMonth, 5)
    }, 0)
    return { essentialOutflow: monthlyTotal, usedFallback: false }
  }

  // Fallback: median monthly outflow * 0.6
  const outflows = transactions.filter(
    (tx) => tx.direction === 'outflow' && !tx.isTransfer && !tx.isDuplicate,
  )
  const totalOutflow = outflows.reduce((s, tx) => s + tx.amount, 0)
  const avgMonthly = periodMonths > 0 ? totalOutflow / periodMonths : totalOutflow
  return { essentialOutflow: avgMonthly * 0.6, usedFallback: true }
}
