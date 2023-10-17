import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backgroundColor: "#fff",
    input: {
      color: "#3b3b3b",
      placeholder: {
        color: "#7c7c7c",
      },
    },
    actions:{
      button: {
        color: "#525151",
        hover: {
          color: "#595959",
        },
      },
    }
  },
  dark: {
    backgroundColor: "#0a0a0a",
    input: {
      color: "#fff",
      placeholder: {
        color: "#838383",
      },
    },
    actions:{
      button: {
        color: "#bababa",
        hover: {
          color: "#dedede",
        },
      },
    }
  },
};

const Form = styled.form`
  margin: 12px;

  > div {
    background-color: ${({ theme }) => theme.backgroundColor};
    padding: 10px;

    textarea {
      width: 100%;
      padding: 5px 0;
      color: ${({ theme }) => theme.input.color};
      background-color: transparent;
      border-color: transparent;
      font-size: 15px;
      outline: none;
      resize: none;

      ::placeholder {
        color: ${({ theme }) => theme.input.placeholder.color};
      }
    }

    .actions {
      margin: 10px 0;
      display: flex;

      button {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        background-color: transparent;
        color: ${({ theme }) => theme.actions.button.color};

        :hover {
          color: ${({ theme }) => theme.actions.button.hover.color};
        }
      }
    }
  }
`;

export default Form;
