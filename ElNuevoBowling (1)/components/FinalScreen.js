export default function FinalScreen({ results }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 Podio Final</h1>
      <ol className="space-y-2">
        {results.map((player, i) => (
          <li key={i} className="text-lg">
            🏅 {player.name}: {player.score} puntos
          </li>
        ))}
      </ol>
    </div>
  );
}