import type { Transaction, TransactionClass } from './types'

interface ClassRule {
  class: TransactionClass
  keywords: string[]
  minConfidence: number
}

const RULES: ClassRule[] = [
  {
    class: 'tax',
    minConfidence: 0.9,
    keywords: [
      'ифнс', 'фнс', 'налог', 'ндс', 'ндфл', 'взнос', 'пфр', 'фсс',
      'усн', 'есн', 'страховые взносы', 'пенсионный фонд', 'фонд социального',
      'единый налог', 'упрощенная система', 'налог на прибыль',
      'земельный налог', 'транспортный налог', 'имущественный налог',
      'оплата налога', 'уплата налога', 'перечисление налога',
    ],
  },
  {
    class: 'owner_draw',
    minConfidence: 0.85,
    keywords: [
      'дивиденды', 'вывод', 'на личный счет', 'на личный счёт',
      'выдача учредителю', 'учредитель', 'собственнику',
      'возврат займа учредителю', 'личные нужды',
    ],
  },
  {
    class: 'financing_inflow',
    minConfidence: 0.85,
    keywords: [
      'кредит', 'займ', 'транш', 'овердрафт', 'кредитные средства',
      'выдача кредита', 'предоставление займа', 'кредитная линия',
      'лизинг поступление',
    ],
  },
  {
    class: 'financing_outflow',
    minConfidence: 0.85,
    keywords: [
      'погашение кредита', 'погашение займа', 'возврат кредита',
      'возврат займа', 'лизинг', 'лизинговый платеж',
      'проценты по кредиту', 'проценты по займу', 'обслуживание долга',
    ],
  },
]

function matchRules(text: string): { class: TransactionClass; confidence: number } {
  const lower = text.toLowerCase()

  for (const rule of RULES) {
    const match = rule.keywords.some(kw => lower.includes(kw))
    if (match) {
      return { class: rule.class, confidence: rule.minConfidence }
    }
  }

  return { class: 'unknown', confidence: 0 }
}

export function classifyTransaction(tx: Transaction): Transaction {
  if (tx.isTransfer) {
    return { ...tx, classification: 'transfer', confidence: 1 }
  }

  const searchText = `${tx.description} ${tx.counterparty}`.toLowerCase()
  const { class: ruleClass, confidence } = matchRules(searchText)

  if (ruleClass !== 'unknown') {
    return { ...tx, classification: ruleClass, confidence }
  }

  // Default: operating based on direction
  const classification: TransactionClass = tx.amount > 0 ? 'operating_inflow' : 'operating_outflow'
  return { ...tx, classification, confidence: 0.6 }
}

export function classifyAll(transactions: Transaction[]): Transaction[] {
  return transactions.map(classifyTransaction)
}
