import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string
      bgDeep: string
      bgCard: string
      bgCardHover: string
      accent: string
      accentDark: string
      accentLight: string
      text: string
      textMuted: string
      textDim: string
      border: string
      borderGold: string
      success: string
      error: string
    }
    fonts: {
      heading: string
      body: string
    }
    fontSizes: {
      xs: string
      sm: string
      base: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
      '5xl': string
      '6xl': string
    }
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      section: string
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    transitions: {
      fast: string
      base: string
      slow: string
    }
    shadows: {
      card: string
      gold: string
      goldStrong: string
    }
  }
}
