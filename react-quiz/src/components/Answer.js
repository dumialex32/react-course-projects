export default function Answer({
  option,
  answer,
  correctOption,
  optionIndex,
  dispatch,
  points,
}) {
  const hasAnswered = answer !== null;

  return (
    <li
      className="answer-list"
      onClick={() =>
        dispatch({
          type: "setAnswer",
          payload: { answer: optionIndex, answerPoints: points },
        })
      }
    >
      <button
        className={`btn btn-answer ${
          optionIndex === answer ? "answer-selected" : ""
        } ${
          hasAnswered
            ? optionIndex === correctOption
              ? "correct"
              : "wrong"
            : ""
        }`}
        disabled={hasAnswered}
      >
        {option}
      </button>
    </li>
  );
}
