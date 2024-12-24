import { Movie } from "./film.model";

export interface RateRequset {
  rate: string;
  imdbID: string;
}

export interface Rating {
  source?: string;
  id?: string;
  value?: string;
  movie?: Movie;
  imdbID?: string;
}
