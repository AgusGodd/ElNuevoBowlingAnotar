import React, { useState } from "react";

const BowlingApp = () => {
  const [jugadores, setJugadores] = useState([{ nombre: "Jugador 1", puntos: 0 }]);
  const [turno, setTurno] = useState(0); // Indica el índice del jugador que tira
  const [tiro1, setTiro1] = useState(0);
  const [tiro2, setTiro2] = useState(0);

  // Lógica para pasar al siguiente jugador
  const siguienteJugador = () => {
    setTurno((turno + 1) % jugadores.length);
    setTiro1(0);
    setTiro2(0);
  };

  // Lógica para anotar un tiro
  const anotarTiro = (tiro, valor) => {
    if (tiro === 1) {
      setTiro1(valor);
    } else {
      setTiro2(valor);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">El Nuevo Bowling</h1>
      <div className="mb-4">
        <h2 className="text-xl">Jugador: {jugadores[turno].nombre}</h2>
        <div className="mb-2">
          <label>
            Tiro 1:
            <input
              type="number"
              value={tiro1}
              onChange={(e) => anotarTiro(1, parseInt(e.target.value) || 0)}
              min="0"
              max="10"
              className="ml-2"
            />
          </label>
        </div>
        <div>
          <label>
            Tiro 2:
            <input
              type="number"
              value={tiro2}
              onChange={(e) => anotarTiro(2, parseInt(e.target.value) || 0)}
              min="0"
              max="10"
              className="ml-2"
            />
          </label>
        </div>
      </div>
      <button
        onClick={siguienteJugador}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Siguiente Jugador
      </button>
      <div className="mt-4">
        <h3>Puntuaciones:</h3>
        {jugadores.map((jugador, index) => (
          <div key={index}>
            {jugador.nombre}: {jugador.puntos} puntos
          </div>
        ))}
      </div>
    </div>
  );
};

export default BowlingApp;
