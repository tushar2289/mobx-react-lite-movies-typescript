import React, { createContext } from "react";
import { Movie } from "./typings";
import { useLocalStore } from "mobx-react-lite";

interface IStore {
  page: number;
  movies: Movie[];
  queue: Movie[];
  addToQueue: Function;
  like: Function;
  dislike: Function;
  fetchAll: Function;
}

export const MoviesContext = createContext({} as IStore);

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useLocalStore(() => ({
    page: 1,
    movies: [] as Movie[],
    get queue() {
      return store.movies.filter((m) => m.inQueue);
    },
    addToQueue: (movie: Movie) => {
      movie.inQueue = true;
    },
    like: (movie: Movie) => {
      movie.score++;
    },
    dislike: (movie: Movie) => {
      movie.score--;
    },
    fetchAll: async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?s=action&page=${store.page}&apikey=4640ef30`
      );
      const newMovies = await response.json();
      const updatedMovies: Movie[] = newMovies.Search.map((m: Movie) => ({
        ...m,
        score: 0,
      }));
      store.movies.unshift(...updatedMovies);
      store.page++;
    },
  }));

  return (
    <MoviesContext.Provider value={store}>{children}</MoviesContext.Provider>
  );
};
