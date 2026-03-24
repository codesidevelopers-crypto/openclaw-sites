import type { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    bg: '#0D1A0D',
    bgCard: '#111F11',
    bgSection: '#0A140A',
    bgLight: '#F8F3EC',
    bgLightCard: '#F0EAE0',
    accent: '#B8955A',
    accentDark: '#8A6A38',
    accentLight: '#D4B080',
    sage: '#7A9E7E',
    sageDark: '#5A7A5E',
    text: '#F8F3EC',
    textMuted: '#8A9E8A',
    textDark: '#1A2A1A',
    textDarkMuted: '#4A6A4A',
    border: '#1E3020',
    borderLight: '#D8CFC0',
    success: '#5A9E6A',
    error: '#C05050',
  },
  fonts: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Jost', -apple-system, sans-serif",
  },
  radii: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '16px',
  },
  shadows: {
    card: '0 8px 48px rgba(0,0,0,0.4)',
    glow: '0 0 60px rgba(184,149,90,0.15)',
    cardLight: '0 4px 32px rgba(0,0,0,0.08)',
  },
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '600ms ease',
  },
}
