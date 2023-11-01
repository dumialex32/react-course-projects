export function Error({ errorMsg, dispatch }) {
  return (
    <>
      <p className="error">{errorMsg}</p>
      <button
        className="btn"
        onClick={() => dispatch({ type: "setOpen", payload: false })}
      >
        Back
      </button>
    </>
  );
}
