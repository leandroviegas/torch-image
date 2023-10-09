import { createGlobalStyle } from "styled-components";

export interface GlobalStylesProps {
  body: {
    bgColor: string;
  };
  scrollbar: {
    color: string;
    hover: {
      color: string;
    };
  }
}

export const ThemeStyles = {
  light: {
    body: {
      bgColor: "#fff",
    },
    scrollbar: {
      color: "#c7c7c7",
      hover: {
        color: "#b0b0b0",
      },
    },
  },
  dark: {
    body: {
      bgColor: "#1f1f1f",
    },
    scrollbar: {
      color: "#090909",
      hover: {
        color: "#000000",
      },
    },
  },
};

export const GlobalStyles = createGlobalStyle<{ theme: GlobalStylesProps }>`
  body {
    height: 100vh;
    background: ${({ theme }) => theme.body.bgColor};
    transition: all 0.20s linear;
  }

  .styled-scroll {
    /* width */
    ::-webkit-scrollbar {
            width: 10px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            border-radius: 10px;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: ${({ theme }) => theme.scrollbar.color};
            border-radius: 10px;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: ${({ theme }) => theme.scrollbar.hover.color};
          }
  }
  `;
