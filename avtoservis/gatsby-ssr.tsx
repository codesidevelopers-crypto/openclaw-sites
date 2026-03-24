import React from 'react'
import type { GatsbySSR } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { theme } from './src/styles/theme'
import { GlobalStyles } from './src/styles/GlobalStyles'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {element}
  </ThemeProvider>
)
