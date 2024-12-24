import { Pageable, Sort } from "./app.model";
import { Rating } from "./rating.model";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  rating?: string;
}

export interface SearchMovieRequset {
  keyword?: string;
  type?: string;
  year?: string;
  page?: number;
  pageSize?: number;
}

export interface MovieResponse {
  Search?: Movie[];
  Response?: string;
  totalResults?: string;
  Error?: string;
}

export interface MovieDbResponse {
  content: MovieSummary[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface MovieDb {
  id: number;
  imdbID: string;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  metascore: string;
  imdbRating: string;
  imdbVotes: string;
  type: string;
  boxOffice?: string;
  production?: string;
  website?: string;
  response: string;
  ratings: Rating[];
  dvd?: string;
  userRating?: string;
  avgRating?: string;
}

export interface MovieSummary {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
  avgRating: number;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
  Error?: string;
}
