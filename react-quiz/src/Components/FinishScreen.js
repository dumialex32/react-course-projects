export default function FinishScreen({
  points,
  maxPoints,
  dispatch,
  numQuestions,
  highscore,
  children,
}) {
  const percentage = (points / maxPoints) * 100;
  let rank =
    (percentage <= 20 && "🤔") ||
    (percentage <= 50 && "🤨") ||
    (percentage <= 80 && "😉") ||
    (percentage === 100 && "🥳");

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> points out of {maxPoints}
        {` (${Math.ceil(percentage)}%)`} {rank}
      </p>
      <p className="highscore">HIGHSCORE: {highscore}</p>

      {/* BTN RESET */}
      {children}
    </>
  );
}
