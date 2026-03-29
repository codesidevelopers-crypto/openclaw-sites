import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/styles/theme";
import { GlobalStyle } from "./src/styles/GlobalStyle";

type Props = {
  element: React.ReactNode;
};

export const WrapRootElement: React.FC<Props> = ({ element }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {element}
  </ThemeProvider>
);
