import React, { useEffect } from 'react'
import type { HeadFC } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyle } from '../styles/GlobalStyle'
import { useApp } from '../context/AppContext'
import type { UtmParams } from '../context/AppContext'
import { Screen1Landing } from '../components/Screen1Landing'
import { Screen2Upload } from '../components/Screen2Upload'
import { Screen3Questionnaire } from '../components/Screen3Questionnaire'
import { Screen4Processing } from '../components/Screen4Processing'
import { Screen5Dashboard } from '../components/Screen5Dashboard'

export const Head: HeadFC = () => (
  <>
    <title>Диагностика денежной устойчивости бизнеса</title>
    <meta name="description" content="Узнайте на сколько хватит денег, где риск кассовых разрывов и какой запас держать." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
  </>
)

function App(): JSX.Element {
  const { state, setUtm } = useApp()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sp = new URLSearchParams(window.location.search)
    const params: UtmParams = {
      utm_source: sp.get('utm_source') ?? sessionStorage.getItem('utm_source') ?? '',
      utm_medium: sp.get('utm_medium') ?? sessionStorage.getItem('utm_medium') ?? '',
      utm_campaign: sp.get('utm_campaign') ?? sessionStorage.getItem('utm_campaign') ?? '',
      utm_content: sp.get('utm_content') ?? sessionStorage.getItem('utm_content') ?? '',
      utm_term: sp.get('utm_term') ?? sessionStorage.getItem('utm_term') ?? '',
      utm_id: sp.get('utm_id') ?? sessionStorage.getItem('utm_id') ?? '',
      referrer: document.referrer || sessionStorage.getItem('referrer') || '',
    }

    // Persist to sessionStorage
    Object.entries(params).forEach(([k, v]) => {
      if (v) sessionStorage.setItem(k, v)
    })

    setUtm(params)
  }, [setUtm])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {state.screen === 'landing' && <Screen1Landing />}
      {state.screen === 'upload' && <Screen2Upload />}
      {state.screen === 'questionnaire' && <Screen3Questionnaire />}
      {state.screen === 'processing' && <Screen4Processing />}
      {state.screen === 'dashboard' && <Screen5Dashboard />}
    </ThemeProvider>
  )
}

export default App
