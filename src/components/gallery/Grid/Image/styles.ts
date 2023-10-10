import styled from "styled-components";

export const ThemeStyles = {
  light: {
    bgColor: "#00000000",
    borderWidth: "1px",
    button: {
      color: "#595959",
      hover: {
        color: "#1d1d1d",
        borderColor: "#373737",
      },
    },
    providerLink: {
      color: "#7e7e7e",
      hover: {
        color: "#373737",
      },
    },
  },
  dark: {
    bgColor: "#111111",
    borderWidth: "0px",
    button: {
      color: "#f1f1f1",
      hover: {
        color: "#b0b0b0", 
        borderColor: "#aaaaaa",
      },
    },
    providerLink: {
      color: "#c6c6c6",
      hover: {
        color: "#a5a5a5",
      },
    },
  },
};

export const ImageCard = styled.div`
  background: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 4px 4px #44444416;
  border-bottom: ${({ theme }) => theme.borderWidth} solid #f1f1f1;
  border-left: ${({ theme }) => theme.borderWidth} solid #f1f1f1;
  border-right: ${({ theme }) => theme.borderWidth} solid #f1f1f1;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  .image {
    position: relative;
    width: auto;
    height: auto;

    & img {
      width: 100%;
      z-index: -1;
      display: block;
    }

    .info-card {
      height: 100%;
      width: 100%;
      position: absolute;
      background: #00000050;
      opacity: 0;
      transition: opacity 0.5s;
      display: flex;
      flex-direction: column-reverse;

      .user-info {
        margin: 10px;
        a {
          display: flex;
          gap: 7px;
          align-items: center;

          span {
            color: #e0e0e0;
            font-weight: 600;
            font-size: 12px;

            &:hover {
              color: white;
            }
          }

          img , svg {
            z-index: 2;
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

    &:hover .info-card {
      opacity: 1;
    }
  }

  .footer {
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .buttons {
      display: flex;
      gap: 7px;

      span {
        font-size: 15px;
        text-align: center;
        width: 100%;
      }

      button {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        background: #00000000;
        color: ${({ theme }) => theme.button.color};
        border: 1px solid #c7c7c7;
        font-size: 20px;
        border-radius: 7px;
        padding: 7px 7px;
        transition: 0.2s;

        &:hover {
          color: ${({ theme }) => theme.button.hover.color};
          border: 1px solid ${({ theme }) => theme.button.hover.borderColor};
        }
      }

      button.selected {
        background: #ffa62b;
        color: #ffffff;
        border: 1px solid #ff9f17;

        &:hover {
          background: #ffa62b;
          border: 1px solid #ff9500;
        }
      }
    }

    .provider {
      a {
        display: flex;
        gap: 7px;
        align-items: center;

        span {
          color: ${({ theme }) => theme.providerLink.color};
          font-weight: 600;
          font-size: 12px;

          &:hover {
            color: ${({ theme }) => theme.providerLink.hover.color};
          }
        }

        img {
          z-index: 2;
          width: 25px;
          height: 25px;
          border-radius: 999999px;
        }
      }
    }
  }
`;
