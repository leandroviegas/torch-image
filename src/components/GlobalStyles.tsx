import { createGlobalStyle } from "styled-components";

export interface GlobalStylesProps {
  body: {
    bgColor: string;
  };
}

export const ThemeStyles = {
  light: {
    body: {
      bgColor: "#fff",
    },
  },
  dark: {
    body: {
      bgColor: "#1f1f1f",
    },
  },
};

export const GlobalStyles = createGlobalStyle<{theme: GlobalStylesProps}>`
  body {
    height: 100vh;
    background: ${({ theme }) => theme.body.bgColor};
    transition: all 0.20s linear;
  }
  `;
