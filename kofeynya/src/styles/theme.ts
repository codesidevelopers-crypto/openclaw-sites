import type { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    bg: '#0F0600',
    bgCard: '#1E0F04',
    bgSection: '#160900',
    accent: '#C8831A',
    accentDark: '#A06010',
    accentLight: '#F0A830',
    text: '#F5ECD7',
    textMuted: '#9E8060',
    textLight: '#D4B896',
    border: '#3A1E08',
    success: '#4CAF50',
    error: '#E53935',
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', -apple-system, sans-serif",
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
  },
  shadows: {
    card: '0 4px 32px rgba(0,0,0,0.5)',
    glow: '0 0 40px rgba(200,131,26,0.25)',
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
  },
}
