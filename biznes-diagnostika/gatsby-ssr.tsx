import React from 'react'
import type { GatsbySSR } from 'gatsby'
import { AppProvider } from './src/context/AppContext'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <AppProvider>{element}</AppProvider>
}
