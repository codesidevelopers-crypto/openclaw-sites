import type { RawTransaction, ColumnMapping } from './types'

function tryParseDate(raw: string, fmt: string): Date | null {
  if (!raw) return null
  const s = raw.trim()
  const fmtUpper = fmt.toUpperCase()

  // Common Russian/European formats
  const dmyDot = /^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/
  const dmySlash = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/
  const iso = /^(\d{4})-(\d{2})-(\d{2})/
  const dmyDash = /^(\d{1,2})-(\d{1,2})-(\d{2,4})$/
  const ymDot = /^(\d{4})\.(\d{2})\.(\d{2})$/

  let d: Date | null = null

  if (fmtUpper.includes('DD.MM.YYYY') || fmtUpper.includes('DD.MM.YY')) {
    const m = s.match(dmyDot)
    if (m) d = new Date(Number(m[3].length === 2 ? `20${m[3]}` : m[3]), Number(m[2]) - 1, Number(m[1]))
  } else if (fmtUpper.includes('DD/MM/YYYY') || fmtUpper.includes('DD/MM/YY')) {
    const m = s.match(dmySlash)
    if (m) d = new Date(Number(m[3].length === 2 ? `20${m[3]}` : m[3]), Number(m[2]) - 1, Number(m[1]))
  } else if (fmtUpper.includes('YYYY-MM-DD') || fmtUpper.includes('ISO')) {
    const m = s.match(iso)
    if (m) d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  } else if (fmtUpper.includes('DD-MM-YYYY')) {
    const m = s.match(dmyDash)
    if (m) d = new Date(Number(m[3].length === 2 ? `20${m[3]}` : m[3]), Number(m[2]) - 1, Number(m[1]))
  } else if (fmtUpper.includes('YYYY.MM.DD')) {
    const m = s.match(ymDot)
    if (m) d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  }

  // Fallback: try all patterns
  if (!d || isNaN(d.getTime())) {
    const tryOrder: [RegExp, (m: RegExpMatchArray) => Date][] = [
      [iso, (m) => new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))],
      [dmyDot, (m) => new Date(Number(m[3].length === 2 ? `20${m[3]}` : m[3]), Number(m[2]) - 1, Number(m[1]))],
      [ymDot, (m) => new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))],
      [dmySlash, (m) => new Date(Number(m[3].length === 2 ? `20${m[3]}` : m[3]), Number(m[2]) - 1, Number(m[1]))],
      [dmyDash, (m) => new Date(Number(m[3].length === 2 ? `20${m[3]}` : m[3]), Number(m[2]) - 1, Number(m[1]))],
    ]
    for (const [re, fn] of tryOrder) {
      const m = s.match(re)
      if (m) {
        const candidate = fn(m)
        if (!isNaN(candidate.getTime())) { d = candidate; break }
      }
    }
  }

  if (!d || isNaN(d.getTime())) {
    const jsDate = new Date(s)
    if (!isNaN(jsDate.getTime())) d = jsDate
  }

  return d && !isNaN(d.getTime()) ? d : null
}

function cleanAmount(raw: string): number {
  if (!raw) return 0
  // Remove currency symbols, spaces, and use dot as decimal
  const cleaned = raw.replace(/[^\d.,\-]/g, '').replace(/,(?=\d{3})/g, '').replace(',', '.')
  return parseFloat(cleaned) || 0
}

function normalizeCounterparty(raw: string): string {
  return raw?.trim().replace(/\s+/g, ' ') ?? ''
}

export function applyMapping(
  rows: Record<string, string>[],
  mapping: ColumnMapping,
  sourceFile: string,
): RawTransaction[] {
  const results: RawTransaction[] = []

  for (const row of rows) {
    const rawDate = row[mapping.date] ?? ''
    const date = tryParseDate(rawDate, mapping.date_format)
    if (!date) continue

    let amount = 0
    let direction: RawTransaction['direction'] = 'unknown'

    if (mapping.amount_sign === 'separate_columns' && mapping.amount_debit && mapping.amount_credit) {
      const debit = cleanAmount(row[mapping.amount_debit] ?? '')
      const credit = cleanAmount(row[mapping.amount_credit] ?? '')
      if (debit > 0 && credit === 0) {
        amount = debit
        direction = 'outflow'
      } else if (credit > 0 && debit === 0) {
        amount = credit
        direction = 'inflow'
      } else if (credit > 0 && debit > 0) {
        // Both have values — skip (likely header/total row)
        continue
      } else {
        continue
      }
    } else {
      const rawAmount = row[mapping.amount] ?? ''
      const signed = cleanAmount(rawAmount)
      if (signed === 0) continue
      amount = Math.abs(signed)
      direction = signed > 0 ? 'inflow' : 'outflow'
    }

    results.push({
      date,
      amount,
      direction,
      counterparty: normalizeCounterparty(row[mapping.counterparty ?? ''] ?? ''),
      inn: row[mapping.inn ?? '']?.trim() ?? '',
      description: row[mapping.description ?? '']?.trim() ?? '',
      sourceFile,
    })
  }

  return results
}

export function detectDateFormat(samples: string[]): string {
  const formats: Record<string, RegExp> = {
    'DD.MM.YYYY': /^\d{2}\.\d{2}\.\d{4}$/,
    'DD.MM.YY': /^\d{2}\.\d{2}\.\d{2}$/,
    'YYYY-MM-DD': /^\d{4}-\d{2}-\d{2}/,
    'DD/MM/YYYY': /^\d{2}\/\d{2}\/\d{4}$/,
    'YYYY.MM.DD': /^\d{4}\.\d{2}\.\d{2}$/,
    'DD-MM-YYYY': /^\d{2}-\d{2}-\d{4}$/,
  }

  for (const [fmt, re] of Object.entries(formats)) {
    const matches = samples.filter((s) => re.test(s.trim())).length
    if (matches > samples.length * 0.5) return fmt
  }
  return 'DD.MM.YYYY' // default fallback
}
