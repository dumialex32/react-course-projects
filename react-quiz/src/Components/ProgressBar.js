export default function ProgressBar({ points, index, questions }) {
  return (
    <header className="progress">
      <p>
        Question {index} / <strong>{questions.length - 1}</strong>
      </p>
    </header>
  );
}
