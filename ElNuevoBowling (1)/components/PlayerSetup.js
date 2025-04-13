import { useState } from "react";

export default function PlayerSetup({ onStart }) {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  const addPlayer = () => {
    if (name.trim()) {
      setPlayers([...players, { name, score: 0 }]);
      setName("");
    }
  };

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">🎳 El Nuevo Bowling</h1>
      <input
        className="p-2 border rounded"
        placeholder="Nombre del jugador"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="block mx-auto bg-blue-500 text-white p-2 rounded" onClick={addPlayer}>
        Agregar jugador
      </button>
      <ul className="space-y-1">
        {players.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>
      {players.length > 0 && (
        <button className="bg-green-600 text-white p-2 mt-4 rounded" onClick={() => onStart(players)}>
          Comenzar partida
        </button>
      )}
    </div>
  );
}