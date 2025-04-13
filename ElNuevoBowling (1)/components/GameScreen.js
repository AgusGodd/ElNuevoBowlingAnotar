import { useState } from "react";

export default function GameScreen({ players, onEnd }) {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [turn, setTurn] = useState(1);
  const [results, setResults] = useState(players.map(p => ({ ...p, points: [] })));

  const addScore = (score) => {
    const updated = [...results];
    const player = updated[currentPlayer];
    const tiro = player.points.length % 2;
    const last = player.points[player.points.length - 1] || 0;

    if (tiro === 0 && score === 10) {
      player.points.push(20);
    } else if (tiro === 1 && last + score > 10) {
      alert("No podés tirar más de 10 pinos en total.");
      return;
    } else {
      player.points.push(score);
    }

    setResults(updated);

    if (currentPlayer === players.length - 1) {
      if (turn === 10) {
        const ranked = [...updated].map(p => ({
          ...p,
          score: p.points.reduce((a, b) => a + b, 0)
        })).sort((a, b) => b.score - a.score);
        onEnd(ranked);
        return;
      }
      setTurn(turn + 1);
      setCurrentPlayer(0);
    } else {
      setCurrentPlayer(currentPlayer + 1);
    }
  };

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-bold">Turno {turn}</h2>
      <h3 className="text-lg">Jugador: {players[currentPlayer].name}</h3>
      <div className="grid grid-cols-5 gap-2 justify-center">
        {[...Array(11).keys()].map(n => (
          <button
            key={n}
            className="bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => addScore(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}