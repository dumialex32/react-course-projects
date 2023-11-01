import { useState, useEffect, useReducer } from "react";
import { Header } from "./Header.js";
import { Introduction } from "./Introduction.js";
import { Main } from "./Main.js";
import { Input } from "./Input.js";
import { Quiz } from "./Quiz.js";
import { Error } from "./Error.js";
import { Loader } from "./Loader.js";
import { CountDown } from "./CountDown.js";

const initialState = {
  isOpen: false,
  min: 5,
  sec: 0,
  questions: [],
  error: "",
  isLoading: false,
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

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen, min, sec, questions, isLoading, error } = state;

  return (
    <div className="app">
      <Header />
      {!isOpen && isLoading && <Loader />}
      {!isOpen && !isLoading ? (
        <Introduction dispatch={dispatch} />
      ) : (
        <>
          {error && <Error errorMsg={error} dispatch={dispatch} />}
          {!error && !isLoading && (
            <Main>
              <Input />
              <Quiz questions={questions} />
              {/* <CountDown dispatch={dispatch} min={min} sec={sec} /> */}
            </Main>
          )}
        </>
      )}
    </div>
  );
}
