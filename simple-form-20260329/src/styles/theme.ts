export const theme = {
  colors: {
    bg: "#ffffff",
    surface: "#f7f8fa",
    text: "#111111",
    muted: "#6b7280",
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    border: "#e5e7eb",
    errorText: "#dc2626",
    successText: "#16a34a",
  },
  font: {
    family:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    size: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.625rem",
      xxl: "2rem",
    },
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      tight: 1.25,
      base: 1.6,
    },
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  shadow: {
    card: "0 1px 4px rgba(0,0,0,0.06), 0 6px 24px rgba(0,0,0,0.07)",
  },
} as const;

export type Theme = typeof theme;
