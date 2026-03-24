import type { DefaultTheme } from 'styled-components'

export const theme = {
  colors: {
    bg: '#060A12',
    bgCard: '#0D1521',
    bgCardHover: '#111E30',
    border: '#1C2B40',
    borderHover: '#2A3F5A',
    primary: '#FF4D6D',
    primaryDark: '#CC3455',
    primaryGlow: 'rgba(255, 77, 109, 0.25)',
    accent: '#FFC93C',
    accentGlow: 'rgba(255, 201, 60, 0.2)',
    teal: '#00D2C1',
    tealGlow: 'rgba(0, 210, 193, 0.2)',
    success: '#2EC47E',
    successGlow: 'rgba(46, 196, 126, 0.2)',
    warning: '#F9A825',
    warningGlow: 'rgba(249, 168, 37, 0.2)',
    danger: '#E53935',
    dangerGlow: 'rgba(229, 57, 53, 0.2)',
    textPrimary: '#E2EAF8',
    textSecondary: '#6B7C93',
    textMuted: '#3D4F67',
    white: '#FFFFFF',
    // category colors
    finance: '#FFC93C',
    marketing: '#FF4D6D',
    operations: '#00D2C1',
    customers: '#A78BFA',
    strategy: '#2EC47E',
  },
  fonts: {
    heading: "'Raleway', sans-serif",
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
    '6xl': '3.75rem',
    '7xl': '4.5rem',
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
    card: '0 4px 24px rgba(0, 0, 0, 0.4)',
    cardHover: '0 8px 40px rgba(0, 0, 0, 0.6)',
    glow: '0 0 30px rgba(255, 77, 109, 0.3)',
    accentGlow: '0 0 30px rgba(255, 201, 60, 0.25)',
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

// Satisfy the DefaultTheme constraint
const _check: DefaultTheme = theme
void _check
