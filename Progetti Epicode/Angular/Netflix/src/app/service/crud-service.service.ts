import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Users } from '../modules/users.interface';
import { environment } from 'src/environments/environment';
import { Movies } from '../modules/movies.interface';
import { Favourites } from '../modules/favourites.interface';
import { FavouritesMovies } from '../modules/favourites-movies.interface';
import { AuthService } from './auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class CrudServiceService {
    like(newLiked: Favourites) {
        throw new Error('Method not implemented.');
    }

    baseURL = environment.baseUrl;
    TMDB = environment.TMDBbaseUrl
    ApyKey = environment.apyKeyTMDB
    //key = environment.apyKey
    Movie: Movies[] = [];
    newFavourites: FavouritesMovies[] | undefined;
    filmLiked: Favourites[] | undefined;
    favouritesMovies!: Favourites;


    constructor(private http: HttpClient, private authService: AuthService) { }

    /*getMovies(){ //metodo con il local json
      return this.http.get<Movies[]>(`${this.baseURL}movies-popular`); //end point/upcoming, /popular, /latest, /top_rated , /now_playing (tmdb)
     }
    getMovies() {//metodo con api firebase
         return this.http.get(`${this.baseURL}now_playing.json?auth=${this.authService.user!.token}`); //end point/upcoming, /popular, /latest, /top_rated , /now_playing (tmdb) //?auth=${this.authService.user!.token} codice per token verifica login per abilitare la get
     }*/

    getMovies() {
        return this.http.get(`${this.TMDB}movie/upcoming?api_key=${this.ApyKey}`); //end point/upcoming, /popular, /latest, /top_rated , /now_playing (tmdb) //?auth=${this.authService.user!.token} codice per token verifica login per abilitare la get
    }

    getMoviesPopular() {
        return this.http.get(`${this.TMDB}trending/movie/day?api_key=${this.ApyKey}`);
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
    getLatest() {
        return this.http.get(`${this.TMDB}movie/latest?api_key=${this.ApyKey}`);
    }
    getPopular() {
        return this.http.get(`${this.TMDB}movie/popular?api_key=${this.ApyKey}`);
    }
    //get per i dettagli dei films

    getMovieDetails(data: any) {
        return this.http.get(`${this.TMDB}movie/${data}?api_key=${this.ApyKey}`)
    }
    getSearchMovies(data: any) {
        return this.http.get(`${this.TMDB}search/tv?api_key=${this.ApyKey}&query=${data.movieName}`)
    }
    getMovieVideo(data: any) {
        return this.http.get(`${this.TMDB}movie/${data}/videos?api_key=${this.ApyKey}`)
    }

    likeMovies(data: Favourites) {
        return this.http.post<Favourites>(`http://localhost:4201/favorites`, data);
    }

    deleteLikedMovies(userId: number) {
        return this.http.delete(`http://localhost:4201/favorites/${userId}`);
    }


}
