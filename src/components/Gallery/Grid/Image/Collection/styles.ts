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
  max-width: 600px;
  border-radius: 7px;
  margin: 30px auto;
  padding: 25px;
  min-height: 400px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
  z-index: 10;

  div {
    button.new-collection {
      cursor: pointer;
      background: #f9ab3d;
      color: #ffffff;
      width: 100%;
      border: 1px solid #ff9f17;
      padding: 15px 0;
      font-size: 20px;
      font-weight: 700;

      &:hover {
        background: #ff9500;
        border: 1px solid #ff9500;
      }
    }

    .separators {
      margin: 35px auto;
      margin-bottom: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;

      hr {
        width: 100%;
        border-top: 1px solid ${({ theme }) => theme.color};
      }

      span {
        font-size: 14px;
        color: ${({ theme }) => theme.color};
        position: relative;
        transform: translateY(-50%);
        background-color: ${({ theme }) => theme.backgroundColor};
        padding: 0 7px;
        margin: 0 auto;
      }
    }

    .collections {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-height: 400px;
      overflow-y: auto;

      .collection {
        display: flex;
        background: #00000010;

        .name {
          flex-grow: 3;
          display: flex;
          align-items: center;

          h2 {
            padding: 0 15px;
            font-size: 18px;
            vertical-align: middle;
            color: ${({ theme }) => theme.color};
            text-decoration: underline;

            &:hover {
              filter: brightness(0.8);
            }
          }
        }

        button {
          cursor: pointer;
          font-size: 20px;
          padding: 15px 20px;
          color: white;
          background: rgba(0, 0, 0, 0.8);

          &.selected {
            background-color: rgb(255, 157, 0); 
          }
        }
      }
    }
  }
`;
