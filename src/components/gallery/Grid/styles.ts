import styled from "styled-components";

export const GridGallery = styled.div`
  margin: 30px auto;
  padding-bottom: 50px;
  display: grid;
  position: relative;
  gap: 20px;
  grid-template-columns: repeat(12, minmax(0, 1fr));

  & .column {
    grid-column: span 12 / span 12;
    gap: 20px;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 640px) {
    & .column {
      grid-column: span 6 / span 6;
    }
  }

  @media (min-width: 1024px) {
    & .column {
      grid-column: span 3 / span 3;
    }
  }
`;
