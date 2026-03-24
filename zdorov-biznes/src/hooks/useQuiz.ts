import { useState, useCallback } from 'react'
import type { QuizAnswers, QuizResult, CategoryResult, ViewState, SubmitPayload, SubmitResponse } from '../types'
import {
  quizCategories,
  MAX_SCORE_PER_CATEGORY,
  MAX_TOTAL_SCORE,
  getLevelFromPercentage,
  recommendations,
} from '../data/quiz'
import type { Recommendation } from '../types'

interface UseQuizReturn {
  view: ViewState
  currentCategoryIndex: number
  answers: QuizAnswers
  result: QuizResult | null
  submitStatus: 'idle' | 'loading' | 'success' | 'error'
  totalCategories: number
  setAnswer: (questionId: string, score: number) => void
  nextCategory: () => void
  prevCategory: () => void
  startQuiz: () => void
  restartQuiz: () => void
  isCategoryComplete: (categoryIndex: number) => boolean
  getRecommendations: () => Recommendation[]
}

function computeResult(answers: QuizAnswers): QuizResult {
  const categories: CategoryResult[] = quizCategories.map((cat) => {
    const score = cat.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
    const percentage = Math.round((score / MAX_SCORE_PER_CATEGORY) * 100)
    return {
      id: cat.id,
      title: cat.title,
      icon: cat.icon,
      color: cat.color,
      score,
      maxScore: MAX_SCORE_PER_CATEGORY,
      percentage,
      level: getLevelFromPercentage(percentage),
    }
  })

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0)
  const percentage = Math.round((totalScore / MAX_TOTAL_SCORE) * 100)

  return {
    totalScore,
    maxScore: MAX_TOTAL_SCORE,
    percentage,
    level: getLevelFromPercentage(percentage),
    categories,
  }
}

export function useQuiz(): UseQuizReturn {
  const [view, setView] = useState<ViewState>('hero')
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const totalCategories = quizCategories.length

  const setAnswer = useCallback((questionId: string, score: number): void => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
  }, [])

  const isCategoryComplete = useCallback(
    (categoryIndex: number): boolean => {
      const cat = quizCategories[categoryIndex]
      if (!cat) return false
      return cat.questions.every((q) => answers[q.id] !== undefined)
    },
    [answers]
  )

  const nextCategory = useCallback((): void => {
    if (currentCategoryIndex < totalCategories - 1) {
      setCurrentCategoryIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const computed = computeResult(answers)
      setResult(computed)
      setView('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })

      const payload: SubmitPayload = {
        form: 'business-assessment',
        answers,
        totalScore: computed.totalScore,
        percentage: computed.percentage,
        level: computed.level,
      }

      setSubmitStatus('loading')
      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json() as Promise<SubmitResponse>)
        .then((data) => {
          setSubmitStatus(data.ok ? 'success' : 'error')
        })
        .catch(() => {
          setSubmitStatus('error')
        })
    }
  }, [currentCategoryIndex, totalCategories, answers])

  const prevCategory = useCallback((): void => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((i) => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentCategoryIndex])

  const startQuiz = useCallback((): void => {
    setView('quiz')
    setCurrentCategoryIndex(0)
    setAnswers({})
    setResult(null)
    setSubmitStatus('idle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const restartQuiz = useCallback((): void => {
    setView('hero')
    setCurrentCategoryIndex(0)
    setAnswers({})
    setResult(null)
    setSubmitStatus('idle')
  }, [])

  const getRecommendations = useCallback((): Recommendation[] => {
    if (!result) return []
    const weakCategories = result.categories
      .filter((c) => c.percentage < 67)
      .sort((a, b) => a.percentage - b.percentage)
      .map((c) => c.id)

    return recommendations.filter((r) => weakCategories.includes(r.categoryId)).slice(0, 6)
  }, [result])

  return {
    view,
    currentCategoryIndex,
    answers,
    result,
    submitStatus,
    totalCategories,
    setAnswer,
    nextCategory,
    prevCategory,
    startQuiz,
    restartQuiz,
    isCategoryComplete,
    getRecommendations,
  }
}
