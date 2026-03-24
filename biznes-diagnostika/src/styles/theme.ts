import 'styled-components'

export const theme = {
  colors: {
    bg: '#0B1120',
    card: '#111827',
    cardHover: '#1a2235',
    cardBorder: '#1f2d45',
    blue: '#3B82F6',
    blueLight: '#60A5FA',
    green: '#10B981',
    amber: '#F59E0B',
    red: '#EF4444',
    white: '#F9FAFB',
    muted: '#9CA3AF',
    mutedDark: '#6B7280',
    surface: '#1a2235',
  },
  fonts: {
    body: "'DM Sans', sans-serif",
    display: "'Syne', sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  shadow: {
    card: '0 4px 24px rgba(0,0,0,0.4)',
    glow: '0 0 24px rgba(59,130,246,0.15)',
    glowGreen: '0 0 24px rgba(16,185,129,0.15)',
  },
} as const

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
