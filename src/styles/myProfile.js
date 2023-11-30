import styled from 'styled-components';

export const StMyProfileWrapper = styled.section`
  width: 100%;
  height: 60vh;
  display: flex;

  > div {
    background-color: var(--text-color);
    width: 30rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    padding: 2rem;

    > h1,
    p {
      color: var(--bg-color);
      display: block;
      font-size: 2.4rem;
      font-weight: bold;
      text-align: center;
      margin: 2rem;
    }
  }
`;

export const StButton = styled.button`
  border: 0.1rem solid var(--bg-color);
  background-color: var(--text-color);
  color: var(--bg-color);
  padding: 1rem 2rem;
  font-weight: bold;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  transition:
    color 0.2s ease-in,
    background-color 0.2s ease-in;

  &:hover {
    color: var(--text-color);
    background-color: var(--bg-color);
  }
`;
export const StImgButton = styled.button`
  background-color: unset;
`;
export const StInput = styled.input`
  margin-top: 2rem;
  padding: 1rem 0.5rem;
`;
export const StButtonWrapper = styled.section`
  display: flex;
  gap: 1rem;
`;
