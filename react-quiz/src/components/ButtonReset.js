export default function ButtonReset({ dispatch }) {
  return (
    <button className="btn" onClick={() => dispatch({ type: "reset" })}>
      Reset
    </button>
  );
}
