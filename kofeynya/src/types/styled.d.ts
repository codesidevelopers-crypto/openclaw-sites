import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string
      bgCard: string
      bgSection: string
      accent: string
      accentDark: string
      accentLight: string
      text: string
      textMuted: string
      textLight: string
      border: string
      success: string
      error: string
    }
    fonts: {
      heading: string
      body: string
    }
    radii: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    shadows: {
      card: string
      glow: string
    }
    transitions: {
      fast: string
      normal: string
    }
  }
}
