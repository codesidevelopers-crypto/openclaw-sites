import 'styled-components'

export const theme = {
  colors: {
    bg: '#0a0a0f',
    bgCard: '#12121a',
    bgInput: '#1a1a26',
    primary: '#6c63ff',
    primaryLight: '#8b85ff',
    primaryDark: '#4d47cc',
    accent: '#ff6584',
    accentGreen: '#00d9a3',
    accentOrange: '#ff9f43',
    accentYellow: '#ffd32a',
    text: '#f0f0f8',
    textSecondary: '#9090b0',
    textMuted: '#5a5a78',
    border: '#2a2a3a',
    borderLight: '#3a3a50',
    success: '#00d9a3',
    warning: '#ff9f43',
    error: '#ff6584',
    gradientPrimary: 'linear-gradient(135deg, #6c63ff 0%, #ff6584 100%)',
    gradientBg: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)',
  },
  fonts: {
    heading: "'Manrope', sans-serif",
    body: "'Inter', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '4rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  radii: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    xl: '32px',
    full: '9999px',
  },
  shadows: {
    card: '0 4px 24px rgba(0,0,0,0.4)',
    glow: '0 0 40px rgba(108, 99, 255, 0.3)',
    glowAccent: '0 0 40px rgba(255, 101, 132, 0.3)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
