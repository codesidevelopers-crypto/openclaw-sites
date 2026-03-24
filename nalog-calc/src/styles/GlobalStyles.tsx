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

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 1.2;
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 100%;

    &::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 3px;
      background: ${({ theme }) => theme.colors.border};
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.accent};
      margin-top: -8px;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentDim};
      transition: box-shadow 0.2s ease;
    }

    &:hover::-webkit-slider-thumb,
    &:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 6px ${({ theme }) => theme.colors.accentDim};
    }

    &::-moz-range-track {
      height: 6px;
      border-radius: 3px;
      background: ${({ theme }) => theme.colors.border};
    }

    &::-moz-range-thumb {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.accent};
      border: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentDim};
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accentDim};
    color: ${({ theme }) => theme.colors.accent};
  }
`

export default GlobalStyles
