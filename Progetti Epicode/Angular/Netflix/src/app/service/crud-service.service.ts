import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Users } from '../modules/users.interface';
import { environment } from 'src/environments/environment';
import { Movies } from '../modules/movies.interface';
import { Favourites } from '../modules/favourites.interface';
import { FavouritesMovies } from '../modules/favourites-movies.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {
    like(newLiked: Favourites) {
        throw new Error('Method not implemented.');
    }

        baseURL = environment.baseUrl;
        //key = environment.apyKey
        newMovies: Movies [] = [];
        newFavourites: FavouritesMovies[] | undefined;
        filmLiked: Favourites[] | undefined;
        favouritesMovies!: Favourites;


  constructor(private http: HttpClient) { }

    getMovies(){
       return this.http.get<Movies[]>(`${this.baseURL}movies-popular`); //end point/upcoming, /popular, /latest, /top_rated , /now_playing (tmdb)
    }

    getMoviesPopular(){
        return this.http.get<FavouritesMovies[]>(`${this.baseURL}movies-toprated`);
     }

    getFavourites(){
        return this.http.get<Favourites[]>(`http://localhost:4201/favorites`);
    }

    likeMovies(data: Favourites ){
        return this.http.post<Favourites>(`http://localhost:4201/favorites`, data);
    }

    deleteLikedMovies(userId: number ){
       return this.http.delete(`http://localhost:4201/favorites/${userId}` );
    }


}
