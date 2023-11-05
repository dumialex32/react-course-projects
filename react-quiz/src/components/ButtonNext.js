export default function ButtonNext({
  answer,
  dispatch,
  questionLength,
  index,
}) {
  console.log(questionLength, index);
  const showResults = questionLength === index + 1;

  if (answer === null) return null;

  return (
    <button
      className="btn btn--next"
      onClick={() => dispatch({ type: "setIndex" })}
    >
      {(showResults && "See Results") || "Next"}
    </button>
  );
}
