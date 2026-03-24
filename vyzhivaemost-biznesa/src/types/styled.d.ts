import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string
      surface: string
      surface2: string
      surface3: string
      border: string
      borderStrong: string
      accent: string
      accentHover: string
      accentDim: string
      teal: string
      tealDim: string
      danger: string
      dangerDim: string
      warning: string
      warningDim: string
      text: string
      textSub: string
      textMuted: string
      textFaint: string
      overlay: string
    }
    fonts: {
      display: string
      mono: string
      body: string
    }
    radius: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    shadow: {
      sm: string
      md: string
      lg: string
      accent: string
      teal: string
    }
  }
}
