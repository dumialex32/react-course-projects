import { fetchLink } from "./globalVar";
export function fetchMovies(
  { onSetMovies, onSetLoader, onSetError },
  query,
  controllerRef
) {
  console.log(query);

  async function searchMovie(query) {
    console.log(query);
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      onSetError("");
      onSetLoader(true);
      const res = await fetch(`${fetchLink}s=${query}`, {
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(res.Error);

      const data = await res.json();

      if (data.Response === "False") throw new Error(data.Error);

      onSetMovies(data.Search);
    } catch (err) {
      if (err.name !== "AbortError") onSetError(err.message);

      console.dir(err);
    } finally {
      onSetLoader(false);
    }
  }
  searchMovie(query);
}
