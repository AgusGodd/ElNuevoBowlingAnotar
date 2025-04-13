import { useState } from "react";

const PlayerSetup = ({ onStartGame }) => {
  const [players, setPlayers] = useState([""]);
  const [newPlayer, setNewPlayer] = useState("");

  const handleAddPlayer = () => {
    if (newPlayer) {
      setPlayers([...players, newPlayer]);
      setNewPlayer("");
    }
  };

  const handleStartGame = () => {
    if (players.length > 0) {
      onStartGame(players);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold">Agregar Jugadores</h1>
      <div className="space-y-2">
        {players.map((player, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-xl">{player || "Jugador " + (index + 1)}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Nuevo Jugador"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddPlayer}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Agregar
        </button>
      </div>
      <button
        onClick={handleStartGame}
        className="bg-green-500 text-white p-4 rounded mt-4"
      >
        Comenzar Juego
      </button>
    </div>
  );
};

export default PlayerSetup;
