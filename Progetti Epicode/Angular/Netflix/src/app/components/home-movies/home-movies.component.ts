import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Subscription, min } from 'rxjs';
import { Movies } from 'src/app/modules/movies.interface';
import { Favourites } from 'src/app/modules/favourites.interface';
import { AuthService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth-interface.interface';
import { FavouritesMovies } from 'src/app/modules/favourites-movies.interface';
@Component({
    selector: 'app-home-movies',
    templateUrl: './home-movies.component.html',
    styleUrls: ['./home-movies.component.scss']
})
export class HomeMoviesComponent implements OnInit {

    sub!: Subscription;
    newMovies: Movies[] | undefined;
    newFavourites: FavouritesMovies[] | undefined;


    filmLiked: Favourites[] | undefined;
    newLiked!: Favourites;

    loadIntro = false;
    number = Math.floor(Math.random() * 10) + 1;

    user!: AuthInterface | null;

    constructor(private http: CrudServiceService, private authService: AuthService) { }

    ngOnInit(): void {
        this.sub! = this.http.getMovies().subscribe((movies: Movies[]) => {
            this.newMovies = movies;
            console.log(this.newMovies);
        });

        this.sub! = this.http.getMoviesPopular().subscribe((favourites_movie: FavouritesMovies[]) => {
            this.newFavourites = favourites_movie;
        })

        this.sub! = this.http.getFavourites().subscribe((filmLiked: Favourites[]) => {
            this.filmLiked = filmLiked;
            console.log(this.filmLiked);
        })

        this.authService.user$.subscribe((_user) => {
            this.user = _user;
        });
    }

    getLiked(movieId: number) {
        const userId = this.authService.getUserId();
        const likedDone = this.filmLiked!.find(
            (fav) => fav.userId === userId && fav.movieId === movieId
        );

        if (likedDone) {
            // RIMUOVO DAI PREFERITI
            this.http.deleteLikedMovies(likedDone.id!).subscribe(() => {
                const favoriteIndex = this.filmLiked!.indexOf(likedDone);
                if (favoriteIndex !== -1) {
                    this.filmLiked!.splice(favoriteIndex, 1);
                }
            });
            console.log(likedDone)
        } else {
            // AGGIUNGO AI PREFERITI
            const newLiked: Favourites = {
                userId: userId!,
                movieId: movieId,
                id: 0 ,
            };
            this.http
                .likeMovies(newLiked)
                .subscribe((favorite: Favourites) => {
                    this.filmLiked!.push(newLiked);
                    console.log('Film preferito aggiunto con successo:', favorite);
                    console.log('Film preferiti dagli utenti:', this.filmLiked);
                });
        }
    }

    favouriteCount(movieId: number): boolean {
        const userId = this.authService.getUserId();
        return !!this.filmLiked?.find((favour) => favour.userId === userId && favour.movieId === movieId)
    }



    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();;
        }
    }

}




