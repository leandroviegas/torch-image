import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backgroundColor: "#fff",
    color: "#565656",
    actionButtons: {
      color: "#565656",
      hover: {
        color: "#000",
        borderColor: "#000",
      },
    }
  },
  dark: {
    backgroundColor: "#000",
    color: "#c5c5c5",
    actionButtons: {
      color: "#c5c5c5",
      hover: {
        color: "#fff",
        borderColor: "#fff",
      },
    }
  }
}

export const Comment = styled.div`
  margin: 10px;
  padding: 13px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundColor};

  .header {
    display: inline-flex;
    gap: 8px;
    align-items: center;

    .avatar {
      img {
        width: 25px;
        height: 25px;
        border: 0;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    > div {
      display: inline-flex;
      align-items: end;
      gap: 10px;

      .username {
        font-weight: 600;
        color: ${({ theme }) => theme.color};
        font-size: 13px;
      }

      .date {
        color: #a3a3ab;
        font-size: 12px;
      }
    }
  }

  .content {
    padding: 13px 0;
    p {
      color: ${({ theme }) => theme.color};
      font-size: 13px;
    }
  }

  .actions {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;
      gap: 5px;
      background-color: #00000000;
      border: 0;
      font-weight: 600;
      color: ${({ theme }) => theme.actionButtons.color};
      font-size: 13px;
      cursor: pointer;

      :hover{
        color: ${({ theme }) => theme.actionButtons.hover.color};
      }
    }
  }
`;
