import type { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    bg: '#07090F',
    surface: '#0D1219',
    surface2: '#111B28',
    surface3: '#172034',
    border: '#1C2840',
    borderStrong: '#2A3D5A',
    accent: '#E8A020',
    accentHover: '#F5B340',
    accentDim: 'rgba(232, 160, 32, 0.12)',
    teal: '#00B4A0',
    tealDim: 'rgba(0, 180, 160, 0.12)',
    danger: '#E8453C',
    dangerDim: 'rgba(232, 69, 60, 0.12)',
    warning: '#F0A030',
    warningDim: 'rgba(240, 160, 48, 0.12)',
    text: '#DDE5F0',
    textSub: '#9BAAC0',
    textMuted: '#60748A',
    textFaint: '#3A4D60',
    overlay: 'rgba(7, 9, 15, 0.85)',
  },
  fonts: {
    display: "'Raleway', sans-serif",
    mono: "'JetBrains Mono', monospace",
    body: "'Nunito', sans-serif",
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '20px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.4)',
    md: '0 4px 16px rgba(0,0,0,0.5)',
    lg: '0 8px 32px rgba(0,0,0,0.6)',
    accent: '0 0 24px rgba(232, 160, 32, 0.25)',
    teal: '0 0 24px rgba(0, 180, 160, 0.25)',
  },
}
