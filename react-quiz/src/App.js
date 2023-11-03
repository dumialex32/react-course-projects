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

const initialState = {
  isOpen: false,
  min: 5,
  sec: 0,
  questions: [],
  error: "",
  isLoading: false,
  index: 0,
  answer: null,
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
        answer: null,
      };

    case "setAnswer":
      return { ...state, answer: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen, min, sec, questions, isLoading, error, index, answer } =
    state;

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
              <Quiz
                dispatch={dispatch}
                question={questions}
                index={index}
                answer={answer}
              />
              {/* <CountDown dispatch={dispatch} min={min} sec={sec} /> */}
              <ButtonNext dispatch={dispatch} answer={answer} />
            </Main>
          )}
        </>
      )}
    </div>
  );
}
