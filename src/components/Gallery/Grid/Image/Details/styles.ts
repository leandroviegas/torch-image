import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backgroundColor: "#f1f1f1",
    color: "#0e0e0e",
    imageInfo: {
      backgroundColor: "#ebebeb",
      imageActions: {
        userProfile: {
          backgroundColor: "#f1f1f1",
          color: "#0e0e0e",
          hover: {
            backgroundColor: "#0e0e0e",
          },
        },
        button: {
          color: "#595959",
          backgroundColor: "#f1f1f1",
          hover: {
            color: "#1d1d1d",
            borderColor: "#373737",
          },
        },
      },
    },
    scrollbar: {
      color: "#c7c7c7",
      hover: {
        color: "#b0b0b0",
      },
    },
  },
  dark: {
    backgroundColor: "#161616",
    color: "#f1f1f1",
    imageInfo: {
      backgroundColor: "#0e0e0e",
      imageActions: {
        userProfile: {
          backgroundColor: "#161616",
          color: "#f1f1f1",
          hover: {
            backgroundColor: "#d5d5d5",
          },
        },
        button: {
          color: "#f1f1f1",
          backgroundColor: "#161616",
          hover: {
            color: "#b0b0b0",
            borderColor: "#aaaaaa",
          },
        },
      },
    },
    scrollbar: {
      color: "#090909",
      hover: {
        color: "#000000",
      },
    },
  },
};

export const ImageDetails = styled.div`
  width: 100%;
  max-width: 1200px;
  border-radius: 7px;
  margin: 30px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.backgroundColor};

  @media (max-width: 768px) {
    margin: auto;
    border-radius: 0;
    padding: 0;
  }

  .imageInfo {
    background-color: ${({ theme }) => theme.imageInfo.backgroundColor};
    border-radius: 7px;

    .image {
      display: flex;
      padding-left: 10px;

      @media (max-width: 768px) {
        flex-direction: column;
        padding: 10px;
      }

      .image-section {
        width: 100%;
        position: relative;

        .image-actions {
          height: auto;
          width: 100%;
          position: absolute;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transform: translateY(-100%);

          .user-profile {
            margin: 10px;
            button {
              color: ${({ theme }) =>
                theme.imageInfo.imageActions.userProfile.color};
              background-color: ${({ theme }) =>
                theme.imageInfo.imageActions.userProfile.backgroundColor};
              padding: 5px 15px;
              border-radius: 20px;
              cursor: pointer;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 15px;

              .user-profile-picture {
                img,
                svg {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                }

                svg {
                  color: #3e3e3e;
                  background-color: #e0e0e0;
                  padding-bottom: 4px;
                }
              }
            }
          }

          .actions {
            margin: 10px;
            display: flex;
            gap: 12px;

            button {
              cursor: pointer;
              display: flex;
              align-items: center;
              background: ${({ theme }) =>
                theme.imageInfo.imageActions.button.backgroundColor};
              color: ${({ theme }) =>
                theme.imageInfo.imageActions.button.color};
              border: 1px solid #c7c7c7;
              font-size: 20px;
              border-radius: 50%;
              padding: 10px;
              transition: 0.2s;
              box-shadow: inset 0 0 0 2px
                ${({ theme }) =>
                  theme.imageInfo.imageActions.button.backgroundColor};

              &:hover {
                color: ${({ theme }) =>
                  theme.imageInfo.imageActions.button.hover.color};
                border: 1px solid
                  ${({ theme }) =>
                    theme.imageInfo.imageActions.button.hover.borderColor};
              }
            }

            button.selected {
              background: #ffa62b;
              color: #ffffff;
              border: 1px solid #ff9f17;
              box-shadow: inset 0 0 0 2px #ffffff;

              &:hover {
                background: #ffa62b;
                border: 1px solid #ff9500;
              }
            }
          }
        }

        > a > img {
          width: 100%;
          height: 100%;
          max-height: 600px;
          object-fit: contain;
        }
      }

      .comment-section {
        max-height: 600px;
        width: 600px;
        display: flex;
        flex-direction: column;

        @media (max-width: 768px) {
          width: 100%;
        }

        .no-comment {
          height: 100%;
          text-align: center;
          width: 100%;
          color: ${({ theme }) => theme.color}44;
          padding: 60px 20px;
          font-weight: 700;
          font-size: 18px;
          margin: 0 auto;
        }

        .comment-list {
          height: 100%;
          overflow-y: auto;
          align-content: stretch;
        }

        .comment-form {
          width: 100%;
          height: auto;
          p {
            overflow-wrap: break-word;
          }
        }
      }
    }
  }
`;
