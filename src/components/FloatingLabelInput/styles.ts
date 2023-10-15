import styled from "styled-components";

export const ThemeStyles = {
  light: {
    color: "#535353",
    border: {
      borderColor: "#cecece",
      focus: {
        borderColor: "#000000",
      },
    },
  },
  dark: {
    color: "#e7e7e7",
    border: {
      borderColor: "#a4a4a4",
      focus: {
        borderColor: "#e7e7e7",
      },
    },
  },
};

export const FloatingLabelInput = styled.div`
  position: relative;
  padding-top: 13px;

  input,
  textarea {
    background-color: transparent;
    color: ${({ theme }) => theme.color};
    border: 0;
    border-bottom: 1.5px solid ${({ theme }) => theme.border.borderColor};
    outline: none;
    min-width: 180px;
    width: 100%;
    font-size: 14px;
    padding-bottom: 7px;
    padding-top: 7px;
    transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    -webkit-appearance: none;
    border-radius: 0;

    &:focus {
      border-bottom: 1.5px solid ${({ theme }) => theme.border.focus.borderColor};
    }

    &::placeholder {
      color: transparent;
    }

    &:required:invalid + label {
      color: red;
    }

    &:focus:required:invalid {
      border-bottom: 1.5px solid red;
    }

    &:required:invalid + label:before {
      content: "*";
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      font-size: 11px;
      margin-top: -2px;
    }
  }

  textarea {
    resize: vertical;
    border-radius: 5px;
    padding-left: 5px;
    border: 1.5px solid ${({ theme }) => theme.border.borderColor};
  }

  label {
    color: #757575;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
    margin-top: 14px;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
  }

  textarea + label {
    margin-top: 20px;
    margin-left: 5px;
  }

  textarea:focus + label,
  textarea:not(:placeholder-shown) + label {
      font-size: 11px;
      margin-top: -5px;
      margin-left: 0;
    }

  span {
    display: block;
    font-size: 12px;
    color: #595959;
    margin: 5px 0;
  }
`;
