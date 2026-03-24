import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { ParsedFile, QuestionnaireAnswers, DiagnosticResult } from '../engine/types'

export type Screen = 'landing' | 'upload' | 'questionnaire' | 'processing' | 'dashboard'

export interface AppState {
  currentScreen: Screen
  parsedFiles: ParsedFile[]
  transactions: import('../engine/types').Transaction[]
  questionnaire: QuestionnaireAnswers
  results: DiagnosticResult | null
  sessionId: string
  utmParams: Record<string, string>
}

interface AppContextValue extends AppState {
  goTo: (screen: Screen) => void
  setParsedFiles: (files: ParsedFile[]) => void
  setQuestionnaire: (q: QuestionnaireAnswers) => void
  setResults: (r: DiagnosticResult) => void
}

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

const defaultQuestionnaire: QuestionnaireAnswers = {
  cashBalance: 0,
  accountsCoverage: 'all',
  businessType: 'services',
  incomeStability: 'stable',
  debtLevel: 'none',
  seasonality: 'none',
}

const AppContext = createContext<AppContextValue | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing')
  const [parsedFiles, setParsedFiles] = useState<ParsedFile[]>([])
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireAnswers>(defaultQuestionnaire)
  const [results, setResults] = useState<DiagnosticResult | null>(null)
  const [sessionId] = useState(generateSessionId)
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const val = params.get(key)
      if (val) utm[key] = val
    }
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem('utm_params', JSON.stringify(utm))
      setUtmParams(utm)
    } else {
      try {
        const stored = sessionStorage.getItem('utm_params')
        if (stored) setUtmParams(JSON.parse(stored) as Record<string, string>)
      } catch { /* ignore */ }
    }
  }, [])

  const goTo = useCallback((screen: Screen) => {
    setCurrentScreen(screen)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <AppContext.Provider value={{
      currentScreen,
      parsedFiles,
      transactions: [],
      questionnaire,
      results,
      sessionId,
      utmParams,
      goTo,
      setParsedFiles,
      setQuestionnaire,
      setResults,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
