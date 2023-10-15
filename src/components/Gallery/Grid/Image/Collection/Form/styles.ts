import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backButton: {
      color: "#565656",
    },
  },
  dark: {
    backButton: {
      color: "#c5c5c5",
    },
  },
};

const CollectionForm = styled.form`
  .header {
    display: flex;
    justify-content: space-between;

    button.back {
      cursor: pointer;
      display: flex;
      gap: 5px;
      align-items: center;
      background: #00000000;
      font-size: 18px;
      padding: 5px 0;
      color: ${({ theme }) => theme.backButton.color};
    }

    h1.title {
      font-size: 20px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    gap: 30px;
  }

  hr {
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.color};
    margin-top: 15px;
  }
`;

export default CollectionForm;
