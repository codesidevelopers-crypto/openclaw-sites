import React from 'react'
import { AppProvider, useApp } from '../context/AppContext'
import { LandingScreen } from '../components/screens/LandingScreen'
import { UploadScreen } from '../components/screens/UploadScreen'
import { QuestionnaireScreen } from '../components/screens/QuestionnaireScreen'
import { ProcessingScreen } from '../components/screens/ProcessingScreen'
import { DashboardScreen } from '../components/screens/DashboardScreen'

const AppRouter: React.FC = () => {
  const { currentScreen } = useApp()

  switch (currentScreen) {
    case 'landing':       return <LandingScreen />
    case 'upload':        return <UploadScreen />
    case 'questionnaire': return <QuestionnaireScreen />
    case 'processing':    return <ProcessingScreen />
    case 'dashboard':     return <DashboardScreen />
    default:              return <LandingScreen />
  }
}

const IndexPage: React.FC = () => (
  <AppProvider>
    <AppRouter />
  </AppProvider>
)

export default IndexPage

export const Head: React.FC = () => (
  <>
    <title>Диагностика денежной устойчивости бизнеса</title>
    <meta name="description" content="Бесплатная диагностика: на сколько хватит денег, где риск кассовых разрывов, что давит на бизнес." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="Диагностика денежной устойчивости бизнеса" />
    <meta property="og:description" content="Загрузите банковские выписки — получите полный анализ финансовой устойчивости за минуты." />
  </>
)
