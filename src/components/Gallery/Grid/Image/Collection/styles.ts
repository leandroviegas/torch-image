import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backgroundColor: "#fff",
    color: "#565656",
  },
  dark: {
    backgroundColor: "#161616",
    color: "#c5c5c5",
  },
};

export const CollectionDropdown = styled.section`
  width: 100%;
  max-width: 400px;
  border-radius: 7px;
  margin: 30px auto;
  padding: 10px;
  height: 400px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
  z-index: 10;

  h1 {
    text-align: center;
    padding: 10px 0;
  }
  div {

    button {
      background: #f9ab3d;
      color: #ffffff;
      width: 100%;
      border: 1px solid #ff9f17;
      padding: 10px 0;
      font-size: 20px;
      font-weight: 700;

      &:hover {
        background: #ff9500;
        border: 1px solid #ff9500;
      }
    }
  }
`;
