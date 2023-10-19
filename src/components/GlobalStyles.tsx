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
  };
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
    overflow-y: hidden;
  }
  
  .Toastify__toast-body{
    white-space: pre-line;
  }

  #main-body{
    height: 100vh;
    overflow-y: auto;
  }

  .loading {
    grid-column: span 12 / span 12;
    color: #7b7b7b;
    padding: 80px 0;
    display: flex;
    justify-content: center;

    svg {
      width: 70px;
      height: 70px;
      animation: spin 1.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
    }

    @keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
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
