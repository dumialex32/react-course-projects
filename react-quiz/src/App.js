import { useState, useEffect, useReducer } from "react";
import { Header } from "./components/Header.js";
import { Introduction } from "./components/Introduction.js";
import { Main } from "./components/Main.js";
import ButtonNext from "./components/ButtonNext.js";
import { Quiz } from "./components/Quiz.js";
import { Error } from "./components/Error.js";
import { Loader } from "./components/Loader.js";
import { CountDown } from "./components/CountDown.js";
import { fetchQuestions } from "./fetchQuestions.js";
import Results from "./components/Results.js";

const initialState = {
  isOpen: false,

  questions: [],
  error: "",
  isLoading: false,
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setOpen":
      return { ...state, isOpen: action.payload };

    case "setCountDown":
      if (state.sec === 0) {
        return { ...state, sec: 59, min: state.min - 1 };
      } else {
        return { ...state, sec: state.sec - 1 };
      }

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
  const { isOpen, questions, isLoading, error, index, answer, points } = state;

  const questionLength = questions.length;
  const maxPoints = questions.reduce((acc, curr) => (acc += curr.points), 0);

  const hasFinished = questionLength === index;

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
          {isOpen && !hasFinished && (
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
            </>
          )}

          {hasFinished && <Results />}
        </Main>
      </>
    </div>
  );
}
