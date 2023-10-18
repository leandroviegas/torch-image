import styled from "styled-components";

interface NavbarProps {
  isIndex: boolean;
}
export const ThemeStyles = {
  light: {
    color: "#707070",
    hover: {
      color: "#141414",
    },
  },
  dark: {
    color: "#dcdcdc",
    hover: {
      color: "#b7b7b7",
    },
  },
};
export const Navbar = styled.nav<NavbarProps>`
  padding: ${({ isIndex }) => (isIndex ? `30px 0` : `15px 0`)};
  width: 100%;
  flex-shrink: 0;
  border-bottom: ${({ isIndex }) => (isIndex ? `0px` : `1.5px solid #dfdfdf`)};

  & > div {
    display: flex;
    justify-content: space-between;
  }

  & > div > div {
    margin: auto 15px;
  }

  & .search {
    width: 100%;
    max-width: 500px;

    form {
      width: 100%;
      background-color: #f0f0f0;
      border-radius: 5px;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        background-color: #f0f0f0;
        font-weight: 500;
        color: #545454;
        font-size: 16px;
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
      }

      input::placeholder {
        color: #afafaf;
      }

      button {
        display: flex;
        align-items: center;
        background-color: #ff9500;
        color: white;
        padding: 8px;
        border-radius: 5px;
      }
    }
  }

  & .logo {
    color: white;
    font-size: 25px;
    -webkit-filter: drop-shadow(2px 2px 0 white) drop-shadow(-2px 2px 0 white)
      drop-shadow(2px -2px 0 white) drop-shadow(-2px -2px 0 white);
    filter: drop-shadow(2px 2px 0 white) drop-shadow(-2px 2px 0 white)
      drop-shadow(2px -2px 0 white) drop-shadow(-2px -2px 0 white);
  }

  & .nav-list {
    display: flex;
    justify-items: center;
    gap: 30px;

    li {
      align-self: center;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
    }

    a,
    button,
    span,
    svg {
      font-size: 15px;
      text-decoration: none;
      color: ${({ isIndex, theme }) => (isIndex ? "#f0f0f0" : theme.color)};
      font-weight: ${({ isIndex }) => (isIndex ? "600" : "500")};
      background-color: #00000000;
      cursor: pointer;

      &:hover {
        color: ${({ isIndex, theme }) =>
          isIndex ? "#fff" : theme.hover.color};
      }
    }

    button.register {
      background: #ff9500;
      padding: 10px 20px;
      color: white;
      font-size: 17px;
      font-weight: 600;
      border: none;
      border-radius: 7px;
    }

    .profilePicture {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  .dropdown-menu {
    position: absolute;
    right: 0;
    height: auto;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 10px;

    button {
      font-size: 12px;
      padding: 7px 12px;
      color: #818181;
      white-space: nowrap;

      &.empty {
        opacity: 0.5;
        color: #818181;
      }

      &:hover {
        color: #2a2a2a;
      }
    }
  }
`;
