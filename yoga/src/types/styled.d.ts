import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string
      bgCard: string
      bgSection: string
      bgLight: string
      bgLightCard: string
      accent: string
      accentDark: string
      accentLight: string
      sage: string
      sageDark: string
      text: string
      textMuted: string
      textDark: string
      textDarkMuted: string
      border: string
      borderLight: string
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
      cardLight: string
    }
    transitions: {
      fast: string
      normal: string
      slow: string
    }
  }
}
