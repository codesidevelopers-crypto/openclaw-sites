import React from 'react'
import type { GatsbySSR } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { theme } from './src/styles/theme'
import { GlobalStyle } from './src/styles/GlobalStyle'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
)
