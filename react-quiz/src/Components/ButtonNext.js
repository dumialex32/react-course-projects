export default function ButtonNext({ answer, dispatch }) {
  if (answer === null) return null;
  return (
    <button
      className="btn"
      onClick={() => dispatch({ type: "changeQuestion" })}
    >
      Next
    </button>
  );
}
