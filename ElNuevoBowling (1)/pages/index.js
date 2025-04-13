import { useState } from "react";
import PlayerSetup from "../components/PlayerSetup";
import GameScreen from "../components/GameScreen";
import FinalScreen from "../components/FinalScreen";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [puntajes, setPuntajes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const handleStartGame = (playersList) => {
    setPlayers(playersList);
    setPuntajes(playersList.map(() => Array(10).fill(0)));
    setGameStarted(true);
  };

  const handleEndGame = (puntajesFinales) => {
    setPuntajes(puntajesFinales);
    setGameEnded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-100 text-black p-4">
      {!gameStarted && !gameEnded && <PlayerSetup onStartGame={handleStartGame} />}
      {gameStarted && !gameEnded && (
        <GameScreen players={players} onEndGame={handleEndGame} />
      )}
      {gameEnded && <FinalScreen puntajes={puntajes} players={players} />}
    </div>
  );
}
