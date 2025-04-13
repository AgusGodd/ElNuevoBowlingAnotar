const FinalScreen = ({ puntajes, players }) => {
  const totalPuntajes = players.map((player, index) => {
    const total = puntajes[index].reduce((acc, score) => acc + score, 0);
    return { player, total };
  });

  totalPuntajes.sort((a, b) => b.total - a.total);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold">Podio Final</h1>
      <div className="space-y-2">
        {totalPuntajes.map((score, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className={`text-xl ${index === 0 ? "text-green-500" : ""}`}>
              {index + 1}. {score.player} - {score.total} puntos
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalScreen;
