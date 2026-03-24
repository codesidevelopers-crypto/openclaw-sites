import React, { createContext, useContext, useReducer, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { FileParseResult, QuestionnaireAnswers, EngineResult } from '../engine/types'

export type Screen = 'landing' | 'upload' | 'questionnaire' | 'processing' | 'dashboard'

export interface UtmParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  utm_id: string
  referrer: string
}

export interface AppState {
  screen: Screen
  files: FileParseResult[]
  questionnaire: Partial<QuestionnaireAnswers>
  engineResult: EngineResult | null
  sessionId: string
  utmParams: UtmParams
  captchaToken: string | null
}

type Action =
  | { type: 'SET_SCREEN'; screen: Screen }
  | { type: 'ADD_FILE'; file: FileParseResult }
  | { type: 'UPDATE_FILE'; fileName: string; update: Partial<FileParseResult> }
  | { type: 'SET_QUESTIONNAIRE'; answers: Partial<QuestionnaireAnswers> }
  | { type: 'SET_ENGINE_RESULT'; result: EngineResult }
  | { type: 'SET_UTM'; params: UtmParams }
  | { type: 'SET_CAPTCHA_TOKEN'; token: string }

function generateSessionId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

const initialState: AppState = {
  screen: 'landing',
  files: [],
  questionnaire: {},
  engineResult: null,
  sessionId: generateSessionId(),
  utmParams: {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    utm_id: '',
    referrer: '',
  },
  captchaToken: null,
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen }
    case 'ADD_FILE':
      return { ...state, files: [...state.files, action.file] }
    case 'UPDATE_FILE':
      return {
        ...state,
        files: state.files.map((f) =>
          f.fileName === action.fileName ? { ...f, ...action.update } : f,
        ),
      }
    case 'SET_QUESTIONNAIRE':
      return { ...state, questionnaire: { ...state.questionnaire, ...action.answers } }
    case 'SET_ENGINE_RESULT':
      return { ...state, engineResult: action.result }
    case 'SET_UTM':
      return { ...state, utmParams: action.params }
    case 'SET_CAPTCHA_TOKEN':
      return { ...state, captchaToken: action.token }
    default:
      return state
  }
}

interface AppContextValue {
  state: AppState
  setScreen: (screen: Screen) => void
  addFile: (file: FileParseResult) => void
  updateFile: (fileName: string, update: Partial<FileParseResult>) => void
  setQuestionnaire: (answers: Partial<QuestionnaireAnswers>) => void
  setEngineResult: (result: EngineResult) => void
  setUtm: (params: UtmParams) => void
  setCaptchaToken: (token: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setScreen = useCallback((screen: Screen) => dispatch({ type: 'SET_SCREEN', screen }), [])
  const addFile = useCallback((file: FileParseResult) => dispatch({ type: 'ADD_FILE', file }), [])
  const updateFile = useCallback(
    (fileName: string, update: Partial<FileParseResult>) =>
      dispatch({ type: 'UPDATE_FILE', fileName, update }),
    [],
  )
  const setQuestionnaire = useCallback(
    (answers: Partial<QuestionnaireAnswers>) => dispatch({ type: 'SET_QUESTIONNAIRE', answers }),
    [],
  )
  const setEngineResult = useCallback(
    (result: EngineResult) => dispatch({ type: 'SET_ENGINE_RESULT', result }),
    [],
  )
  const setUtm = useCallback((params: UtmParams) => dispatch({ type: 'SET_UTM', params }), [])
  const setCaptchaToken = useCallback(
    (token: string) => dispatch({ type: 'SET_CAPTCHA_TOKEN', token }),
    [],
  )

  return (
    <AppContext.Provider
      value={{ state, setScreen, addFile, updateFile, setQuestionnaire, setEngineResult, setUtm, setCaptchaToken }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
