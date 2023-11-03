export default function Answer({
  correctOption,
  option,
  dispatch,
  answerIndex,
  answer,
}) {
  const isAnswer = answer !== null;
  return (
    <li
      className={`btn btn-answer ${
        answerIndex === answer ? "answer-selected" : ""
      } ${answerIndex === correctOption ? "correct" : "wrong"}`}
      onClick={() => {
        dispatch({ type: "setAnswer", payload: answerIndex });
      }}
    >
      <p className="answer">{option}</p>
    </li>
  );
}
