/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import * as S from './styles';

interface Team {
  id: number;
  name: string;
  points: number | undefined;
}

interface Attack {
  id: number;
  type: string;
  attack: string;
  times?: number;
}

interface Round {
  id: number;
  number: number;
  moves: Attack[];
}

interface Match {
  id: number;
  teams: Team[];
}

interface Player {
  id: number;
  name: string;
  attacks: Attack[];
}

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [teams, setTeams] = useState([] as Team[]);
  const [match, setMatch] = useState<Match>();
  const [rounds, setRounds] = useState([] as Round[]);
  const [players, setPlayers] = useState([] as Player[]);
  const [matchPlayers, setMatchPlayers] = useState([] as Player[]);
  const [attacks, setAttacks] = useState([] as Attack[]);

  const [player, setPlayer] = useState<Player>();
  const [attack, setAttack] = useState('');
  const [type, setType] = useState('');

  const setHomeInfo = useCallback(async () => {
    setLoading(true);

    try {
      const matchesResponse = await api.get('match');
      const newMatches: Match = matchesResponse.data;

      const roundsResponse = await api.get('rounds');
      const newRounds: Round[] = roundsResponse.data;

      const playersResponse = await api.get('players');
      const newPlayers: Player[] = playersResponse.data;

      const attacksResponse = await api.get('attacks');
      const newAttacks: Attack[] = attacksResponse.data;

      setMatch(newMatches);
      setRounds(newRounds);
      setPlayers(newPlayers);
      setAttacks(newAttacks);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createNewRound = async (): Promise<void> => {
    const newRound = {
      id: rounds.length + 1,
      number: rounds.length + 1,
      moves: [],
    };

    await api.post('rounds', newRound);

    setRounds([...rounds, newRound]);
  };

  const updateMatchPoints = async (teamId: number): Promise<void> => {
    const data = {
      id: 1,
      teams: [
        {
          id: 1,
          name: 'Brisa e Sandrey',
          points:
            teamId === match?.teams[0].id
              ? Number(match?.teams[0].points) + 1
              : match?.teams[0].points,
        },
        {
          id: 2,
          name: 'Kibinho e Neguebinha',
          points:
            teamId === match?.teams[1].id
              ? Number(match?.teams[1].points) + 1
              : match?.teams[1].points,
        },
      ],
    };
    await api.put('match', data);

    await createNewRound();
    setMatch(data);
  };

  const updateAttackCount = async (): Promise<void> => {
    const selectedPlayer = players.find(
      (selectedPlayer) => player?.id === selectedPlayer.id,
    );

    if (selectedPlayer == null) {
      return;
    }

    const selectPlayerAttack = selectedPlayer.attacks.map((playerAttack) => {
      const newPlayerAttack = playerAttack;
      if (newPlayerAttack.attack === attack && newPlayerAttack.type === type) {
        newPlayerAttack.times = Number(newPlayerAttack.times) + 1;
      }
      return newPlayerAttack;
    });

    selectedPlayer.attacks = selectPlayerAttack;

    await api.put(`players/${selectedPlayer.id}`, selectedPlayer);

    await increaseMove(rounds.length);

    setAttack('');
    setType('');
    setPlayer(undefined);
  };

  const increaseMove = async (roundNumber: number): Promise<void> => {
    const selectedRound = rounds.find((round) => round.number === roundNumber);

    console.log(selectedRound?.moves.length);
    if (selectedRound == null) {
      return;
    }

    const newMove = {
      id: selectedRound.moves.length + 1,
      attack,
      type,
    };

    selectedRound.moves.push(newMove);

    await api.put(`rounds/${selectedRound.number}`, selectedRound);
  };
  const addNewPlayer = (e: React.SyntheticEvent<HTMLSelectElement>): void => {
    const selectedPlayer = players.find(
      (p) => p.id === Number(e.currentTarget.value),
    );

    console.log(e.currentTarget.value);

    if (selectedPlayer == null) {
      return;
    }

    console.log(selectedPlayer);
    setMatchPlayers([...matchPlayers, selectedPlayer]);
  };

  const finishMatch = (): void => {
    setPlayers([]);
  };

  useEffect(() => {
    void setHomeInfo();
  }, [setHomeInfo]);

  return (
    <S.Container>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <S.Teams>
            {match?.teams.map((team) => (
              <S.TeamsItem key={team.id}>
                <h3>{team.name}</h3>
                <p>{team.points}</p>
              </S.TeamsItem>
            ))}
          </S.Teams>
          <S.Subtitle>Round {rounds[rounds.length - 1].number}</S.Subtitle>
          <S.RoundContainer>
            <S.Column>
              <h2>Jogadores</h2>
              {matchPlayers.map((playerObj) => (
                <S.ColumnItem key={playerObj.id}>
                  <button
                    className={`${
                      playerObj.name === player?.name ? 'active' : ''
                    }`}
                    onClick={() => setPlayer(playerObj)}
                  >
                    {playerObj.name}
                  </button>
                </S.ColumnItem>
              ))}
              {matchPlayers.length <= 3 && (
                <select name="" id="" onChange={(e) => addNewPlayer(e)}>
                  <option value="">Selecione um jogador</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              )}
            </S.Column>
            <S.Column>
              <h2>Tipo do ataque</h2>
              <S.ColumnItem>
                <button
                  className={`${type === 'Cabeça' ? 'active' : ''}`}
                  onClick={() => setType('Cabeça')}
                >
                  Cabeça
                </button>
              </S.ColumnItem>
              <S.ColumnItem>
                <button
                  className={`${type === 'Pé' ? 'active' : ''}`}
                  onClick={() => setType('Pé')}
                >
                  Pé
                </button>
              </S.ColumnItem>
            </S.Column>
            <S.Column>
              <h2>Ataques</h2>
              {type === 'Cabeça' &&
                attacks.map((attackObj) => {
                  if (attackObj.type === 'Cabeça') {
                    return (
                      <S.ColumnItem key={attackObj.id}>
                        <button
                          className={`${
                            attackObj.attack === attack ? 'active' : ''
                          }`}
                          onClick={() => {
                            setAttack(attackObj.attack);
                          }}
                        >
                          {attackObj.attack}
                        </button>
                      </S.ColumnItem>
                    );
                  }
                })}
              {type === 'Pé' &&
                attacks.map((attackObj) => {
                  if (attackObj.type === 'Pé') {
                    return (
                      <S.ColumnItem key={attackObj.id}>
                        <button
                          className={`${
                            attackObj.attack === attack ? 'active' : ''
                          }`}
                          onClick={() => setAttack(attack)}
                        >
                          {attackObj.attack}
                        </button>
                      </S.ColumnItem>
                    );
                  }
                })}
            </S.Column>
            <S.Column>
              <S.MainButton>
                <button
                  onClick={() => {
                    void updateAttackCount();
                  }}
                >
                  Salvar lance
                </button>
                <S.SecondaryButton>
                  <button onClick={() => finishMatch()}>
                    Finalizar partida
                  </button>
                </S.SecondaryButton>
              </S.MainButton>
              <h3>Ponto do time:</h3>
              <S.ButtonsContainer>
                <S.SecondaryButton>
                  <button
                    type="button"
                    onClick={() => {
                      void updateMatchPoints(1);
                    }}
                  >
                    1
                  </button>
                </S.SecondaryButton>
                <S.SecondaryButton>
                  <button
                    type="button"
                    onClick={() => {
                      void updateMatchPoints(2);
                    }}
                  >
                    2
                  </button>
                </S.SecondaryButton>
              </S.ButtonsContainer>
            </S.Column>
          </S.RoundContainer>
          <S.MovesContainer>
            <h2>Lances</h2>
            {rounds[rounds.length - 1].moves?.map((move) => (
              <S.Move key={move.id}>
                <p>Lance: {move.id} |</p>
                <p>Tipo: {move.type}</p>
                <p>Ataque: {move.attack} |</p>
              </S.Move>
            ))}
          </S.MovesContainer>
        </>
      )}
    </S.Container>
  );
};
