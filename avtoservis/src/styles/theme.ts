import type { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    bg: '#07090B',
    surface: '#0D1117',
    card: '#141920',
    border: '#1E2630',
    gold: '#C9A227',
    goldLight: '#E8C25A',
    goldDim: 'rgba(201, 162, 39, 0.15)',
    red: '#E83A2A',
    redDim: 'rgba(232, 58, 42, 0.15)',
    textPrimary: '#F0EBE3',
    textSecondary: '#A8B5C4',
    textMuted: '#5A6878',
  },
  fonts: {
    display: "'Unbounded', sans-serif",
    body: "'Mulish', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}
