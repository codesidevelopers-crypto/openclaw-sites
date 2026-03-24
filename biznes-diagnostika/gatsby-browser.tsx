import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { AppProvider } from './src/context/AppContext'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <AppProvider>{element}</AppProvider>
}
