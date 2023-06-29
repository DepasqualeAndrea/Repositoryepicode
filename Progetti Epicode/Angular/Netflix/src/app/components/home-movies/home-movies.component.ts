import { Component, NgModule, OnInit, SchemaMetadata } from '@angular/core';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Subscription, min } from 'rxjs';
import { Movies } from 'src/app/modules/movies.interface';
import { Favourites } from 'src/app/modules/favourites.interface';
import { AuthService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth-interface.interface';
import { FavouritesMovies } from 'src/app/modules/favourites-movies.interface';
//import { LoginComponent } from 'src/app/auth/login/login.component';
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
    newLikedYet!: Favourites | null;
    loadIntro = true;
    number = Math.floor(Math.random() * 10) + 1;
    in_trending: any;
    upcoming: any
    most_watch: any;
    top_rated: any;

    user!: AuthInterface | null;

    constructor(private http: CrudServiceService, private authService: AuthService, private route: Router) {


     }

    ngOnInit(): void {


        this.sub! = this.http.getMovies().subscribe((trend: any) => {
            this.in_trending = trend
            console.log(this.in_trending);
        });

        this.sub! = this.http.getMoviesPopular().subscribe((popular: any) => {
            this.upcoming = popular;
            console.log(this.upcoming);

        })

        this.sub! = this.http.getFavourites().subscribe((watched: any) => {
            this.most_watch = watched;
            console.log(this.most_watch);
        })
        this.sub! = this.http.getToprated().subscribe((top: any) => {
            this.top_rated = top;
            console.log(this.top_rated);
        })

    }

   getLiked(movieId: number, userId: number) {
        const userID = this.authService.getUserId();
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
            const filmfavoriti = this.filmLiked!.find((fav) => fav.id === movieId)?.id

            this.newLikedYet = {
                userId: userId!,
                movieId: movieId,
                id: filmfavoriti
            };
            this.http
                .likeMovies(this.newLikedYet)
                .subscribe((favorite: Favourites) => {
                    this.filmLiked!.push(favorite);
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




