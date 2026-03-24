import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  #gatsby-focus-wrapper, #___gatsby {
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: none;
    &:hover { opacity: 0.8; }
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: ${({ theme }) => theme.fonts.body};
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: 12px 16px;
    font-size: 16px;
    outline: none;
    width: 100%;
    transition: border-color 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.blue};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.mutedDark};
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.cardBorder};
    border-radius: 3px;
  }
`
