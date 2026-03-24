export interface QuizOption {
  label: string
  score: number
}

export interface QuizQuestion {
  id: string
  text: string
  options: QuizOption[]
}

export interface QuizCategory {
  id: string
  title: string
  icon: string
  color: string
  questions: QuizQuestion[]
}

export type QuizAnswers = Record<string, number>

export interface CategoryResult {
  id: string
  title: string
  icon: string
  color: string
  score: number
  maxScore: number
  percentage: number
  level: ResultLevel
}

export type ResultLevel = 'critical' | 'weak' | 'developing' | 'strong'

export interface QuizResult {
  totalScore: number
  maxScore: number
  percentage: number
  level: ResultLevel
  categories: CategoryResult[]
}

export interface Recommendation {
  categoryId: string
  title: string
  text: string
  priority: 'high' | 'medium' | 'low'
}

export type ViewState = 'hero' | 'quiz' | 'results'

export interface SubmitPayload {
  form: string
  answers: QuizAnswers
  totalScore: number
  percentage: number
  level: ResultLevel
}

export interface SubmitResponse {
  ok: boolean
  message?: string
}
