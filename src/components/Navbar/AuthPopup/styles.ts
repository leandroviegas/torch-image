import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backgroundColor: "#fff",
    separators: {
      color: "#747474",
    },
    tabButtons: {
      color: "#565656",
      borderColor: "#e3e3e3",
      backgroundColor: "#00000000",
    },
    socialAuth: {
      google: {
        color: "##565656",
        backgroundColor: "#f4f4f4",
        hover: {
          backgroundColor: "#ebebeb",
        },
      },
    },
  },
  dark: {
    backgroundColor: "#131313",
    separators: {
      color: "#fff",
    },
    tabButtons: {
      color: "#d5d5d5",
      borderColor: "#e3e3e300",
      backgroundColor: "#000",
    },
    socialAuth: {
      google: {
        color: "white",
        backgroundColor: "#090808",
        hover: {
          backgroundColor: "#1d1d1d",
        },
      },
    },
  },
};

export const AuthPopup = styled.div`
  width: 100vw;
  max-width: 760px;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 5px;
  padding: 30px;
  margin: 40px auto;

  .separators {
    margin: 35px auto;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    hr {
      width: 100%;
      border-top: 1px solid #e5e7eb;
    }

    span {
      font-size: 12px;
      color: ${({ theme }) => theme.separators.color};
      position: relative;
      transform: translateY(-50%);
      background-color: ${({ theme }) => theme.backgroundColor};
      padding: 0 7px;
      margin: 0 auto;
    }
  }

  .tab-buttons {
    display: flex;
    flex-wrap: nowrap;
    border-radius: 10px;

    button {
      width: 100%;
      padding: 20px 0;
      background: ${({ theme }) => theme.tabButtons.backgroundColor};
      font-size: 15px;
      font-weight: 600;
      color: ${({ theme }) => theme.tabButtons.color};
      transition: all 0.2s;
      border: 1px solid ${({ theme }) => theme.tabButtons.borderColor};
    }

    button.active {
      background: #ff9500;
      color: white;
      border: 1px solid #ff9500;
    }

    button:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-right: 0;
    }
    button:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-left: 0;
    }
  }

  div .sign-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    hr {
      border-top: 1px solid #e3e3e3;
    }

    button.sign {
      margin-top: 30px;
      padding: 20px 0;
      font-size: 15px;
      font-weight: 600;
      background: #ff9500;
      color: white;
      transition: all 0.2s;
      border-radius: 10px;
    }
  }

  .social-auth {
    width: 100%;
    display: flex;
    justify-content: center;

    button.google-auth {
      background-color: ${({ theme }) =>
        theme.socialAuth.google.backgroundColor};
      color: ${({ theme }) => theme.socialAuth.google.color};
      display: flex;
      justify-content: center;
      font-weight: 600;
      gap: 8px;
      border: 1px solid #e3e3e3;
      width: 100%;
      max-width: 300px;
      font-size: 17px;
      padding: 10px 7px;
      border-radius: 7px;
      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) =>
          theme.socialAuth.google.hover.backgroundColor};
      }
    }
  }
`;
