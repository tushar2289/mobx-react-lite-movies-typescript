import { useState, useRef, useCallback } from "react";
import { Movie } from "./typings";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const page = useRef(1);

  const fetchAll = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=action&page=${page.current}&apikey=4640ef30`
    );
    const newMovies = await response.json();
    setMovies((movies) => [
      ...newMovies.Search.map((m: Movie) => ({ ...m, score: 0 })),
      ...movies,
    ]);
    page.current++;
  };

  const addToQueue = useCallback((movie: Movie) => {
    setMovies((movies) => {
      const moviesCopy: Movie[] = [...movies];
      const idx = moviesCopy.indexOf(movie);
      moviesCopy.splice(idx, 1, { ...movie, inQueue: true });
      return moviesCopy;
    });
  }, []);

  const like = useCallback((movie: Movie) => {
    setMovies((movies) => {
      const moviesCopy: Movie[] = [...movies];
      const idx = moviesCopy.indexOf(movie);
      moviesCopy.splice(idx, 1, {
        ...movie,
        score: moviesCopy[idx].score + 1,
      });
      return moviesCopy;
    });
  }, []);

  const dislike = useCallback((movie: Movie) => {
    setMovies((movies) => {
      const moviesCopy: Movie[] = [...movies];
      const idx = moviesCopy.indexOf(movie);
      moviesCopy.splice(idx, 1, {
        ...movie,
        score: moviesCopy[idx].score - 1,
      });
      return moviesCopy;
    });
  }, []);

  return {
    movies,
    queue: movies.filter((m: Movie) => m.inQueue),
    addToQueue,
    like,
    dislike,
    fetchAll,
  };
};
