import { useState, useEffect, useReducer } from "react";
import { Header } from "./Header.js";
import { Introduction } from "./Introduction.js";
import { Main } from "./Main.js";
import { Quiz } from "./Quiz.js";
import { Error } from "./Error.js";
import { Loader } from "./Loader.js";
import { CountDown } from "./CountDown.js";
import { fetchQuestions } from "./fetchQuestions.js";

const initialState = {
  isOpen: false,
  min: 5,
  sec: 0,
  questions: [],
  error: "",
  isLoading: false,
  index: 0,
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
        index:
          state.index === state.questions.length - 1
            ? state.index
            : state.index + 1,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen, min, sec, questions, isLoading, error, index } = state;

  useEffect(() => {
    fetchQuestions(dispatch);
  }, []);

  return (
    <div className="app">
      <Header />
      {!isOpen && isLoading && <Loader />}
      {!isOpen && !isLoading ? (
        <Introduction dispatch={dispatch} questions={questions} />
      ) : (
        <>
          {error && <Error errorMsg={error} dispatch={dispatch} />}
          {!error && !isLoading && (
            <Main>
              <Quiz dispatch={dispatch} questions={questions} index={index} />
              {/* <CountDown dispatch={dispatch} min={min} sec={sec} /> */}
            </Main>
          )}
        </>
      )}
    </div>
  );
}
