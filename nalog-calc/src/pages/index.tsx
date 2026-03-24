import React, { useState } from 'react'
import type { HeadFC } from 'gatsby'
import type { Screen, FormData, CalculationResult } from '../types'
import LandingPage from '../components/LandingPage'
import Questionnaire from '../components/Questionnaire'
import Results from '../components/Results'
import { calculateTaxes } from '../engine/tax-calculator'

const IndexPage: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('landing')
  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null)

  const handleStart = (): void => {
    setScreen('quiz')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleComplete = (data: FormData): void => {
    const result = calculateTaxes(data)
    setCalcResult(result)
    setScreen('results')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleRecalc = (): void => {
    setScreen('quiz')
    setCalcResult(null)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBackToLanding = (): void => {
    setScreen('landing')
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (screen === 'quiz') {
    return (
      <Questionnaire
        onBack={handleBackToLanding}
        onComplete={handleComplete}
      />
    )
  }

  if (screen === 'results' && calcResult !== null) {
    return (
      <Results
        result={calcResult}
        onRecalc={handleRecalc}
      />
    )
  }

  return <LandingPage onStart={handleStart} />
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>НалогКалькулятор — выберите лучший налоговый режим для ИП и ООО</title>
    <meta name="description" content="Бесплатный калькулятор налогов для ИП и ООО. Сравните УСН 6%, УСН 15%, Патент и ОСНО. Узнайте сколько платить и как сэкономить. Актуальные данные 2025 года." />
    <meta name="keywords" content="калькулятор налогов, УСН, ОСНО, патент, ИП, ООО, налоговый режим, 2025" />
    <meta property="og:title" content="НалогКалькулятор — выберите лучший налоговый режим" />
    <meta property="og:description" content="Бесплатно, без регистрации. 6 вопросов — полное сравнение режимов с расчётами." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
