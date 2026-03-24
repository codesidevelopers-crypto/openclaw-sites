export type TransactionClass =
  | 'tax'
  | 'owner_draw'
  | 'financing_inflow'
  | 'financing_outflow'
  | 'operating_inflow'
  | 'operating_outflow'
  | 'transfer'
  | 'unknown'

export interface Transaction {
  id: string
  date: Date
  amount: number // positive = inflow, negative = outflow
  counterparty: string
  counterpartyInn?: string
  description: string
  accountNumber?: string
  sourceFile: string
  classification: TransactionClass
  isTransfer: boolean
  confidence: number // 0-1 classification confidence
}

export type BusinessType = 'services' | 'trade' | 'manufacturing' | 'construction' | 'it' | 'transport' | 'other'
export type AccountsCoverage = 'all' | 'most' | 'partial'
export type IncomeStability = 'stable' | 'moderate' | 'volatile'
export type DebtLevel = 'none' | 'comfortable' | 'pressure' | 'heavy'
export type Seasonality = 'none' | 'moderate' | 'strong'

export interface QuestionnaireAnswers {
  cashBalance: number
  accountsCoverage: AccountsCoverage
  businessType: BusinessType
  incomeStability: IncomeStability
  debtLevel: DebtLevel
  seasonality: Seasonality
}

export interface ParsedFile {
  id: string
  name: string
  size: number
  format: 'csv' | 'xlsx' | 'xls' | '1c' | 'unknown'
  status: 'parsing' | 'ok' | 'error' | 'mapping_required'
  transactions: Transaction[]
  error?: string
  warnings: string[]
  columnMapping?: ColumnMapping
  rawHeaders?: string[]
  periodStart?: Date
  periodEnd?: Date
  detectedAccountNumber?: string
}

export interface ColumnMapping {
  date: string
  amount?: string
  debit?: string
  credit?: string
  counterparty?: string
  inn?: string
  description?: string
}

export interface RecurringExpense {
  counterparty: string
  normalizedName: string
  amounts: number[]
  medianAmount: number
  cv: number
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'irregular'
  intervalDays: number
  monthlyAmount: number
  isEssential: boolean
  classification: TransactionClass
  occurrences: number
  lastDate: Date
}

export interface MonthlyFlow {
  month: string // "2024-01"
  label: string // "Янв 2024"
  inflow: number
  outflow: number
  net: number
  operatingInflow: number
  operatingOutflow: number
}

export interface WeeklyPattern {
  week: number // 1-4
  label: string // "1-я неделя"
  avgNet: number
  avgInflow: number
  avgOutflow: number
}

export interface TopPayer {
  counterparty: string
  total: number
  share: number
  count: number
}

export type RiskLevel = 'low' | 'medium' | 'elevated' | 'high'
export type ConfidenceLevel = 'low' | 'medium' | 'high'

export interface ConfidenceDetails {
  level: ConfidenceLevel
  score: number // 0-1
  unknownRatio: number
  periodMonths: number
  recurringQuality: number
  accountsCoverage: AccountsCoverage
  reasons: string[]
}

export interface Recommendation {
  id: string
  priority: 'critical' | 'high' | 'medium'
  title: string
  body: string
  action?: string
}

export interface DiagnosticResult {
  // Core metrics
  hardSurvival: number
  stressSurvival: number
  cashResilienceScore: number
  cashGapRisk: RiskLevel

  // Survival components
  cashNow: number
  essentialMonthlyOutflow: number
  weakInflow: number
  stressNetBurn: number

  // Reserve
  targetReserveMonths: number
  targetReserveAmount: number

  // Monthly analysis
  monthlyFlows: MonthlyFlow[]
  badMonths: number
  totalMonths: number

  // Recurring
  recurringCore: RecurringExpense[]
  totalEssentialMonthly: number

  // Weekly patterns
  weeklyPatterns: WeeklyPattern[]

  // Concentration
  top1Share: number
  top3Share: number
  topPayers: TopPayer[]

  // Stats
  avgMonthlyInflow: number
  avgMonthlyOutflow: number
  inflowCV: number
  totalTransactions: number
  periodStart: Date
  periodEnd: Date

  // Confidence
  confidence: ConfidenceDetails

  // Recommendations
  recommendations: Recommendation[]
}
