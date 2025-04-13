import { useState } from "react";

const GameScreen = ({ players, onEndGame }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentTiro, setCurrentTiro] = useState(1);
  const [puntajes, setPuntajes] = useState(players.map(() => Array(10).fill(0)));

  const handleTiro = (pins) => {
    let updatedPuntajes = [...puntajes];
    updatedPuntajes[currentPlayerIndex][currentTiro - 1] = pins;

    if (pins === 10 && currentTiro === 1) {
      // Si es un strike, el siguiente tiro se salta
      updatedPuntajes[currentPlayerIndex][currentTiro] = 20;
      setCurrentTiro(1);
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    } else {
      setCurrentTiro(currentTiro === 1 ? 2 : 1);
    }

    setPuntajes(updatedPuntajes);
  };

  const handleFinishGame = () => {
    onEndGame(puntajes);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Jugador: {players[currentPlayerIndex]}</h1>
      <h2 className="text-lg">Tiro {currentTiro}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => handleTiro(10)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Strike
        </button>
        <button
          onClick={() => handleTiro(0)}
          className="bg-red-500 text-white p-2 rounded"
        >
          0 Pinos
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pins) => (
          <button
            key={pins}
            onClick={() => handleTiro(pins)}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            {pins} Pinos
          </button>
        ))}
      </div>
      <button
        onClick={handleFinishGame}
        className="bg-green-500 text-white p-4 rounded mt-4"
      >
        Terminar Juego
      </button>
    </div>
  );
};

export default GameScreen;
