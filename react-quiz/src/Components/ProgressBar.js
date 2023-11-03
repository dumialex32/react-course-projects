export default function ProgressBar({
  points,
  index,
  numQuestions,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + 1 + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points} </strong> / {maxPoints}
      </p>
    </header>
  );
}
