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

  /* nowPlaying: NowPlaying[] = [];
   toprated: Toprated[] = [];
   piuVisti: Piuvisti[] = [];
   popular: Popular[] = [];
   Movie: Movie[] = [];
   newFavourites: FavouriteMovies[] | undefined;
   filmLiked: Favourites[] | undefined;
   favouritesMovies!: Favourites;*/
  baseUrl = environment.baseURL;
  TMDB = environment.TMDBbaseUrl
  ApyKey = environment.apyKeyTMDB

  constructor(private http: HttpClient) { }
  /* getMoviesUpComing() { //metodo con il local json
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
   }*/
  // tbdb
  nowGetMoviesPopular() { //metodo con il local json
    return this.http.get<Popular[]>(`${this.baseUrl}movies-popular`);
  }
  getMovies() {
    return this.http.get(`${this.TMDB}movie/upcoming?api_key=${this.ApyKey}`); //end point/upcoming, /popular, /latest, /top_rated , /now_playing (tmdb) //?auth=${this.authService.user!.token} codice per token verifica login per abilitare la get
  }

  getMoviesPopular() {
    return this.http.get(`${this.TMDB}trending/movie/day?api_key=${this.ApyKey}`);
  }
  getMoviesPlaying() {
    return this.http.get(`${this.TMDB}movie/now_playing?api_key=${this.ApyKey}`);
  }

  getFavourites() {
    return this.http.get(`${this.TMDB}trending/all/week?api_key=${this.ApyKey}`);
  }
  getToprated() {
    return this.http.get(`${this.TMDB}movie/top_rated?api_key=${this.ApyKey}`);
  }
  getDiscoverTv() {
    return this.http.get(`${this.TMDB}discover/tv?api_key=${this.ApyKey}`);
  }

  getPopular() {
    return this.http.get(`${this.TMDB}movie/popular?api_key=${this.ApyKey}`);
  }

  getMovieDetails(movieId: number) {
    return this.http.get(`${this.TMDB}movie/${movieId}?api_key=${this.ApyKey}`)
  }
  getSearchMovies(data: any) {
    return this.http.get(`${this.TMDB}search/tv?api_key=${this.ApyKey}&query=${data.movieName}`)
  }
  getMovieVideo(data: any) {
    return this.http.get(`${this.TMDB}movie/${data}/videos?api_key=${this.ApyKey}`)
  }
}
