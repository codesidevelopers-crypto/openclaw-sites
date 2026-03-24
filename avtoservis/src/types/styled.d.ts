import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string
      surface: string
      card: string
      border: string
      gold: string
      goldLight: string
      goldDim: string
      red: string
      redDim: string
      textPrimary: string
      textSecondary: string
      textMuted: string
    }
    fonts: {
      display: string
      body: string
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
