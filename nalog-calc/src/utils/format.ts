export function formatMoney(amount: number): string {
  return Math.round(amount).toLocaleString('ru-RU')
}

export function formatMoneyShort(amount: number): string {
  const rounded = Math.round(amount)
  if (rounded >= 1_000_000_000) {
    return `${(rounded / 1_000_000_000).toFixed(1)} млрд`
  }
  if (rounded >= 1_000_000) {
    const val = rounded / 1_000_000
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)} млн`
  }
  if (rounded >= 1_000) {
    const val = rounded / 1_000
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)} тыс`
  }
  return `${rounded}`
}

export function parseMoneyInput(value: string): number {
  const stripped = value.replace(/[^\d]/g, '')
  const parsed = parseInt(stripped, 10)
  return isNaN(parsed) ? 0 : parsed
}

export function formatPercent(numerator: number, denominator: number): string {
  if (denominator === 0) return '0%'
  return `${Math.round((numerator / denominator) * 100)}%`
}
