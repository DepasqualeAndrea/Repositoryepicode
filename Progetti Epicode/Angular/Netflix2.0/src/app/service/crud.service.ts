import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../interface/movie.interface';
import { FavouriteMovies } from '../interface/favourite-movies.interface';
import { environment } from 'src/environments/environment';
import { NowPlaying } from '../interface/now-playing.interface';
import { Toprated } from '../interface/toprated.interface';
import { Piuvisti } from '../interface/piuvisti.interface';
import { Popular } from '../interface/popular.interface';
import { Favourites } from '../interface/favourites.interface';
@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  nowPlaying: NowPlaying[] = [];
  toprated: Toprated[] = [];
  piuVisti: Piuvisti[] = [];
  popular: Popular[] = [];
  Movie: Movie[] = [];



  newFavourites: FavouriteMovies[] | undefined;
  filmLiked: Favourites[] | undefined;
  favouritesMovies!: Favourites;
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }
  getMoviesUpComing() { //metodo con il local json
    return this.http.get<Movie[]>(`${this.baseUrl}upcoming`);
  }
  getMoviesPopular() { //metodo con il local json
    return this.http.get<Popular[]>(`${this.baseUrl}movies-popular`);
  }
  getMoviesToprated() { //metodo con il local json
    return this.http.get<Toprated[]>(`${this.baseUrl}toprated`);
  }
  getMoviesNowPlaying() { //metodo con il local json
    return this.http.get<NowPlaying[]>(`${this.baseUrl}now_playing`);
  }
  getMoviespiuVisti() { //metodo con il local json
    return this.http.get<Piuvisti[]>(`${this.baseUrl}piuVisti`);
  }
  getMovieFavourite() { //metodo con il local json
    return this.http.get<Favourites[]>(`${this.baseUrl}favorites`);
  }
  //metodo per i like e i delete dei like
  getMovieDetails(data: any) {
    return this.http.get(`${this.baseUrl}${data}`)
}

  likeMovies(data: Favourites) {
    return this.http.post<FavouriteMovies[]>(`${this.baseUrl}favorites`, data);
  }

  deleteLikedMovies(movieId: number) {
    return this.http.delete(`${this.baseUrl}favorites/${movieId}`);
  }
}
