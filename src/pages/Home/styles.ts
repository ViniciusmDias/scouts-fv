import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin: 2rem 0;
`;

export const Teams = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

export const TeamsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
`;

export const Subtitle = styled.h2`
  text-align: left;
  margin-bottom: 1rem;
`;

export const RoundContainer = styled.div`
  display: flex;
  width: 900px;
  background-color: #e7e7e7;
  padding: 2rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

export const ColumnItem = styled.div`
  display: flex;
  width: 100%;
  flex: 1;

  button {
    width: 100%;
    padding: 1rem;
    margin: 1rem;
    background: #f8b3b3;
    border: none;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }

    &.active {
      background: red;
    }
  }
`;

export const MainButton = styled.div`
  display: flex;
  margin-bottom: 4rem;

  button {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    border: none;
    background: #f8b3b3;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const SecondaryButton = styled.div`
  display: flex;

  button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: none;
    background: #d9d9d9;
    cursor: pointer;
    margin: 0 0.5rem;

    :hover {
      opacity: 0.8;
    }
  }
`;

export const MovesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  justify-content: flex-start;

  h2 {
    margin-bottom: 1rem;
  }
`;

export const Move = styled.div`
  display: flex;

  p {
    margin-left: 0.5rem;
  }
`;
