import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

export const Header: React.FC = () => {
  return (
    <S.Container>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/scouts">Scouts</Link>
        </li>
      </ul>
    </S.Container>
  );
};
