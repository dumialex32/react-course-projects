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
    <div>
      {!showResults && (
        <button
          className="btn btn--next"
          onClick={() => dispatch({ type: "setIndex" })}
        >
          Next
        </button>
      )}

      {showResults && (
        <button
          className="btn btn-next"
          onClick={() => dispatch({ type: "setResults" })}
        >
          See Results
        </button>
      )}
    </div>
  );
}
