import React from 'react'
import { GatsbyBrowser } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { theme } from './src/styles/theme'
import { GlobalStyle } from './src/styles/GlobalStyle'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
)
