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
    actions: {
      button: {
        color: "#525151",
        hover: {
          color: "#595959",
        },
      },
    },
  },
  dark: {
    backgroundColor: "#141414",
    input: {
      color: "#e9e9e9",
      placeholder: {
        color: "#838383",
      },
    },
    actions: {
      button: {
        color: "#bababa",
        hover: {
          color: "#dedede",
        },
      },
    },
  },
};

const Form = styled.form`
  &.comment {
    margin: 12px;

    > div {
      background-color: ${({ theme }) => theme.backgroundColor};
      padding: 10px;
      border-radius: 4px;

      textarea {
        width: 100%;
        padding: 5px 0;
        color: ${({ theme }) => theme.input.color};
        background-color: transparent;
        border-color: transparent;
        font-size: 15px;
        font-weight: 500;
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
          font-weight: 400;
          font-size: 16px;
          background-color: transparent;
          color: ${({ theme }) => theme.actions.button.color};

          :hover {
            color: ${({ theme }) => theme.actions.button.hover.color};
          }
        }
      }
    }
  }
  &.reply {
    margin-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.input.color}44;
    padding-top: 15px;

    > div {
      background-color: ${({ theme }) => theme.backgroundColor};

      textarea {
        width: 100%;
        padding: 5px 0;
        color: ${({ theme }) => theme.input.color};
        background-color: transparent;
        border-color: transparent;
        font-size: 13px;
        font-weight: 500;
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
          font-weight:600;
          font-size: 13px;
          background-color: transparent;
          color: ${({ theme }) => theme.actions.button.color};

          :hover {
            color: ${({ theme }) => theme.actions.button.hover.color};
          }
        }
      }
    }
  }
`;

export default Form;
