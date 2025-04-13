import { useState } from "react";
import PlayerSetup from "../components/PlayerSetup";
import GameScreen from "../components/GameScreen";
import FinalScreen from "../components/FinalScreen";

export default function Home() {
  const [step, setStep] = useState("setup");
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState([]);

  const startGame = (playerList) => {
    setPlayers(playerList);
    setStep("game");
  };

  const endGame = (finalResults) => {
    setResults(finalResults);
    setStep("final");
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-200 to-orange-100 text-black">
      {step === "setup" && <PlayerSetup onStart={startGame} />}
      {step === "game" && <GameScreen players={players} onEnd={endGame} />}
      {step === "final" && <FinalScreen results={results} />}
    </div>
  );
}