export function Quiz({ questions, index, dispatch }) {
  console.log(questions);
  console.log(index);
  return (
    <div className="quiz-container">
      <Question questions={questions} index={index} />

      <AnswerList>
        {questions[index].options.map((option) => (
          <Answer key={option} option={option} />
        ))}
      </AnswerList>

      <button
        className="btn btn--next"
        onClick={() => dispatch({ type: "setIndex" })}
      >
        Next
      </button>
    </div>
  );
}

function AnswerList({ children }) {
  return <ul className="answer-list">{children}</ul>;
}

function Question({ questions, index }) {
  return <h3 className="question">{questions[index].question}</h3>;
}

function Answer({ option }) {
  return (
    <li className="btn btn--answer">
      <p className="answer">{option}</p>
    </li>
  );
}
