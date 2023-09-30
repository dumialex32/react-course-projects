import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const avarage = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  console.log(movies);

  function handleMovieResults() {
    setMovies(tempMovieData);
  }
  return (
    <div className="app">
      <NavBar>
        <Logo />
        <Search onSetMovies={handleMovieResults} />
        <Results movies={movies} />
      </NavBar>
      <Main>
        <MovieBox>
          <MovieList movies={movies} />
        </MovieBox>
        <WatchedMovieBox />
      </Main>
    </div>
  );
}

///////////////// NavBar ////////////////////

function NavBar({ children }) {
  return <nav className="nav">{children}</nav>;
}

function Logo() {
  return (
    <div>
      <img className="logo-img" src="images/popcorn.png" alt="popcorn" />
    </div>
  );
}

function Search({ onSetMovies }) {
  const [query, setQuery] = useState("");
  console.log(query);
  onSetMovies(tempMovieData);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    ></input>
  );
}

function Results({ movies }) {
  return (
    <div className="results">
      <p>{movies.length} movie results</p>
    </div>
  );
}

/////////////////// Main /////////////////////
function Main({ children }) {
  return <main className="box-container">{children}</main>;
}

//////////////// MovieBox/////////////////////
function MovieBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <BoxButton isOpen={isOpen1} OnSetIsOpen={setIsOpen1} />

      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li className="item-list">
      <img className="item-img" src={movie.Poster} alt={movie.Title} />
      <h3 className="title">{movie.Title}</h3>
      <p className="date">📅 {movie.Year}</p>
    </li>
  );
}

//////////////////// WATCHED BOX//////////////
function WatchedMovieBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <BoxButton isOpen={isOpen2} OnSetIsOpen={setIsOpen2} />
      {isOpen2 && (
        <>
          <Summary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = avarage(watched.map((movie) => movie.imdbRating));
  const avgUserRating = avarage(watched.map((movie) => movie.userRating));
  const avgRuntime = avarage(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h3 className="summary-title">Movies you watched</h3>
      <span>🎦 {watched.length}</span>
      <span>⭐{avgImdbRating}</span>
      <span>🌟{avgUserRating}</span>
      <span>⏳ {avgRuntime} min</span>
    </div>
  );
}

function WatchedList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );

  function WatchedMovie({ movie }) {
    return (
      <li className="item-list">
        <img className="item-img" src={movie.Poster} alt={movie.Title} />
        <h3 className="title">{movie.Title}</h3>
        <span className="date">{movie.imdbRating} ⭐</span>
        <span className="date">{movie.userRating} 🌟</span>
        <span className="date">{movie.runtime} ⏳</span>
      </li>
    );
  }
}

function BoxButton({ isOpen, OnSetIsOpen }) {
  console.log(isOpen);
  return (
    <button className="box-btn" onClick={() => OnSetIsOpen(!isOpen)}>
      {isOpen ? "-" : "+"}
    </button>
  );
}
