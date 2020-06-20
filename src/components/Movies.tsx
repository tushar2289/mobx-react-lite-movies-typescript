import { Movie } from "../typings";
import React, { useContext } from "react";
import MyMovie from "./MyMovie";
import { MoviesContext } from "../Movies-mobx";
import { observer } from "mobx-react-lite";

const Movies = () => {
  const { movies } = useContext(MoviesContext);
  return (
    <div className="movies">
      {movies.map((m: Movie) => (
        <MyMovie key={m.imdbID} movie={m} />
      ))}
    </div>
  );
};

export default observer(Movies);
