import DateCounter from "./DateCounter";
import { useState, useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Main></Main>
    </div>
  );
}
