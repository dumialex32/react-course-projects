export async function fetchQuestions(dispatch) {
  try {
    dispatch({ type: "setError", payload: false });
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
}
