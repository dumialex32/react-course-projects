export function Quiz({ questions }) {
  return (
    <div className="quiz-container">
      <h3 className="question">
        {questions.map((q, i) => console.log(q.question[0]))}
      </h3>
    </div>
  );
}
