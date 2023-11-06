export default function Progress({
  questionLength,
  index,
  points,
  answer,
  maxPoints,
}) {
  return (
    <div className="progress">
      <progress
        min="0"
        max={questionLength}
        value={index + Number(answer !== null)}
      ></progress>

      <p className="question-num">
        <strong>{index + 1}</strong> / {questionLength}
      </p>

      <p className="points">
        <strong>{points}</strong> / {maxPoints}
      </p>
    </div>
  );
}
