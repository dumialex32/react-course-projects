import { useEffect, useRef } from "react";

export function Introduction({ dispatch, questions }) {
  function openQuiz() {
    dispatch({ type: "setOpen", payload: true });
  }

  return (
    <div className="introduction-container">
      <div className="introduction">
        <h2>Welcome to The React Quiz!</h2>
        <h3>{questions.length} questions to test your react mastery</h3>
      </div>

      <button className="btn" onClick={openQuiz}>
        Let's start!
      </button>
    </div>
  );
}
