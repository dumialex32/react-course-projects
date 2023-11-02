import { useState, useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import ButtonNext from "./ButtonNext";
import ProgressBar from "./ProgressBar";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const curQuestion = state.questions.at(state.index);
      const isCorrect = action.payload === curQuestion.correctOption;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + curQuestion.points : state.points,
      };

    case "changeQuestion":
      return {
        ...state,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
        answer: null,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(answer);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => {
        if (!res.ok)
          throw new Error("An error has occured while fetching data");
        return res.json();
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <ProgressBar questions={questions} index={index} points={points} />
            <ButtonNext answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
