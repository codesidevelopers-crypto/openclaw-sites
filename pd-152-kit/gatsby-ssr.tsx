import React from 'react';
import type { GatsbySSR } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/styles/theme';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);
