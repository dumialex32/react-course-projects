function Options({ question, dispatch, answer }) {
  const isAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          key={option}
          className={`btn btn-option ${
            isAnswer && i === answer ? "answer" : ""
          } ${isAnswer && i === question.correctOption ? "correct" : "wrong"}
           `}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={isAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
