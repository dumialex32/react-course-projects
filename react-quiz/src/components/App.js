import { useState, useEffect, useReducer } from "react";
import { Header } from "./Header.js";
import { Introduction } from "./Introduction.js";
import { Main } from "./Main.js";
import ButtonNext from "./ButtonNext.js";
import { Quiz } from "./Quiz.js";
import { Error } from "./Error.js";
import { Loader } from "./Loader.js";
import { Countdown } from "./Countdown.js";
import { fetchQuestions } from "../fetchQuestions.js";
import Results from "./Results.js";
import ButtonReset from "./ButtonReset.js";

const initialState = {
  isOpen: false,
  questions: [],
  error: "",
  isLoading: false,
  isFinished: false,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 30,
};

const SECS = 30;

function reducer(state, action) {
  switch (action.type) {
    case "setOpen":
      return {
        ...state,
        isOpen: action.payload,
        // secondsRemaining: state.questions.length * SECS,
      };

    case "setCountdown":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        // isFinished: state.secondsRemaining === 0 ? true : false,
      };

    case "setQuestions":
      return { ...state, questions: action.payload };

    case "setError":
      return { ...state, error: action.payload };

    case "setIsLoading":
      return { ...state, isLoading: action.payload };

    case "setIndex":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "setAnswer":
      return {
        ...state,
        answer: action.payload.answer,
        points: state.points + action.payload.answerPoints,
      };

    case "setResults":
      return {
        ...state,
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
        isFinished: true,
      };

    case "reset":
      return {
        ...initialState,
        highscore: state.highscore,
        isOpen: true,
        questions: state.questions,
      };

    // return {
    //   ...state,
    //   answer: action.payload,
    //   points:
    //     state.questions[state.index].correctOption === action.payload
    //       ? state.points + state.questions[state.index].points
    //       : state.points,
    // };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isOpen,
    questions,
    isLoading,
    error,
    index,
    answer,
    points,
    highscore,
    isFinished,
    secondsRemaining,
  } = state;

  const questionLength = questions.length;
  const maxPoints = questions.reduce((acc, curr) => (acc += curr.points), 0);

  useEffect(() => {
    fetchQuestions(dispatch);
  }, []);

  return (
    <div className="app">
      <Header />
      {error && <Error errorMsg={error} dispatch={dispatch} />}

      {!isOpen && isLoading && <Loader />}

      {!isOpen && !isLoading && (
        <Introduction dispatch={dispatch} questions={questions} />
      )}

      <>
        <Main>
          {isOpen && !isFinished && (
            <>
              <Quiz
                dispatch={dispatch}
                question={questions}
                index={index}
                answer={answer}
                questionLength={questionLength}
                points={points}
                maxPoints={maxPoints}
              />

              <ButtonNext
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionLength={questionLength}
              />
              <Countdown
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
            </>
          )}

          {isFinished && (
            <Results
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
            >
              <ButtonReset dispatch={dispatch} />
            </Results>
          )}
        </Main>
      </>
    </div>
  );
}
