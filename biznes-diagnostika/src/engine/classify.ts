import type { RawTransaction, OperationClass, ClassificationConfidence } from './types'

interface ClassificationResult {
  class: OperationClass
  confidence: ClassificationConfidence
  recurringHint: boolean
}

const TAX_PATTERNS = [
  /фнс/i, /ифнс/i, /налог/i, /ндс/i, /ндфл/i, /страховые\s+взнос/i,
  /пфр/i, /фсс/i, /фомс/i, /усн/i, /енвд/i, /патент/i, /есн/i,
  /соц.*страх/i, /пенсионн/i,
]

const OWNER_DRAW_PATTERNS = [
  /дивиденд/i, /вывод\s+средств/i, /перевод\s+учредител/i,
  /на\s+личн/i, /личный\s+счет/i, /учредител/i,
]

const FINANCING_INFLOW_PATTERNS = [
  /кредит\s+(получен|поступ)/i, /транш/i, /займ\s+(получен|поступ)/i,
  /пополнение\s+уставн/i, /кредитн.*поступ/i, /выдача\s+кредит/i,
  /овердрафт/i,
]

const FINANCING_OUTFLOW_PATTERNS = [
  /погашение\s+кредит/i, /погашение\s+займ/i, /лизинг/i,
  /рассрочка/i, /выплата\s+кредит/i, /платеж\s+по\s+кредит/i,
  /возврат\s+займ/i, /долг/i,
]

const RENT_PATTERNS = [/аренд/i, /субаренд/i, /аренд.*плат/i]
const SALARY_PATTERNS = [/зарплат/i, /з\/п/i, /зп /i, /оклад/i, /заработн/i, /зарп /i]

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text))
}

export function classifyTransaction(tx: RawTransaction): ClassificationResult {
  const searchText = `${tx.description} ${tx.counterparty}`.toLowerCase()

  if (tx.direction === 'transfer') {
    return { class: 'transfer', confidence: 'high', recurringHint: false }
  }

  if (matchesAny(searchText, TAX_PATTERNS)) {
    return { class: 'tax', confidence: 'high', recurringHint: true }
  }

  if (matchesAny(searchText, OWNER_DRAW_PATTERNS)) {
    return { class: 'owner_draw', confidence: 'high', recurringHint: false }
  }

  if (tx.direction === 'inflow' && matchesAny(searchText, FINANCING_INFLOW_PATTERNS)) {
    return { class: 'financing_inflow', confidence: 'high', recurringHint: false }
  }

  if (tx.direction === 'outflow' && matchesAny(searchText, FINANCING_OUTFLOW_PATTERNS)) {
    return { class: 'financing_outflow', confidence: 'high', recurringHint: true }
  }

  const isRent = matchesAny(searchText, RENT_PATTERNS)
  const isSalary = matchesAny(searchText, SALARY_PATTERNS)

  if (tx.direction === 'inflow') {
    return { class: 'operating_inflow', confidence: 'medium', recurringHint: false }
  }

  if (tx.direction === 'outflow') {
    if (isRent || isSalary) {
      return { class: 'operating_outflow', confidence: 'high', recurringHint: true }
    }
    return { class: 'operating_outflow', confidence: 'medium', recurringHint: false }
  }

  return { class: 'unknown', confidence: 'low', recurringHint: false }
}

export function isEssentialClass(opClass: OperationClass): boolean {
  return opClass === 'tax' || opClass === 'financing_outflow'
}

export function isRentLike(tx: { description: string; counterparty: string }): boolean {
  return matchesAny(`${tx.description} ${tx.counterparty}`, RENT_PATTERNS)
}

export function isSalaryLike(tx: { description: string; counterparty: string }): boolean {
  return matchesAny(`${tx.description} ${tx.counterparty}`, SALARY_PATTERNS)
}
