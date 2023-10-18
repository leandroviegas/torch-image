import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backgroundColor: "#fff",
    color: "#565656",
    actionButtons: {
      color: "#565656",
      hover: {
        color: "#0a0a0a",
        borderColor: "#0a0a0a",
      },
    },
  },
  dark: {
    backgroundColor: "#141414",
    color: "#c5c5c5",
    actionButtons: {
      color: "#c5c5c5",
      hover: {
        color: "#fff",
        borderColor: "#fff",
      },
    },
  },
};

export const Comment = styled.div`
  margin: 10px;
  padding: 13px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundColor};

  .header {
    width: 100%;
    gap: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    .user-info {
      display: flex;
      gap: 8px;
      align-items: center;

      .avatar {
        img {
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

    .action-buttons {
      button.delete {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        background: #00000000;
        color: ${({ theme }) => theme.actionButtons.color};
        border: 0;
        font-size: 13px;
      }
    }
  }

  .content {
    padding: 13px 0;
    p {
      color: ${({ theme }) => theme.color};
      font-size: 13px;
    }
    
    span.edited {
      color: ${({ theme }) => theme.color};
      opacity: 0.4;
      font-size: 11px;
      padding-left: 5px;
    }

    span.deleted {
      color: ${({ theme }) => theme.color};
      opacity: 0.4;
      font-size: 11px;
    }

    textarea {
        width: 100%;
        padding: 5px 0;
        color: ${({ theme }) => theme.color};
        background-color: transparent;
        border-color: transparent;
        font-size: 13px;
        font-weight: 500;
        outline: none;
        resize: none;

        ::placeholder {
        color: ${({ theme }) => theme.color};
        opacity: 0.5;
        }
      }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 15px;
    
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

      :hover {
        color: ${({ theme }) => theme.actionButtons.hover.color};
      }
    }
  }
`;
