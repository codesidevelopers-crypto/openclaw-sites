import type { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    bg: '#0A1628',
    bgDeep: '#060E1A',
    surface: '#0F1E36',
    surface2: '#162240',
    border: 'rgba(255,255,255,0.08)',
    borderGold: 'rgba(201,168,76,0.4)',
    gold: '#C9A84C',
    goldLight: '#E4C46E',
    goldDim: 'rgba(201,168,76,0.15)',
    white: '#FFFFFF',
    text: '#E8E4DC',
    textSub: '#A8A098',
    textMuted: '#6B6560',
    danger: '#C94C4C',
    warning: '#C98A4C',
    success: '#4CC97A',
  },
  fonts: {
    serif: "'PT Serif', Georgia, serif",
    sans: "'PT Sans', 'Helvetica Neue', sans-serif",
    narrow: "'PT Sans Narrow', 'PT Sans', sans-serif",
  },
  shadow: {
    gold: '0 0 24px rgba(201,168,76,0.25)',
    card: '0 8px 32px rgba(0,0,0,0.4)',
  },
}
