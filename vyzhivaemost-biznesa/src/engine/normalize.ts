import type { Transaction, ParsedFile, ColumnMapping } from './types'

let txCounter = 0
function genId(): string {
  return `tx_${Date.now()}_${txCounter++}`
}

function parseRussianDate(raw: string): Date | null {
  if (!raw) return null
  const s = String(raw).trim()

  // DD.MM.YYYY or DD/MM/YYYY
  const dmy = s.match(/^(\d{1,2})[./\-](\d{1,2})[./\-](\d{2,4})$/)
  if (dmy) {
    const [, d, m, y] = dmy
    const year = y.length === 2 ? 2000 + parseInt(y) : parseInt(y)
    return new Date(year, parseInt(m) - 1, parseInt(d))
  }

  // YYYY-MM-DD
  const ymd = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (ymd) {
    return new Date(parseInt(ymd[1]), parseInt(ymd[2]) - 1, parseInt(ymd[3]))
  }

  // Excel serial number (number)
  const num = parseFloat(s)
  if (!isNaN(num) && num > 40000 && num < 50000) {
    // Excel date serial
    const excelEpoch = new Date(1900, 0, 1)
    excelEpoch.setDate(excelEpoch.getDate() + num - 2)
    return excelEpoch
  }

  const parsed = new Date(s)
  return isNaN(parsed.getTime()) ? null : parsed
}

function parseAmount(raw: unknown): number {
  if (raw === null || raw === undefined) return 0
  const s = String(raw).trim().replace(/\s/g, '').replace(',', '.')
  return parseFloat(s) || 0
}

function normalizeHeader(h: string): string {
  return String(h).toLowerCase().trim().replace(/[^\wа-яё]/gi, '')
}

export function detectColumnMapping(headers: string[]): ColumnMapping | null {
  const norm = headers.map(normalizeHeader)

  const find = (patterns: string[]): string | undefined => {
    const idx = norm.findIndex(h => patterns.some(p => h.includes(p)))
    return idx >= 0 ? headers[idx] : undefined
  }

  const date = find(['дата', 'date', 'датапроводки', 'датаоперации', 'датадок'])
  const amount = find(['сумма', 'amount', 'суммаоперации'])
  const debit = find(['дебет', 'расход', 'списание', 'дебетовыйоборот'])
  const credit = find(['кредит', 'приход', 'поступление', 'кредитовыйоборот', 'зачисление'])
  const counterparty = find(['контрагент', 'получатель', 'плательщик', 'наименование', 'counterparty', 'partner'])
  const inn = find(['инн', 'inn', 'иннплательщика', 'иннполучателя'])
  const description = find(['назначение', 'описание', 'назначениеплатежа', 'description', 'purpose'])

  if (!date) return null
  if (!amount && !debit && !credit) return null

  return { date, amount, debit, credit, counterparty, inn, description }
}

export function normalizeRows(
  rows: Record<string, unknown>[],
  mapping: ColumnMapping,
  sourceFile: string
): Transaction[] {
  const txs: Transaction[] = []

  for (const row of rows) {
    if (!mapping.date) continue
    const rawDate = row[mapping.date]
    const date = parseRussianDate(String(rawDate ?? ''))
    if (!date || isNaN(date.getTime())) continue

    let amount = 0
    if (mapping.amount) {
      amount = parseAmount(row[mapping.amount])
    } else if (mapping.debit !== undefined && mapping.credit !== undefined) {
      const debit = parseAmount(row[mapping.debit])
      const credit = parseAmount(row[mapping.credit])
      // debit = outflow, credit = inflow
      if (credit > 0) amount = credit
      else if (debit > 0) amount = -debit
    } else if (mapping.debit !== undefined) {
      amount = -parseAmount(row[mapping.debit])
    } else if (mapping.credit !== undefined) {
      amount = parseAmount(row[mapping.credit])
    }

    if (amount === 0) continue

    const counterparty = mapping.counterparty ? String(row[mapping.counterparty] ?? '').trim() : ''
    const counterpartyInn = mapping.inn ? String(row[mapping.inn] ?? '').trim() : undefined
    const description = mapping.description ? String(row[mapping.description] ?? '').trim() : ''

    txs.push({
      id: genId(),
      date,
      amount,
      counterparty,
      counterpartyInn: counterpartyInn || undefined,
      description,
      sourceFile,
      classification: 'unknown',
      isTransfer: false,
      confidence: 0,
    })
  }

  return txs
}

export interface OneCTransaction {
  date: Date
  amount: number
  payerAccount: string
  payeeAccount: string
  payer: string
  payerInn: string
  payee: string
  payeeInn: string
  description: string
}

export function parse1C(content: string, fileName: string): { transactions: Transaction[]; accountNumbers: string[] } {
  const lines = content.split('\n').map(l => l.trim())
  const accountNumbers: string[] = []

  // Extract our account numbers from header
  for (const line of lines) {
    if (line.startsWith('РасчСчет=')) {
      const acc = line.replace('РасчСчет=', '').trim()
      if (acc && !accountNumbers.includes(acc)) accountNumbers.push(acc)
    }
  }

  // Parse transaction sections
  const transactions: Transaction[] = []
  let inSection = false
  let current: Record<string, string> = {}

  for (const line of lines) {
    if (line.startsWith('СекцияДокумент')) {
      inSection = true
      current = {}
    } else if (line === 'КонецДокумента' && inSection) {
      inSection = false
      const tx = process1CDoc(current, accountNumbers, fileName)
      if (tx) transactions.push(tx)
    } else if (inSection) {
      const eq = line.indexOf('=')
      if (eq > 0) {
        current[line.slice(0, eq)] = line.slice(eq + 1)
      }
    }
  }

  return { transactions, accountNumbers }
}

function process1CDoc(doc: Record<string, string>, ourAccounts: string[], fileName: string): Transaction | null {
  const dateStr = doc['Дата'] || ''
  const date = parseRussianDate(dateStr)
  if (!date) return null

  const amountStr = doc['Сумма'] || '0'
  const rawAmount = parseAmount(amountStr)
  if (rawAmount === 0) return null

  const payerAccount = doc['ПлательщикСчет'] || ''
  const payeeAccount = doc['ПолучательСчет'] || ''

  // Determine direction
  let amount: number
  const isOutflow = ourAccounts.length > 0
    ? ourAccounts.some(acc => payerAccount.includes(acc) || acc.includes(payerAccount))
    : false

  if (isOutflow) {
    amount = -rawAmount
  } else {
    amount = rawAmount
  }

  const payer = doc['Плательщик1'] || doc['ПлательщикНаименование1'] || ''
  const payee = doc['Получатель1'] || doc['ПолучательНаименование1'] || ''
  const payerInn = doc['ПлательщикИНН'] || ''
  const payeeInn = doc['ПолучательИНН'] || ''
  const description = doc['НазначениеПлатежа'] || ''

  const counterparty = isOutflow ? payee : payer
  const counterpartyInn = isOutflow ? (payeeInn || undefined) : (payerInn || undefined)

  return {
    id: genId(),
    date,
    amount,
    counterparty,
    counterpartyInn: counterpartyInn || undefined,
    description,
    accountNumber: isOutflow ? payerAccount : payeeAccount,
    sourceFile: fileName,
    classification: 'unknown',
    isTransfer: false,
    confidence: 0,
  }
}

export function deduplicateTransactions(txs: Transaction[]): { transactions: Transaction[]; duplicates: number } {
  const seen = new Map<string, number>()
  const result: Transaction[] = []
  let duplicates = 0

  for (const tx of txs) {
    const key = `${tx.date.toISOString().split('T')[0]}|${Math.abs(tx.amount).toFixed(2)}|${tx.counterparty.slice(0, 20)}`
    const count = seen.get(key) ?? 0
    if (count === 0) {
      result.push(tx)
    } else {
      duplicates++
    }
    seen.set(key, count + 1)
  }

  return { transactions: result, duplicates }
}

export function sortTransactions(txs: Transaction[]): Transaction[] {
  return [...txs].sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function mergeFileParsedData(files: ParsedFile[]): Transaction[] {
  const all = files.flatMap(f => f.transactions)
  const { transactions } = deduplicateTransactions(all)
  return sortTransactions(transactions)
}
