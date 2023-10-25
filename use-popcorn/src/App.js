import { useRef, useEffect, useState } from "react";
import { fetchMovies } from "./fetchMovies";
import StarRating from "./startRating";
import { fetchLink } from "./globalVar";
import { useLocalStorageItem } from "./useLocalStorageItem";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  console.log(movies);
  const [isOpen1, setIsOpen1] = useState(true);

  const [isOpen2, setIsOpen2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageItem("watched", []);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleRemoveSelected() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatched(id) {
    setWatched((watched) => watched.filter((movies) => movies.imdbID !== id));
  }

  return (
    <div className="app">
      <NavBar>
        <Logo />
        <Search
          onSetMovies={setMovies}
          onSetLoader={setIsLoading}
          onSetError={setError}
          onSetMessage={setMessage}
          onRemoveSelected={handleRemoveSelected}
        />
        <Results movies={movies} />
      </NavBar>

      <Main>
        <Box isOpen={isOpen1} setIsOpen={setIsOpen1}>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList>
              {movies?.map((movie) => (
                <Movie
                  key={movie.imdbID}
                  movie={movie}
                  onSelectMovie={handleSelectMovie}
                />
              ))}
            </MovieList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box isOpen={isOpen2} setIsOpen={setIsOpen2}>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onRemoveSelected={handleRemoveSelected}
              onAddWatchedMovie={handleAddWatchedMovie}
              watchedMovies={watched}
            />
          ) : (
            <>
              <Summary watchedMovies={watched} />
              <WatchedMovieList>
                {watched.map((movie) => (
                  <WatchedMovie
                    key={movie.imdbID}
                    movie={movie}
                    onRemoveWatched={handleRemoveWatched}
                  />
                ))}
              </WatchedMovieList>
            </>
          )}
        </Box>
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
    <div className="logo-container">
      <img className="logo-img" src="/popcornimage.png" alt="popcorn logo " />
      <span>usePopcorn</span>
    </div>
  );
}

function Search(props) {
  const [query, setQuery] = useState("");
  console.log(query);
  const controllerRef = useRef(null);
  const searchBar = useRef(null);

  useEffect(() => {
    searchBar.current.focus();

    function handleKeyDown(e) {
      if (document.activeElement === searchBar.current) return;

      if (e.code === "Enter") searchBar.current.focus();
      setQuery("");
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleSearchMovie(query) {
    setQuery(query);

    if (query.length <= 2) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    props.onRemoveSelected();
    fetchMovies(props, query, controllerRef);
  }

  // useEffect(() => {
  //   const controller = new AbortController();

  //   async function fetchData() {
  //     try {
  //       onSetLoader(true);
  //       onSetError("");

  //       const res = await fetch(`${fetchLink}s=${query}`, {
  //         signal: controller.signal,
  //       });

  //       if (!res.ok)
  //         throw new Error(`Couldn't fetch movie data ${res.statusText}`);

  //       const data = await res.json();

  //       if (data.Error) throw new Error(data.Error);

  //       onSetError("");
  //       onSetMovies(data.Search);
  //     } catch (err) {
  //       err.name !== "AbortError" && onSetError(err.message);

  //       console.dir(err);
  //     } finally {
  //       onSetLoader(false);
  //     }
  //   }

  //   if (query.length < 3) {
  //     onSetError("");
  //     return;
  //   }

  //   onRemoveSelected();
  //   fetchData();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [query, fetchLink, onSetError, onSetMovies, onSetLoader]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleSearchMovie(e.target.value)}
      ref={searchBar}
    ></input>
  );
}

function Results({ movies }) {
  return (
    <div className="results">
      <p>{movies?.length} movie results</p>
    </div>
  );
}

/////////////////// Main /////////////////////
function Main({ children }) {
  return <main className="box-container">{children}</main>;
}

//////////////// Box  /////////////////////
function Box({ children, isOpen, setIsOpen }) {
  return (
    <div className="box">
      <BoxButton isOpen={isOpen} OnSetIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function MovieList({ children }) {
  return <ul className="list">{children}</ul>;
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li className="item-list" onClick={() => onSelectMovie(movie.imdbID)}>
      <div
        className="movie-img-container"
        onError={(e) => {
          e.target.src = "placeholderimg.png";
          // e.target.classList.add("movie-img-error");
        }}
      >
        <img className="item-img" src={movie.Poster} alt={movie.Title} />
      </div>

      <div className="item-list-details">
        <h3 className="title">{movie.Title}</h3>
        <p className="date">📅 {movie.Year}</p>
      </div>
    </li>
  );
}

///////////// WATCHED MOVIE BOX //////////////

//////////////////// WATCHED BOX//////////////

function Summary({ watchedMovies }) {
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
  const avgRuntime = average(watchedMovies.map((movie) => movie.runtime));

  function formatAvarage(num) {
    return Number.isInteger(num) ? num : num.toFixed(1);
  }

  return (
    <div className="summary">
      <h3 className="summary-title">Movies you watched</h3>
      <span>🎦 {watchedMovies.length}</span>
      <span>⭐ {formatAvarage(avgImdbRating)}</span>
      <span>🌟 {formatAvarage(avgUserRating)}</span>
      <span>⏳ {formatAvarage(avgRuntime)} min</span>
    </div>
  );
}

function WatchedMovieList({ children }) {
  return <ul className="list">{children}</ul>;
}

function WatchedMovie({ movie, onRemoveWatched }) {
  return (
    <li className="item-list">
      <div className="movie-img-container">
        <img className="item-img" src={movie.poster} alt={movie.Title} />
      </div>

      <div className="watched-details">
        <h3 className="watched-title">{movie.title}</h3>
        <span className="date">{movie.imdbRating} ⭐</span>
        <span className="date">{movie.userRating} 🌟</span>
        <span className="date">{movie.runtime} ⏳</span>
      </div>
      <button
        className="remove-watched"
        onClick={() => onRemoveWatched(movie.imdbID)}
      >
        x
      </button>
    </li>
  );
}

function BoxButton({ isOpen, OnSetIsOpen }) {
  return (
    <button className="box-btn" onClick={() => OnSetIsOpen(!isOpen)}>
      {isOpen ? "-" : "+"}
    </button>
  );
}

function MovieDetails({
  selectedId,
  onRemoveSelected,
  onAddWatchedMovie,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");

  const ratingCount = useRef(0);
  console.log(ratingCount);

  useEffect(() => {
    ratingCount.current = userRating;
  }, [userRating]);

  const isRated = watchedMovies.some((movie) => movie.imdbID === selectedId);

  const currentRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    imdbID,
    Runtime: runtime,
    Plot: plot,
    Poster: poster,
    imdbRating,
    Released: released,
    Genre: genre,
  } = movie;

  function handleAddNewWatched() {
    const newWatchedMovie = {
      title,
      runtime: +runtime.split(" ").at(0),
      poster,
      imdbRating,
      userRating,
      imdbID,
    };

    onAddWatchedMovie(newWatchedMovie);
    onRemoveSelected();
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(`${fetchLink}i=${selectedId}`);

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);

        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    }

    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useKey("Escape", onRemoveSelected);

  return (
    <div className="movie-details">
      {(isLoading && !error && <Loader />) ||
        (!isLoading && !error && (
          <>
            <MovieDetailsHeader
              poster={poster}
              released={released}
              title={title}
              runtime={runtime}
              genre={genre}
              imdbRating={imdbRating}
            />
            <MovieDetailsSection
              plot={plot}
              onHandleAdd={handleAddNewWatched}
              userRating={userRating}
              currentRating={currentRating}
              isRated={isRated}
            >
              <StarRating
                size={24}
                maxRating={10}
                onSetUserRate={setUserRating}
              />
            </MovieDetailsSection>
            <button className="close-movie-details" onClick={onRemoveSelected}>
              &larr;
            </button>
          </>
        )) ||
        (error && <ErrorMessage message={error} />)}
    </div>
  );
}

function MovieDetailsHeader({
  poster,
  released,
  title,
  runtime,
  genre,
  imdbRating,
}) {
  return (
    <header>
      <div
        className="poster"
        onError={(e) => {
          e.target.src = "placeholderimg.png";
          e.target.classList.add("img-error-placeholder");
        }}
      >
        <img src={poster} alt={`poster of ${title} movie`} />
      </div>

      <div className="details">
        <h3 className="title">{title}</h3>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>{genre}</p>
        <p>⭐{imdbRating} IMDB rating</p>
      </div>
    </header>
  );
}

function MovieDetailsSection({
  plot,
  children,
  onHandleAdd,
  userRating,
  currentRating,
  isRated,
}) {
  return (
    <section>
      <div className="rating-container">
        {!isRated ? (
          <>
            {children}
            {userRating && (
              <button className="add-to-list" onClick={onHandleAdd}>
                Add list
              </button>
            )}
          </>
        ) : (
          <p>
            You already rated this movie <span>⭐ {currentRating}</span>
          </p>
        )}
      </div>

      <p className="plot">{plot}</p>
    </section>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error" style={{ color: "red" }}>
      <span>💣 </span>
      {message}
    </p>
  );
}

function Message({ message }) {
  return <p className="message">{message}</p>;
}
