import { useCallback } from 'react'
import type { ColumnMapping, Transaction } from '../engine/types'
import { applyMapping } from '../engine/normalize'
import { classifyTransaction } from '../engine/classify'
import { generateId } from '../engine/uid'

interface ParsedFile {
  headers: string[]
  rows: Record<string, string>[]
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
        resolve({ headers, rows })
      },
      error: (err: Error) => reject(err),
    })
  })
}

async function parseTXT(file: File): Promise<ParsedFile> {
  const Papa = (await import('papaparse')).default
  const text = await file.text()
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      delimiter: '',
      complete: (results) => {
        const rows = results.data
        const headers = results.meta.fields ?? []
        resolve({ headers, rows })
      },
      error: (err: Error) => reject(err),
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

export function useFileParser(): {
  parseFile: (file: File) => Promise<ParsedFile>
  buildTransactionsFromMapping: (
    rows: Record<string, string>[],
    mapping: ColumnMapping,
    fileName: string,
  ) => Transaction[]
} {
  const parseFile = useCallback(async (file: File): Promise<ParsedFile> => {
    const name = file.name.toLowerCase()
    if (name.endsWith('.csv')) return parseCSV(file)
    if (name.endsWith('.xlsx') || name.endsWith('.xls')) return parseXLSX(file)
    if (name.endsWith('.txt')) return parseTXT(file)
    throw new Error(`Неподдерживаемый формат: ${name}`)
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

  return { parseFile, buildTransactionsFromMapping }
}
