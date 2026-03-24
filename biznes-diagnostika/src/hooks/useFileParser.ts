import { useCallback } from 'react'
import type { ColumnMapping, Transaction } from '../engine/types'
import { applyMapping } from '../engine/normalize'
import { classifyTransaction } from '../engine/classify'
import { generateId } from '../engine/uid'

export interface ParsedFile {
  headers: string[]
  rows: Record<string, string>[]
  rawText?: string
  isRawFormat?: boolean
}

async function parseCSV(file: File): Promise<ParsedFile> {
  const Papa = (await import('papaparse')).default
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data
        const headers = results.meta.fields ?? []
        // Check if parsing actually produced meaningful results
        if (headers.length <= 1 || rows.length === 0) {
          // Probably not a real CSV — return as raw
          file.text().then((text) => {
            resolve({ headers: [], rows: [], rawText: text, isRawFormat: true })
          })
          return
        }
        resolve({ headers, rows })
      },
      error: (err: Error) => reject(err),
    })
  })
}

async function parseTXT(file: File): Promise<ParsedFile> {
  const text = await file.text()
  
  // Check if it looks like a structured format (1C, key=value, etc.)
  const lines = text.split('\n').slice(0, 20)
  const has1CMarkers = lines.some((l: string) => 
    /1CClientBankExchange|СекцияДокумент|КонецДокумента|ВерсияФормата|Кодировка/i.test(l)
  )
  const hasKeyValue = lines.filter((l: string) => /^[А-Яа-яA-Za-z]+=/.test(l.trim())).length > 3
  
  if (has1CMarkers || hasKeyValue) {
    // Non-tabular format — send raw text to LLM
    return { headers: [], rows: [], rawText: text, isRawFormat: true }
  }
  
  // Try PapaParse for tab-separated or other delimited TXT
  const Papa = (await import('papaparse')).default
  return new Promise((resolve) => {
    Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      delimiter: '',
      complete: (results) => {
        const rows = results.data
        const headers = results.meta.fields ?? []
        if (headers.length <= 1 || rows.length === 0) {
          resolve({ headers: [], rows: [], rawText: text, isRawFormat: true })
          return
        }
        resolve({ headers, rows })
      },
      error: () => {
        resolve({ headers: [], rows: [], rawText: text, isRawFormat: true })
      },
    })
  })
}

async function parseXLSX(file: File): Promise<ParsedFile> {
  const XLSX = await import('xlsx')
  const buffer = await file.arrayBuffer()
  const wb = XLSX.read(buffer, { type: 'array', cellDates: false })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const raw = XLSX.utils.sheet_to_json<Record<string, string>>(ws, { raw: false, defval: '' })
  const headers = Object.keys(raw[0] ?? {})
  return { headers, rows: raw }
}

interface LLMMapResult {
  format: string
  mapping?: ColumnMapping
  transactions?: Array<{
    date: string
    amount: number
    counterparty?: string
    inn?: string
    description?: string
  }>
  parse_instructions?: string
}

function parse1CTransactions(rawText: string, llmResult: LLMMapResult): Record<string, string>[] {
  // If LLM returned pre-parsed transactions, use those
  if (llmResult.transactions && llmResult.transactions.length > 0) {
    // But we need ALL transactions, not just the 3 samples
    // Parse the full text using 1C format knowledge
  }
  
  const sections: Record<string, string>[][] = []
  const lines = rawText.split('\n')
  let current: Record<string, string> | null = null
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (/^СекцияДокумент/i.test(trimmed)) {
      current = {}
    } else if (/^КонецДокумента/i.test(trimmed)) {
      if (current && Object.keys(current).length > 0) {
        sections.push([current])
      }
      current = null
    } else if (current && trimmed.includes('=')) {
      const eqIdx = trimmed.indexOf('=')
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim()
      current[key] = val
    }
  }
  
  return sections.map((s) => s[0]).filter(Boolean)
}

export function useFileParser(): {
  parseFile: (file: File) => Promise<ParsedFile>
  buildTransactionsFromMapping: (
    rows: Record<string, string>[],
    mapping: ColumnMapping,
    fileName: string,
  ) => Transaction[]
  buildTransactionsFromRaw: (
    rawText: string,
    llmResult: LLMMapResult,
    fileName: string,
  ) => Transaction[]
} {
  const parseFile = useCallback(async (file: File): Promise<ParsedFile> => {
    const name = file.name.toLowerCase()
    if (name.endsWith('.csv')) return parseCSV(file)
    if (name.endsWith('.xlsx') || name.endsWith('.xls')) return parseXLSX(file)
    if (name.endsWith('.txt')) return parseTXT(file)
    // Unknown extension — try as raw text
    const text = await file.text()
    return { headers: [], rows: [], rawText: text, isRawFormat: true }
  }, [])

  const buildTransactionsFromMapping = useCallback(
    (rows: Record<string, string>[], mapping: ColumnMapping, fileName: string): Transaction[] => {
      const rawTxs = applyMapping(rows, mapping, fileName)
      return rawTxs.map((raw) => {
        const classification = classifyTransaction(raw)
        return {
          ...raw,
          id: generateId(),
          class: classification.class,
          classConfidence: classification.confidence,
          recurringHint: classification.recurringHint,
          isDuplicate: false,
          isTransfer: false,
        }
      })
    },
    [],
  )

  const buildTransactionsFromRaw = useCallback(
    (rawText: string, llmResult: LLMMapResult, fileName: string): Transaction[] => {
      // Parse 1C format or other non-tabular formats
      if (llmResult.format === '1c_exchange') {
        const rows1C = parse1CTransactions(rawText, llmResult)
        
        if (rows1C.length === 0) return []

        // Use LLM-provided mapping to map 1C fields
        const llmMapping = llmResult.mapping || {} as Record<string, string | null | undefined>
        const mapping: ColumnMapping = {
          date: (llmMapping.date as string) || 'Дата',
          date_format: (llmMapping.date_format as string) || 'DD.MM.YYYY',
          amount: (llmMapping.amount as string) || 'Сумма',
          amount_sign: (llmMapping.amount_sign as 'signed' | 'separate_columns' | 'positive_is_inflow') || 'signed',
          amount_debit: (llmMapping.amount_debit as string) || undefined,
          amount_credit: (llmMapping.amount_credit as string) || undefined,
          counterparty: (llmMapping.counterparty as string) || undefined,
          inn: (llmMapping.inn as string) || undefined,
          description: (llmMapping.description as string) || undefined,
          account: (llmMapping.account as string) || undefined,
        }

        // For 1C: check if LLM fields exist in data, try alternatives
        const sample = rows1C[0]
        if (mapping.counterparty && !sample[mapping.counterparty]) {
          // Try common 1C field name variants
          const altNames = ['Получатель1', 'ПолучательНаименование1', 'Плательщик1', 'ПлательщикНаименование1', 'Получатель', 'Плательщик', 'Контрагент']
          for (const alt of altNames) {
            if (sample[alt]) { mapping.counterparty = alt; break }
          }
        }
        if (mapping.description && !sample[mapping.description]) {
          const altDesc = ['НазначениеПлатежа', 'Назначение', 'НазначениеПлатежа1']
          for (const alt of altDesc) {
            if (sample[alt]) { mapping.description = alt; break }
          }
        }
        if (mapping.inn && !sample[mapping.inn]) {
          const altInn = ['ПлательщикИНН', 'ПолучательИНН', 'ИНН']
          for (const alt of altInn) {
            if (sample[alt]) { mapping.inn = alt; break }
          }
        }

        const rawTxs = applyMapping(rows1C, mapping, fileName)
        return rawTxs.map((raw) => {
          const classification = classifyTransaction(raw)
          return {
            ...raw,
            id: generateId(),
            class: classification.class,
            classConfidence: classification.confidence,
            recurringHint: classification.recurringHint,
            isDuplicate: false,
            isTransfer: false,
          }
        })
      }
      
      // If LLM returned pre-parsed transactions as samples — still parse the full file
      if (llmResult.transactions && llmResult.transactions.length > 0) {
        // Use the sample transactions as a last resort
        return llmResult.transactions.map((tx) => {
          const amount = Number(tx.amount) || 0
          const base = {
            id: generateId(),
            date: parseFlexDate(tx.date),
            amount: Math.abs(amount),
            direction: (amount >= 0 ? 'inflow' : 'outflow') as 'inflow' | 'outflow',
            counterpartyRaw: tx.counterparty || '',
            counterpartyNormalized: (tx.counterparty || '').toLowerCase().trim(),
            descriptionRaw: tx.description || '',
            descriptionNormalized: (tx.description || '').toLowerCase().trim(),
            inn: tx.inn || '',
            sourceFile: fileName,
            class: 'unknown' as const,
            classConfidence: 'low' as const,
            recurringHint: false,
            isDuplicate: false,
            isTransfer: false,
          }
          const classification = classifyTransaction(base)
          return { ...base, class: classification.class, classConfidence: classification.confidence, recurringHint: classification.recurringHint }
        })
      }
      
      return []
    },
    [],
  )

  return { parseFile, buildTransactionsFromMapping, buildTransactionsFromRaw }
}

function parseFlexDate(dateStr: string): Date {
  if (!dateStr) return new Date()
  // Try DD.MM.YYYY
  const dmy = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (dmy) return new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]))
  // Try YYYY-MM-DD
  const ymd = dateStr.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (ymd) return new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]))
  return new Date(dateStr)
}
