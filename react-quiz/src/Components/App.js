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
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,

  secondsRemaining: null,
};

const SECS = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS,
      };

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

    case "tick":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining > 0 && state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  console.log(status);

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

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <ButtonNext
                answer={answer}
                dispatch={dispatch}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
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
