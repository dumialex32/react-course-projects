import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./startRating";

// function Test() {
//   const [movieRate, setMovieRate] = useState(0);

//   return (
//     <div>
//       <StarRating maxRating={7} onSetMovieRate={setMovieRate} />
//       <p>This movie has been rated {movieRate} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} color="#ffd43b" size={24} />
    <StarRating
      messages={["Very bad", "Bad", "Good", "Very good", "Excelent"]}
    />
    <Test /> */}
  </React.StrictMode>
);
