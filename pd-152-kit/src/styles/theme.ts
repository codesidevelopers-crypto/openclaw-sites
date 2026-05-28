export const theme = {
  colors: {
    background: '#F7F8FC',
    backgroundAlt: '#F2F5FB',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF3FF',
    surfaceSoft: '#F8FAFF',
    accent: '#315EFB',
    accentStrong: '#2547C7',
    accentSoft: '#E8EEFF',
    text: '#0F172A',
    muted: '#526074',
    mutedSoft: '#6B7285',
    border: '#DCE4F2',
    borderStrong: '#CAD6EA',
    white: '#FFFFFF',
    success: '#14B86A',
    danger: '#D92D20',
    shadow: 'rgba(15, 23, 42, 0.08)',
    shadowStrong: 'rgba(15, 23, 42, 0.14)',
  },
  fonts: {
    heading: "'Golos Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  radius: {
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '28px',
    xxl: '36px',
    full: '9999px',
  },
  shadow: {
    sm: '0 10px 24px rgba(15, 23, 42, 0.04)',
    md: '0 18px 40px rgba(15, 23, 42, 0.07)',
    lg: '0 28px 72px rgba(15, 23, 42, 0.10)',
    xl: '0 36px 84px rgba(15, 23, 42, 0.14)',
  },
} as const;

export type Theme = typeof theme;
