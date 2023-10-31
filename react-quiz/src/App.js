import { useState, useEffect, useReducer } from "react";

const initialState = {
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setOpen":
      return { ...state, isOpen: !state.isOpen };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isOpen } = state;
  console.log(isOpen);
  return (
    <div className="app">
      <Header />
      {!isOpen ? (
        <Introduction dispatch={dispatch} />
      ) : (
        <Main>
          <Input />
          <Quiz />
        </Main>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <img className="logo" alt="logo" src="/logo.png" />
      <h1>THE REACT QUIZ</h1>
    </header>
  );
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function Introduction({ dispatch }) {
  return (
    <div className="introduction-container">
      <div className="introduction">
        <h2>Welcome to The React Quiz!</h2>
        <h3>15 questions to test your react mastery</h3>
      </div>

      <button className="btn" onClick={() => dispatch({ type: "setOpen" })}>
        Let's start!
      </button>
    </div>
  );
}

function Input() {
  return (
    <div className="input-container">
      <input type="range" min="0" max="15"></input>
      <p className="question-num">Question x / 15</p>
      <p className="points">x / 280 points</p>
    </div>
  );
}

function Quiz() {
  return (
    <div className="quiz-container">
      <h3 className="question">Which is the most popular js framework ?</h3>

      <ul className="answer-list">
        <li className="answer">React</li>
        <li className="answer">Vue</li>
        <li className="answer">Angular</li>
        <li className="answer">Other</li>
      </ul>

      <p className="btn timer">timer</p>
    </div>
  );
}
