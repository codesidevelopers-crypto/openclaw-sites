import type { FormData, RegimeResult, CalculationResult, TaxBreakdown, TaxRegime } from '../types'
import { getPatentPotentialIncome } from '../utils/regions'

// === 2025 Constants ===
const FIXED_CONTRIB_2025 = 53_658
const MAX_TOTAL_CONTRIB_2025 = 300_888
const VARIABLE_CONTRIB_RATE = 0.01
const VARIABLE_CONTRIB_THRESHOLD = 300_000

const USN_REVENUE_LIMIT = 265_800_000
const USN_UPPER_RATE_THRESHOLD = 199_350_000
const USN_EMPLOYEE_LIMIT = 130

const PATENT_REVENUE_LIMIT = 60_000_000
const PATENT_EMPLOYEE_LIMIT = 15

const EMPLOYEE_CONTRIB_BASE_RATE = 0.30
const EMPLOYEE_CONTRIB_UPPER_RATE = 0.151
const EMPLOYEE_CONTRIB_THRESHOLD_ANNUAL = 2_225_000

function calcEmployeeContributions(monthlyPayroll: number, employees: number): number {
  if (employees === 0 || monthlyPayroll === 0) return 0
  const annualPerEmployee = monthlyPayroll * 12
  let total = 0
  for (let i = 0; i < employees; i++) {
    if (annualPerEmployee <= EMPLOYEE_CONTRIB_THRESHOLD_ANNUAL) {
      total += annualPerEmployee * EMPLOYEE_CONTRIB_BASE_RATE
    } else {
      total +=
        EMPLOYEE_CONTRIB_THRESHOLD_ANNUAL * EMPLOYEE_CONTRIB_BASE_RATE +
        (annualPerEmployee - EMPLOYEE_CONTRIB_THRESHOLD_ANNUAL) * EMPLOYEE_CONTRIB_UPPER_RATE
    }
  }
  return Math.round(total)
}

function calcIPVariableContributions(taxableIncome: number): number {
  const excess = Math.max(taxableIncome - VARIABLE_CONTRIB_THRESHOLD, 0)
  const raw = excess * VARIABLE_CONTRIB_RATE
  const maxVariable = MAX_TOTAL_CONTRIB_2025 - FIXED_CONTRIB_2025
  return Math.round(Math.min(raw, maxVariable))
}

function emptyBreakdown(): TaxBreakdown {
  return { tax: 0, fixedContributions: 0, variableContributions: 0, employeeContributions: 0, vat: 0, total: 0 }
}

function unavailableResult(
  regime: TaxRegime,
  name: string,
  shortName: string,
  color: string,
  reason: string,
): RegimeResult {
  return {
    regime,
    name,
    shortName,
    available: false,
    unavailableReason: reason,
    breakdown: emptyBreakdown(),
    monthlyEquivalent: 0,
    pros: [],
    cons: [],
    color,
  }
}

// === USN 6% (Доходы) ===
function calcUSN6(data: FormData): RegimeResult {
  const { revenue, employees, payroll, businessType } = data

  if (revenue > USN_REVENUE_LIMIT) {
    return unavailableResult('usn6', 'УСН 6% (доходы)', 'УСН 6%', '#00D4A8', `Выручка превышает лимит УСН (265,8 млн ₽)`)
  }
  if (employees > USN_EMPLOYEE_LIMIT) {
    return unavailableResult('usn6', 'УСН 6% (доходы)', 'УСН 6%', '#00D4A8', `Число сотрудников превышает лимит УСН (130 чел.)`)
  }

  const taxRate = revenue > USN_UPPER_RATE_THRESHOLD ? 0.08 : 0.06
  let tax = Math.round(revenue * taxRate)

  const fixedContribs = businessType === 'ip' ? FIXED_CONTRIB_2025 : 0
  const variableContribs = businessType === 'ip' ? calcIPVariableContributions(revenue) : 0
  const employeeContribs = calcEmployeeContributions(payroll, employees)

  let deduction: number
  if (businessType === 'ip' && employees === 0) {
    deduction = Math.min(fixedContribs + variableContribs, tax)
  } else if (businessType === 'ip') {
    deduction = Math.min(fixedContribs + variableContribs + employeeContribs, Math.floor(tax * 0.5))
  } else {
    deduction = Math.min(employeeContribs, Math.floor(tax * 0.5))
  }

  tax = Math.max(tax - deduction, 0)
  const total = tax + fixedContribs + variableContribs + employeeContribs

  const pros: string[] = [
    'Простой учёт — только доходы',
    'Не нужно подтверждать расходы документами',
    'Один налог вместо нескольких',
    employees === 0 && businessType === 'ip' ? 'Налог можно уменьшить до 0 за счёт взносов' : 'Налог уменьшается на страховые взносы',
  ]

  const cons: string[] = [
    'Невыгодно при высоких расходах',
    'Не подходит для некоторых видов деятельности',
    ...(revenue > USN_UPPER_RATE_THRESHOLD ? ['Повышенная ставка 8% из-за высокой выручки'] : []),
  ]

  return {
    regime: 'usn6',
    name: 'УСН 6% (доходы)',
    shortName: 'УСН 6%',
    available: true,
    breakdown: { tax, fixedContributions: fixedContribs, variableContributions: variableContribs, employeeContributions: employeeContribs, vat: 0, total },
    monthlyEquivalent: Math.round(total / 12),
    pros,
    cons,
    color: '#00D4A8',
  }
}

// === USN 15% (Доходы минус расходы) ===
function calcUSN15(data: FormData): RegimeResult {
  const { revenue, expenses, employees, payroll, businessType } = data

  if (revenue > USN_REVENUE_LIMIT) {
    return unavailableResult('usn15', 'УСН 15% (доходы − расходы)', 'УСН 15%', '#4E9EFF', `Выручка превышает лимит УСН (265,8 млн ₽)`)
  }
  if (employees > USN_EMPLOYEE_LIMIT) {
    return unavailableResult('usn15', 'УСН 15% (доходы − расходы)', 'УСН 15%', '#4E9EFF', `Число сотрудников превышает лимит УСН (130 чел.)`)
  }

  const taxRate = revenue > USN_UPPER_RATE_THRESHOLD ? 0.20 : 0.15
  const profit = Math.max(revenue - expenses, 0)
  const regularTax = Math.round(profit * taxRate)
  const minTax = Math.round(revenue * 0.01)
  const tax = Math.max(regularTax, minTax)

  const fixedContribs = businessType === 'ip' ? FIXED_CONTRIB_2025 : 0
  const variableContribs = businessType === 'ip' ? calcIPVariableContributions(profit) : 0
  const employeeContribs = calcEmployeeContributions(payroll, employees)
  const total = tax + fixedContribs + variableContribs + employeeContribs

  const expenseRatio = revenue > 0 ? expenses / revenue : 0
  const pros: string[] = [
    'Выгодно при расходах более 60% от выручки',
    'Расходы уменьшают налоговую базу',
    'Страховые взносы включаются в расходы',
    ...(expenseRatio > 0.7 ? ['Ваши расходы делают этот режим выгодным'] : []),
  ]
  const cons: string[] = [
    'Нужно подтверждать расходы документами',
    'Минимальный налог 1% даже при убытке',
    ...(expenseRatio < 0.6 ? ['При ваших расходах УСН 6% может быть выгоднее'] : []),
    ...(revenue > USN_UPPER_RATE_THRESHOLD ? ['Повышенная ставка 20% из-за высокой выручки'] : []),
  ]

  return {
    regime: 'usn15',
    name: 'УСН 15% (доходы − расходы)',
    shortName: 'УСН 15%',
    available: true,
    breakdown: { tax, fixedContributions: fixedContribs, variableContributions: variableContribs, employeeContributions: employeeContribs, vat: 0, total },
    monthlyEquivalent: Math.round(total / 12),
    pros,
    cons,
    color: '#4E9EFF',
  }
}

// === Патент ===
function calcPatent(data: FormData): RegimeResult {
  const { revenue, employees, payroll, businessType, region } = data

  if (businessType === 'ooo') {
    return unavailableResult('patent', 'Патент (ПСН)', 'Патент', '#B77FFF', 'Патент доступен только для ИП')
  }
  if (revenue > PATENT_REVENUE_LIMIT) {
    return unavailableResult('patent', 'Патент (ПСН)', 'Патент', '#B77FFF', `Выручка превышает лимит патента (60 млн ₽)`)
  }
  if (employees > PATENT_EMPLOYEE_LIMIT) {
    return unavailableResult('patent', 'Патент (ПСН)', 'Патент', '#B77FFF', `Число сотрудников превышает лимит патента (15 чел.)`)
  }

  const potentialIncome = getPatentPotentialIncome(region)
  const patentCostGross = Math.round(potentialIncome * 0.06)

  const fixedContribs = FIXED_CONTRIB_2025
  const variableContribs = calcIPVariableContributions(revenue)
  const employeeContribs = calcEmployeeContributions(payroll, employees)

  const totalContribs = fixedContribs + variableContribs + employeeContribs
  const deductionLimit = employees > 0 ? Math.floor(patentCostGross * 0.5) : patentCostGross
  const deduction = Math.min(fixedContribs + variableContribs, deductionLimit)
  const tax = Math.max(patentCostGross - deduction, 0)
  const total = tax + fixedContribs + variableContribs + employeeContribs

  const pros: string[] = [
    'Фиксированная стоимость — не зависит от реального дохода',
    'Не нужно подавать декларацию',
    'Простой учёт — только книга доходов',
    'Выгодно при доходе выше потенциального',
  ]
  const cons: string[] = [
    'Только для отдельных видов деятельности',
    'Лимит выручки 60 млн ₽/год',
    'Лимит сотрудников 15 человек',
    'Нельзя применять для ООО',
  ]

  return {
    regime: 'patent',
    name: 'Патент (ПСН)',
    shortName: 'Патент',
    available: true,
    breakdown: { tax, fixedContributions: fixedContribs, variableContributions: variableContribs, employeeContributions: employeeContribs, vat: 0, total },
    monthlyEquivalent: Math.round(total / 12),
    pros,
    cons,
    color: '#B77FFF',
  }
}

// === ОСНО ===
function calcOSNO(data: FormData): RegimeResult {
  const { revenue, expenses, employees, payroll, businessType } = data

  const employeeContribs = calcEmployeeContributions(payroll, employees)
  let tax: number

  if (businessType === 'ip') {
    const deductibleExpenses = expenses + FIXED_CONTRIB_2025 + employeeContribs
    const profit = Math.max(revenue - deductibleExpenses, 0)
    if (profit <= 5_000_000) {
      tax = Math.round(profit * 0.13)
    } else {
      tax = Math.round(5_000_000 * 0.13 + (profit - 5_000_000) * 0.15)
    }
  } else {
    const profit = Math.max(revenue - expenses - employeeContribs, 0)
    tax = Math.round(profit * 0.20)
  }

  const valueAdded = Math.max(revenue - expenses, 0)
  const vat = Math.round((valueAdded / 1.2) * 0.20)

  const fixedContribs = businessType === 'ip' ? FIXED_CONTRIB_2025 : 0
  const variableContribs = businessType === 'ip' ? calcIPVariableContributions(revenue) : 0
  const total = tax + vat + fixedContribs + variableContribs + employeeContribs

  const pros: string[] = [
    'Нет ограничений по выручке и числу сотрудников',
    'Можно работать с НДС — важно для крупных клиентов',
    'Учитываются все виды расходов',
    'Подходит для любого вида деятельности',
  ]
  const cons: string[] = [
    'Самая высокая налоговая нагрузка',
    'Сложная отчётность, нужен бухгалтер',
    'НДС — ежеквартальная отчётность и платежи',
    'Высокие расходы на ведение учёта',
  ]

  return {
    regime: 'osno',
    name: 'ОСНО',
    shortName: 'ОСНО',
    available: true,
    breakdown: { tax, fixedContributions: fixedContribs, variableContributions: variableContribs, employeeContributions: employeeContribs, vat, total },
    monthlyEquivalent: Math.round(total / 12),
    pros,
    cons,
    color: '#FF7A5C',
  }
}

// === Main Calculator ===
export function calculateTaxes(data: FormData): CalculationResult {
  const results: RegimeResult[] = [
    calcUSN6(data),
    calcUSN15(data),
    calcPatent(data),
    calcOSNO(data),
  ]

  const available = results.filter((r) => r.available)
  const sorted = [...available].sort((a, b) => a.breakdown.total - b.breakdown.total)

  const bestRegime: TaxRegime = sorted[0]?.regime ?? 'usn6'
  const worstAvailableRegime: TaxRegime = sorted[sorted.length - 1]?.regime ?? 'osno'

  const bestTotal = sorted[0]?.breakdown.total ?? 0
  const worstTotal = sorted[sorted.length - 1]?.breakdown.total ?? 0
  const savings = Math.max(worstTotal - bestTotal, 0)

  return { results, bestRegime, worstAvailableRegime, savings, formData: data }
}
