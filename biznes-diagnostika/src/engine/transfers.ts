import type { RawTransaction } from './types'

const TRANSFER_PATTERNS = [
  /перевод\s+между\s+счет/i,
  /внутренн/i,
  /собственн.*счет/i,
  /между\s+счет/i,
  /пополнение\s+счет/i,
]

function isTransferByDescription(tx: RawTransaction): boolean {
  const text = `${tx.description} ${tx.counterparty}`
  return TRANSFER_PATTERNS.some((p) => p.test(text))
}

function normalizeAmount(amount: number): number {
  return Math.round(amount * 100) / 100
}

function dateDiffDays(a: Date, b: Date): number {
  return Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24)
}

export interface RawTransactionWithId extends RawTransaction {
  _id: number
  isTransferDetected: boolean
}

export function detectTransfers(transactions: RawTransaction[]): Set<number> {
  const transferIndices = new Set<number>()

  // Mark obvious transfers by description first
  for (let i = 0; i < transactions.length; i++) {
    if (isTransferByDescription(transactions[i])) {
      transferIndices.add(i)
    }
  }

  // Match pairs: same amount, opposite direction, within 3 days
  const inflows = transactions
    .map((tx, i) => ({ tx, i }))
    .filter(({ tx }) => tx.direction === 'inflow')

  const outflows = transactions
    .map((tx, i) => ({ tx, i }))
    .filter(({ tx }) => tx.direction === 'outflow')

  const matched = new Set<number>()

  for (const { tx: inTx, i: inIdx } of inflows) {
    if (matched.has(inIdx)) continue
    for (const { tx: outTx, i: outIdx } of outflows) {
      if (matched.has(outIdx)) continue

      const amountMatch =
        Math.abs(normalizeAmount(inTx.amount) - normalizeAmount(outTx.amount)) /
          Math.max(normalizeAmount(inTx.amount), 1) < 0.01

      const dateMatch = dateDiffDays(inTx.date, outTx.date) <= 3

      if (!amountMatch || !dateMatch) continue

      // Additional checks: same counterparty pattern or both description-matched
      const inDesc = isTransferByDescription(inTx)
      const outDesc = isTransferByDescription(outTx)

      // Must have at least one side matching OR counterparty similarity
      const counterpartyMatch =
        inTx.counterparty.length > 3 &&
        outTx.counterparty.length > 3 &&
        (inTx.counterparty.toLowerCase().includes(outTx.counterparty.toLowerCase().slice(0, 5)) ||
          outTx.counterparty.toLowerCase().includes(inTx.counterparty.toLowerCase().slice(0, 5)))

      if (inDesc || outDesc || counterpartyMatch) {
        transferIndices.add(inIdx)
        transferIndices.add(outIdx)
        matched.add(inIdx)
        matched.add(outIdx)
        break
      }
    }
  }

  return transferIndices
}
