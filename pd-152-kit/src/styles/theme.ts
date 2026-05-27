export const theme = {
  colors: {
    background: '#F5F8FC',
    surface: '#EEF4FB',
    accent: '#4677FF',
    text: '#0F1726',
    muted: '#5B6577',
    border: '#D9E2F0',
    white: '#FFFFFF',
    success: '#14B86A',
    danger: '#D92D20',
  },
  fonts: {
    heading: "'Golos Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  radius: {
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
    full: '9999px',
  },
  shadow: {
    sm: '0 8px 20px rgba(15, 23, 38, 0.04)',
    md: '0 18px 40px rgba(15, 23, 38, 0.08)',
    lg: '0 28px 60px rgba(15, 23, 38, 0.12)',
  },
} as const;

export type Theme = typeof theme;
