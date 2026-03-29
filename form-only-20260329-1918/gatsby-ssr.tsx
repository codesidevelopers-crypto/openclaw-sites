import React from 'react';
import { ThemeProvider } from 'styled-components';
import type { GatsbySSR } from 'gatsby';
import theme from './src/styles/theme';
import GlobalStyle from './src/styles/GlobalStyle';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
);
