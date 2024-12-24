import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDb, MovieDbResponse, MovieDetails, MovieResponse, SearchMovieRequset } from '@models/film.model';
import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { RateRequset, Rating } from '@models/rating.model';
import { Ids } from '@models/app.model';
import { baseUrl } from '@config/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {}

  getFilmsFromOm(movieRequset:SearchMovieRequset): Observable<MovieResponse> {
    return this.http.post<MovieResponse>(baseUrl + `/api/movie/om/search`, movieRequset);
  }

  getFilmsFromDb(movieRequset:SearchMovieRequset): Observable<MovieDbResponse> {
    return this.http.post<MovieDbResponse>(baseUrl + `/api/movie/db/search`, movieRequset);
  }

  getFilmDetailsByIdFromOm(id:string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(baseUrl + `/api/movie/om/${id}`);
  }

  getFilmDetailsByIdFromDb(id:string): Observable<MovieDb> {
    return this.http.get<MovieDb>(baseUrl + `/api/movie/db/${id}`);
  }

  saveMoviesInDb(ids:Ids): Observable<MovieDb[]> {
    return this.http.post<MovieDb[]>(baseUrl + `/api/movie/db/save`, ids);
  }

  deleteMoviesInDb(ids:Ids): Observable<HttpHeaderResponse> {
    return this.http.post<HttpHeaderResponse>(baseUrl + `/api/movie/db/delete`, ids);
  }

  rateMovie(rateRequset:RateRequset): Observable<HttpResponse<Rating>> {
    return this.http.post<HttpResponse<Rating>>(baseUrl + `/api/movie/db/rate`, rateRequset);
  }

}
