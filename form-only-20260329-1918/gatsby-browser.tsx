import React from 'react';
import { ThemeProvider } from 'styled-components';
import type { GatsbyBrowser } from 'gatsby';
import theme from './src/styles/theme';
import GlobalStyle from './src/styles/GlobalStyle';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
);
