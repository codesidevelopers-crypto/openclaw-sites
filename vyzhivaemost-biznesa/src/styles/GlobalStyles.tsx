import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accentDim};
    color: ${({ theme }) => theme.colors.accent};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.bg}; }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
    &:hover { background: ${({ theme }) => theme.colors.borderStrong}; }
  }

  /* Grid overlay (decorative) */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.25;
    pointer-events: none;
    z-index: 0;
  }

  #gatsby-focus-wrapper {
    position: relative;
    z-index: 1;
  }
`

export default GlobalStyles
