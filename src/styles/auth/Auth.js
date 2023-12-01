import styled from 'styled-components';

export const StWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;

  > div {
    width: 60rem;
    height: auto;
    margin: auto;
    background-color: var(--text-color);
    padding: 3rem;
    border-radius: 0.5rem;
    > a {
      margin-top: 2rem;
      display: block;
      color: var(--bg-color);
      text-align: center;
      font-size: 2.4rem;
      transition: color 0.2s ease-in;
      &:hover {
        color: var(--btn-selected);
      }
    }
  }
`;
export const StTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--bg-color);
`;
export const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
`;

export const StButton = styled.button`
  width: 100%;
  padding: 2rem 0;
  border: 0.1rem solid var(--bg-color);
  transition:
    background-color 0.2s ease-in,
    color 0.2s ease-in;
  border-radius: 0.5rem;
  font-size: 2.4rem;
  font-weight: 700;

  &:hover {
    background: var(--text-color);
    color: var(--bg-color);
  }
`;
