export default function ButtonNext({ answer, dispatch }) {
  if (answer === null) return null;

  return (
    <button
      className="btn btn--next"
      onClick={() => dispatch({ type: "setIndex" })}
    >
      Next
    </button>
  );
}
