import { Movie } from "../typings";
import React, { useContext } from "react";
import MyMovie from "./MyMovie";
import { MoviesContext } from "../Movies-mobx";
import { observer } from "mobx-react-lite";

const Queue = () => {
  const { queue } = useContext(MoviesContext);
  return (
    <div className="movies">
      {queue.map((m: Movie) => (
        <MyMovie key={m.imdbID} movie={m} />
      ))}
    </div>
  );
};

export default observer(Queue);
