import type { Transaction } from './types'

const TRANSFER_KEYWORDS = [
  'перевод между счетами',
  'перевод на собственный счёт',
  'перевод на собственный счет',
  'внутренний перевод',
  'пополнение счёта',
  'пополнение счета',
  'собственные средства',
  'между счетами',
  'зачисление наличных',
  'снятие наличных для перевода',
]

function msToDay(ms: number): number {
  return ms / (1000 * 60 * 60 * 24)
}

function descriptionLooksLikeTransfer(desc: string): boolean {
  const lower = desc.toLowerCase()
  return TRANSFER_KEYWORDS.some(kw => lower.includes(kw))
}

export function detectTransfers(transactions: Transaction[]): Transaction[] {
  const result = transactions.map(tx => ({ ...tx }))

  // First: mark obvious transfer by description
  for (const tx of result) {
    if (descriptionLooksLikeTransfer(tx.description)) {
      tx.isTransfer = true
      tx.classification = 'transfer'
    }
  }

  // Second: match pairs — same absolute amount (±1%), opposite direction, ±3 days
  const outflows = result.filter(tx => tx.amount < 0 && !tx.isTransfer)
  const inflows = result.filter(tx => tx.amount > 0 && !tx.isTransfer)

  const usedIds = new Set<string>()

  for (const out of outflows) {
    const absOut = Math.abs(out.amount)
    const outDay = out.date.getTime()

    for (const inf of inflows) {
      if (usedIds.has(inf.id)) continue

      const absInf = inf.amount
      const infDay = inf.date.getTime()

      // Amount match within 1%
      const amountMatch = Math.abs(absOut - absInf) / absOut < 0.01
      // Date within ±3 days
      const dayDiff = Math.abs(msToDay(outDay - infDay))
      const dateMatch = dayDiff <= 3

      if (amountMatch && dateMatch) {
        out.isTransfer = true
        out.classification = 'transfer'
        inf.isTransfer = true
        inf.classification = 'transfer'
        usedIds.add(inf.id)
        usedIds.add(out.id)
        break
      }
    }
  }

  return result
}
