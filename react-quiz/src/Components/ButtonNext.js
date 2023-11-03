export default function ButtonNext({ answer, dispatch, numQuestions, index }) {
  const hasAnswered = answer !== null;

  if (!hasAnswered) return null;

  return (
    <>
      {index + 1 < numQuestions ? (
        <button
          className="btn"
          onClick={() => dispatch({ type: "changeQuestion" })}
        >
          Next
        </button>
      ) : (
        <button className="btn" onClick={() => dispatch({ type: "finish" })}>
          See results
        </button>
      )}
    </>
  );
}
