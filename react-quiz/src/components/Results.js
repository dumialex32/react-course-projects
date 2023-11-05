export default function Results({ points, maxPoints, highscore }) {
  return (
    <div className="results">
      <p>
        You have scored {points} out of {maxPoints}
      </p>
      <p>Highscore: {highscore}</p>
    </div>
  );
}
