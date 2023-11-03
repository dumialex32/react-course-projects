import { useState, useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import ButtonNext from "./ButtonNext";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import ButtonReset from "./ButtonReset";
import CountDown from "./CountDown";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  min: 5,
  sec: 0,
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
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "setCountdown":
      return {
        ...state,
        min: state.sec === 0 ? state.min - 1 : state.min,
        sec: state.sec === 0 ? 59 : state.sec - 1,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, min, sec },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(sec);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (points, curPoints) => (points += curPoints.points),
    0
  );

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
            <ProgressBar
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <ButtonNext
              answer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
            />
            <CountDown min={min} sec={sec} dispatch={dispatch} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          >
            <ButtonReset dispatch={dispatch} />
          </FinishScreen>
        )}
      </Main>
    </div>
  );
}
