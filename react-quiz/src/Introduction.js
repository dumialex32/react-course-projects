export function Introduction({ dispatch }) {
  async function openQuiz() {
    try {
      dispatch({ type: "setIsLoading", payload: true });

      const res = await fetch("http://127.0.0.1:5000/api/questions");
      if (!res.ok)
        throw new Error("Failed to fetch quiz questions from the server");

      const data = await res.json();
      if (!Array.isArray(data.questions) || data.questions.length === 0)
        throw new Error("Invalid data");

      dispatch({ type: "setQuestions", payload: data.questions });
    } catch (err) {
      console.log(err);
      dispatch({ type: "setError", payload: err.message });
    } finally {
      dispatch({ type: "setIsLoading", payload: false });
    }

    dispatch({ type: "setOpen", payload: true });
  }

  return (
    <div className="introduction-container">
      <div className="introduction">
        <h2>Welcome to The React Quiz!</h2>
        <h3>15 questions to test your react mastery</h3>
      </div>

      <button className="btn" onClick={openQuiz}>
        Let's start!
      </button>
    </div>
  );
}
