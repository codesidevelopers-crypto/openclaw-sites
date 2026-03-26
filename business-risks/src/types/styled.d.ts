import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string
      bgDeep: string
      surface: string
      surface2: string
      border: string
      borderGold: string
      gold: string
      goldLight: string
      goldDim: string
      white: string
      text: string
      textSub: string
      textMuted: string
      danger: string
      warning: string
      success: string
    }
    fonts: {
      serif: string
      sans: string
      narrow: string
    }
    shadow: {
      gold: string
      card: string
    }
  }
}
