export const theme = {
  colors: {
    background: '#F7F8FA',
    backgroundAlt: '#F3F4F8',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F4F8',
    surfaceSoft: '#F7F8FA',
    accent: '#2563EB',
    accentStrong: '#1D4ED8',
    accentSoft: '#EFF6FF',
    text: '#111827',
    muted: '#6B7280',
    mutedSoft: '#6B7280',
    border: '#E4E7EF',
    borderStrong: '#E4E7EF',
    white: '#FFFFFF',
    success: '#16A34A',
    danger: '#D92D20',
    shadow: 'rgba(15, 23, 42, 0.08)',
    shadowStrong: 'rgba(15, 23, 42, 0.14)',
  },
  fonts: {
    heading: "'Golos Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '12px',
    xl: '12px',
    xxl: '16px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(15,23,42,.05), 0 1px 2px rgba(15,23,42,.03)',
    md: '0 8px 24px rgba(15,23,42,.08), 0 2px 6px rgba(15,23,42,.03)',
    lg: '0 4px 24px rgba(15,23,42,.08), 0 1px 6px rgba(15,23,42,.04)',
    xl: '0 8px 24px rgba(15,23,42,.08), 0 2px 6px rgba(15,23,42,.03)',
  },
} as const;

export type Theme = typeof theme;
