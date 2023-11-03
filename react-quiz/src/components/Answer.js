export default function Answer({
  correctOption,
  option,
  dispatch,
  answerIndex,
  answer,
}) {
  const hasAnswered = answer !== null;
  return (
    <li
      onClick={() => {
        dispatch({ type: "setAnswer", payload: answerIndex });
      }}
    >
      <button
        className={`btn btn-answer ${
          answerIndex === answer ? "answer-selected" : ""
        } ${
          hasAnswered
            ? answerIndex === correctOption
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
