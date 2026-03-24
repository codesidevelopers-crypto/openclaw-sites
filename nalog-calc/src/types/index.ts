export type BusinessType = 'ip' | 'ooo'
export type TaxRegime = 'usn6' | 'usn15' | 'patent' | 'osno'

export interface FormData {
  businessType: BusinessType
  revenue: number
  expenses: number
  employees: number
  payroll: number
  vatImportant: boolean
  region: string
}

export interface TaxBreakdown {
  tax: number
  fixedContributions: number
  variableContributions: number
  employeeContributions: number
  vat: number
  total: number
}

export interface RegimeResult {
  regime: TaxRegime
  name: string
  shortName: string
  available: boolean
  unavailableReason?: string
  breakdown: TaxBreakdown
  monthlyEquivalent: number
  pros: string[]
  cons: string[]
  color: string
}

export interface CalculationResult {
  results: RegimeResult[]
  bestRegime: TaxRegime
  worstAvailableRegime: TaxRegime
  savings: number
  formData: FormData
}

export type Screen = 'landing' | 'quiz' | 'results'
