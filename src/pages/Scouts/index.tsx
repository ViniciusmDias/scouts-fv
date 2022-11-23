import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import * as S from './styles';

interface Attack {
  id: number;
  attack: string;
  raise: string;
  times?: number;
}

interface Player {
  id: number;
  name: string;
  attacks: Attack[];
}

export const Scouts: React.FC = () => {
  const [players, setPlayers] = useState([] as Player[]);
  const [loading, setLoading] = useState(true);

  const setScoutsInfo = useCallback(async () => {
    setLoading(true);

    try {
      const playersResponse = await api.get('players');
      const newPlayers: Player[] = playersResponse.data;

      setPlayers(newPlayers);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    void setScoutsInfo();
  }, [setScoutsInfo]);

  return (
    <S.Container>
      {players.map((player) => (
        <S.Player key={player.id}>
          <h2>Jogador: {player.name}</h2>
          {player.attacks.map((attack) => (
            <S.Move key={attack.id}>
              <p>Quantas vezes: {attack.times} |</p>
              <p>Ataque: {attack.attack} |</p>
              <p>Levantada: {attack.raise}</p>
            </S.Move>
          ))}
        </S.Player>
      ))}
    </S.Container>
  );
};
