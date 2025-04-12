import React, { useState } from "react";

const BowlingApp = () => {
  // Estado para jugadores, puntuaciones y la pantalla actual
  const [jugadores, setJugadores] = useState([{ nombre: "", puntos: 0 }]);
  const [turno, setTurno] = useState(0);
  const [tiro1, setTiro1] = useState(0);
  const [tiro2, setTiro2] = useState(0);
  const [nuevoJugador, setNuevoJugador] = useState("");
  const [pantallaSeleccion, setPantallaSeleccion] = useState(true); // Cambiar entre selección de jugadores y juego

  // Función para agregar un jugador
  const agregarJugador = () => {
    if (nuevoJugador.trim() === "") return;
    if (jugadores.length < 10) {
      setJugadores([...jugadores, { nombre: nuevoJugador, puntos: 0 }]);
    }
    setNuevoJugador(""); // Limpiar el campo de texto
  };

  // Función para cambiar a la pantalla de juego
  const iniciarJuego = () => {
    setPantallaSeleccion(false); // Cambiar a la pantalla de juego
  };

  // Función para pasar al siguiente jugador
  const siguienteJugador = () => {
    setTiro1(0);
    setTiro2(0);
    setTurno((prevTurno) => (prevTurno + 1) % jugadores.length); // Cambio de jugador
  };

  // Función para anotar los tiros
  const anotarTiros = () => {
    const nuevoPuntaje = tiro1 + tiro2;

    // Si es strike
    if (tiro1 === 10) {
      setJugadores((prev) =>
        prev.map((jugador, index) =>
          index === turno ? { ...jugador, puntos: jugador.puntos + 20 } : jugador
        )
      );
      setTiro2(0); // No hay segundo tiro
      siguienteJugador(); // Pasar al siguiente jugador
    } else {
      setJugadores((prev) =>
        prev.map((jugador, index) =>
          index === turno
            ? { ...jugador, puntos: jugador.puntos + nuevoPuntaje }
            : jugador
        )
      );
      siguienteJugador(); // Pasar al siguiente jugador
    }
  };

  // Función para mostrar el podio
  const mostrarPodio = () => {
    const jugadoresOrdenados = [...jugadores].sort((a, b) => b.puntos - a.puntos);
    return jugadoresOrdenados.slice(0, 3).map((jugador, index) => (
      <div key={index} className="text-lg mb-2">
        <strong>{index + 1}. {jugador.nombre} - {jugador.puntos} puntos</strong>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-100 text-black p-4">
      <h1 className="text-3xl font-bold text-center mb-8">El Nuevo Bowling</h1>

      {pantallaSeleccion ? (
        // Pantalla de selección de jugadores
        <div className="text-center mb-8">
          <h2 className="text-xl mb-4">Selecciona tus jugadores</h2>
          <div className="mb-4">
            <input
              type="text"
              value={nuevoJugador}
              onChange={(e) => setNuevoJugador(e.target.value)}
              placeholder="Nombre del jugador"
              className="border p-2 mr-2 rounded-lg text-lg"
            />
            <button
              onClick={agregarJugador}
              className="bg-blue-500 text-white p-2 rounded-lg text-lg"
            >
              Agregar Jugador
            </button>
          </div>

          <div className="mb-4">
            {jugadores.length > 1 && (
              <ul className="list-disc">
                {jugadores.map((jugador, index) => (
                  <li key={index}>{jugador.nombre || `Jugador ${index + 1}`}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={iniciarJuego}
            className="bg-green-500 text-white p-4 rounded-lg mt-8 text-2xl"
          >
            Comenzar Juego
          </button>
        </div>
      ) : (
        // Pantalla de juego
        <div className="text-center">
          <div className="mb-6">
            <p className="text-xl mb-2">Jugador: {jugadores[turno].nombre || `Jugador ${turno + 1}`}</p>
            <p className="text-lg mb-2">Puntaje: {jugadores[turno].puntos}</p>
          </div>

          <div className="mb-4">
            <div className="mb-2">
              <label className="block text-lg mb-1">Tiro 1:</label>
              <input
                type="number"
                value={tiro1}
                onChange={(e) => setTiro1(parseInt(e.target.value) || 0)}
                min="0"
                max="10"
                className="border p-3 rounded-lg w-16 text-center"
              />
            </div>

            <div className="mb-2">
              <label className="block text-lg mb-1">Tiro 2:</label>
              <input
                type="number"
                value={tiro2}
                onChange={(e) => setTiro2(parseInt(e.target.value) || 0)}
                min="0"
                max="10"
                className="border p-3 rounded-lg w-16 text-center"
              />
            </div>
          </div>

          <button
            onClick={anotarTiros}
            className="bg-blue-500 text-white p-4 rounded-lg mt-4 text-2xl"
          >
            Anotar
          </button>

          <div className="mt-8">
            <h3 className="text-2xl mb-4">Podio:</h3>
            {mostrarPodio()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BowlingApp;
