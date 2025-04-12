import React, { useState } from "react";

const BowlingApp = () => {
  // Estado para jugadores, puntuaciones, y tutorial
  const [jugadores, setJugadores] = useState([{ nombre: "", puntos: 0 }]);
  const [turno, setTurno] = useState(0); // Índice del jugador actual
  const [tiro1, setTiro1] = useState(0);
  const [tiro2, setTiro2] = useState(0);
  const [nuevoJugador, setNuevoJugador] = useState("");
  const [mostrarTutorial, setMostrarTutorial] = useState(true); // Estado para controlar la pantalla tutorial

  // Función para agregar un jugador
  const agregarJugador = () => {
    if (nuevoJugador.trim() === "") return; // Evitar agregar jugadores con nombre vacío
    if (jugadores.length < 10) { // Limitar a un máximo de 10 jugadores
      setJugadores([...jugadores, { nombre: nuevoJugador, puntos: 0 }]);
    }
    setNuevoJugador(""); // Limpiar el campo de nombre
  };

  // Función para pasar al siguiente jugador
  const siguienteJugador = () => {
    setTiro1(0);
    setTiro2(0);
    setTurno((prevTurno) => (prevTurno + 1) % jugadores.length); // Cambiar de jugador
  };

  // Función para anotar los tiros y actualizar la puntuación
  const anotarTiros = () => {
    const nuevoPuntaje = tiro1 + tiro2;

    // Si es un strike (10 en el primer tiro)
    if (tiro1 === 10) {
      setJugadores((prev) =>
        prev.map((jugador, index) =>
          index === turno ? { ...jugador, puntos: jugador.puntos + 20 } : jugador
        )
      );
      setTiro2(0); // Saltar el segundo tiro
      siguienteJugador(); // Pasar al siguiente jugador
    } else {
      setJugadores((prev) =>
        prev.map((jugador, index) =>
          index === turno
            ? { ...jugador, puntos: jugador.puntos + nuevoPuntaje }
            : jugador
        )
      );
      siguienteJugador(); // Cambiar de jugador
    }
  };

  // Función para finalizar y mostrar el podio
  const mostrarPodio = () => {
    const jugadoresOrdenados = [...jugadores].sort((a, b) => b.puntos - a.puntos);
    return jugadoresOrdenados.slice(0, 3).map((jugador, index) => (
      <div key={index} className="text-lg mb-2">
        <strong>{index + 1}. {jugador.nombre} - {jugador.puntos} puntos</strong>
      </div>
    ));
  };

  // Función para iniciar el juego
  const iniciarJuego = () => {
    setMostrarTutorial(false); // Ocultar tutorial
    setTurno(0); // Comenzar con el primer jugador
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-100 text-black p-4">
      <h1 className="text-2xl font-bold text-center mb-4">El Nuevo Bowling</h1>

      {mostrarTutorial ? (
        // Pantalla de tutorial
        <div className="text-center mb-8">
          <h2 className="text-xl mb-4">¡Bienvenido al Nuevo Bowling!</h2>
          <p className="mb-4">
            Cada jugador tiene dos tiros por ronda. Si derribas todos los pinos en el primer tiro (strike), se te asignan 20 puntos y se salta el segundo tiro. ¡Vamos a jugar!
          </p>
          <button
            onClick={iniciarJuego}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Comenzar Juego
          </button>
        </div>
      ) : (
        // Pantalla principal del juego
        <div>
          <div className="mb-4">
            <p className="text-lg mb-2">
              Instrucciones: Cada jugador tiene dos tiros por ronda. Si derribas todos los pinos en el primer tiro (strike), se asignan 20 puntos y el segundo tiro se salta.
            </p>
            <p className="font-semibold">Jugadores:</p>
            <div>
              {jugadores.map((jugador, index) => (
                <div key={index}>
                  {jugador.nombre ? `${jugador.nombre}: ${jugador.puntos} puntos` : `Jugador ${index + 1}: ${jugador.puntos} puntos`}
                </div>
              ))}
            </div>
          </div>

          {/* Agregar un nuevo jugador */}
          <div className="mb-4">
            <input
              type="text"
              value={nuevoJugador}
              onChange={(e) => setNuevoJugador(e.target.value)}
              placeholder="Ingresa el nombre del jugador"
              className="border p-2 mr-2"
            />
            <button
              onClick={agregarJugador}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Agregar Jugador
            </button>
          </div>

          {/* Mostrando el nombre del jugador actual */}
          <h2 className="text-xl mb-4">Jugador: {jugadores[turno].nombre || `Jugador ${turno + 1}`}</h2>

          {/* Entrada para los tiros */}
          <div className="mb-4">
            <div className="mb-2">
              <label>
                Tiro 1:
                <input
                  type="number"
                  value={tiro1}
                  onChange={(e) => setTiro1(parseInt(e.target.value) || 0)}
                  min="0"
                  max="10"
                  className="ml-2"
                />
              </label>
            </div>

            <div className="mb-2">
              <label>
                Tiro 2:
                <input
                  type="number"
                  value={tiro2}
                  onChange={(e) => setTiro2(parseInt(e.target.value) || 0)}
                  min="0"
                  max="10"
                  className="ml-2"
                />
              </label>
            </div>
          </div>

          {/* Botón para anotar los tiros */}
          <button
            onClick={anotarTiros}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Anotar
          </button>

          {/* Mostrar podio al final */}
          {jugadores.length > 0 && jugadores.every(jugador => jugador.puntos > 0) && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Podio:</h3>
              {mostrarPodio()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BowlingApp;
