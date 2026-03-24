export interface BusinessFormData {
  // Contact
  name: string
  email: string
  businessType: string
  // Revenue & Finance
  monthlyRevenue: string
  revenueGrowth: string
  netMargin: string
  cashFlow: string
  // Operations
  teamSize: string
  operationalEfficiency: string
  processAutomation: string
  // Marketing & Sales
  customerAcquisitionCost: string
  customerLifetimeValue: string
  conversionRate: string
  // Customer & Product
  npsScore: string
  churnRate: string
  productMarketFit: string
}

export interface ScoreCategory {
  name: string
  score: number
  maxScore: number
  label: string
  color: string
  items: ScoreItem[]
}

export interface ScoreItem {
  label: string
  value: string
  score: number
  maxScore: number
}

export interface DashboardData {
  overallScore: number
  grade: string
  gradeLabel: string
  categories: ScoreCategory[]
  recommendations: Recommendation[]
  formData: BusinessFormData
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low'
  category: string
  title: string
  description: string
}

export interface SubmitResponse {
  success: boolean
  message: string
}

export type FormStep = 'intro' | 'contact' | 'finance' | 'operations' | 'marketing' | 'product' | 'dashboard'
