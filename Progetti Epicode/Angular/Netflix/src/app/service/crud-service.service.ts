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

    //getMovies(){
    // return this.http.get<Movies[]>(`${this.baseURL}movies-popular`); //end point/upcoming, /popular, /latest, /top_rated , /now_playing (tmdb)
    //}
    getMovies() {
        return this.http.get(`${this.baseURL}now_playing.json?auth=${this.authService.user!.token}`); //end point/upcoming, /popular, /latest, /top_rated , /now_playing (tmdb) //?auth=${this.authService.user!.token} codice per token verifica login per abilitare la get
    }

    getMoviesPopular(){
        return this.http.get(`${this.baseURL}upcoming.json?auth=${this.authService.user!.token}`);
     }

    getFavourites(){
        return this.http.get(`${this.baseURL}piu_visti.json?auth=${this.authService.user!.token}`);
    }
    getToprated(){
        return this.http.get(`${this.baseURL}movies-toprated.json?auth=${this.authService.user!.token}`);
    }

    likeMovies(data: Favourites ){
        return this.http.post<Favourites>(`http://localhost:4201/favorites`, data);
    }

    deleteLikedMovies(userId: number ){
       return this.http.delete(`http://localhost:4201/favorites/${userId}` );
    }


}
