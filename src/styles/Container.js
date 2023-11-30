import styled from 'styled-components';

export const StContainer = styled.section`
  max-width: 144rem;
  min-width: 80rem;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 10rem;
`;

export const StSpinnersWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);

  > span {
    margin: auto;

    > span {
      background-color: var(--btn-selected) !important;
      width: 5rem !important;
      height: 5rem !important;
    }
  }
`;
