import React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/styles/theme';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);
