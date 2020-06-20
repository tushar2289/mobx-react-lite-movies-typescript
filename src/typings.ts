import { type } from "os";

export type Movie = {
  imdbID: number;
  inQueue: boolean;
  score: number;
  Title?: string;
  Poster?: string;
};
