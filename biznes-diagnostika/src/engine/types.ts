export type Direction = 'inflow' | 'outflow' | 'transfer' | 'unknown'

export type OperationClass =
  | 'tax'
  | 'owner_draw'
  | 'financing_inflow'
  | 'financing_outflow'
  | 'operating_inflow'
  | 'operating_outflow'
  | 'transfer'
  | 'unknown'

export type ClassificationConfidence = 'high' | 'medium' | 'low'

export interface RawTransaction {
  date: Date
  amount: number
  direction: Direction
  counterparty: string
  inn: string
  description: string
  sourceFile: string
}

export interface Transaction extends RawTransaction {
  id: string
  class: OperationClass
  classConfidence: ClassificationConfidence
  recurringHint: boolean
  isDuplicate: boolean
  isTransfer: boolean
}

export interface RecurringExpense {
  normalizedCounterparty: string
  originalCounterparty: string
  medianAmount: number
  avgIntervalDays: number
  occurrences: number
  confidence: ClassificationConfidence
  isEssential: boolean
  category: string
}

export interface MonthlyStats {
  year: number
  month: number
  label: string
  operatingInflow: number
  operatingOutflow: number
  netFlow: number
  isNegative: boolean
}

export interface WeeklyPattern {
  week: 1 | 2 | 3 | 4
  avgNetFlow: number
  label: string
}

export interface TopPayer {
  counterparty: string
  totalInflow: number
  share: number
}

export type CashGapRisk = 'Низкий' | 'Средний' | 'Повышенный' | 'Высокий'
export type ConfidenceLevel = 'Высокая' | 'Средняя' | 'Ниже обычной'

export interface ConfidenceFactors {
  unknownOpsPercent: number
  periodMonths: number
  coverageComplete: boolean
  recurringCoreConfidence: ClassificationConfidence
}

export interface EngineResult {
  transactions: Transaction[]
  totalCount: number
  duplicateCount: number
  periodStart: Date
  periodEnd: Date
  periodMonths: number

  // Core metrics
  essentialRecurringOutflow: number
  avgMonthlyOperatingInflow: number
  p25MonthlyOperatingInflow: number
  inflowCV: number

  hardSurvivalMonths: number
  weakInflow: number
  stressNetBurn: number
  stressSurvivalMonths: number

  badMonthRate: number
  badMonthCount: number
  totalMonthCount: number

  top1PayerShare: number
  top3PayerShare: number
  topPayers: TopPayer[]

  targetReserveMonths: number
  targetReserveAmount: number

  cashGapRisk: CashGapRisk
  cashResilienceScore: number

  recurringExpenses: RecurringExpense[]
  monthlyStats: MonthlyStats[]
  weeklyPattern: WeeklyPattern[]

  confidenceLevel: ConfidenceLevel
  confidenceFactors: ConfidenceFactors

  usedFallback: boolean
}

export interface QuestionnaireAnswers {
  cashNow: number
  coverageLevel: 'all' | 'most' | 'partial'
  businessType: 'services' | 'trade' | 'manufacturing' | 'construction' | 'it' | 'transport' | 'other'
  volatility: 'stable' | 'moderate' | 'high'
  creditLoad: 'none' | 'comfortable' | 'pressure' | 'heavy'
  seasonality: 'none' | 'moderate' | 'strong'
}

export interface ColumnMapping {
  date: string
  date_format: string
  amount: string
  amount_sign: 'signed' | 'separate_columns'
  amount_debit?: string
  amount_credit?: string
  counterparty?: string
  inn?: string
  description?: string
}

export interface FileParseResult {
  fileName: string
  rawRows: Record<string, string>[]
  headers: string[]
  mapping: ColumnMapping | null
  transactions: Transaction[]
  rowCount: number
  status: 'pending' | 'mapping' | 'parsed' | 'error'
  error?: string
  periodStart?: Date
  periodEnd?: Date
}
