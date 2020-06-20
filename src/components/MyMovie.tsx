import { Movie } from "../typings";
import Rating from "./Rating";
import React, { useContext } from "react";
import { MoviesContext } from "../Movies-mobx";
import { observer } from "mobx-react-lite";

const MyMovie = ({ movie }: { movie: Movie }) => {
  const { addToQueue, like, dislike } = useContext(MoviesContext);
  return (
    <div className="movie">
      <div>{movie.Title}</div>
      <img src={movie.Poster} alt={movie.Title} />
      {addToQueue && like && dislike && (
        <>
          <button onClick={() => addToQueue(movie)}>Add to queue</button>
          <button onClick={() => like(movie)}>Like</button>
          <button onClick={() => dislike(movie)}>Dislike</button>
        </>
      )}
      <Rating score={movie.score} />
    </div>
  );
};

export default observer(MyMovie);
