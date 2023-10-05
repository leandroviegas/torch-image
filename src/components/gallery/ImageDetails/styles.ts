import styled from "styled-components";

export const ThemeStyles = {
  light: {
    backgroundColor: "#f1f1f1",
    imageInfo: {
      backgroundColor: "#e4e4e4",
    },
    scrollbar: {
      color: "#a3a3ab",
      hover: {
        color: "#7e7e7e",
      },
    },
  },
  dark: {
    backgroundColor: "#161616",
    imageInfo: {
      backgroundColor: "#0e0e0e",
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.09);
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

        img {
          width: 100%;
          height: 100%;
          max-height: 600px;
          object-fit: contain;
        }
      }

      .comment-section {
        max-height: 600px;
        width: 600px;
        overflow-y: auto;

        @media (max-width: 768px) {
          width: 100%;
        }

        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: ${({ theme }) => theme.scrollbar.color};
          border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: ${({ theme }) => theme.scrollbar.hover.color};
        }
      }
    }
  }
`;
