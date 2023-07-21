import { Component, Input, NgModule, OnInit, SchemaMetadata } from '@angular/core';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Subscription, min, pluck, switchMap } from 'rxjs';
import { Movies } from 'src/app/modules/movies.interface';
import { Favourites } from 'src/app/modules/favourites.interface';
import { AuthService } from 'src/app/service/auth-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth-interface.interface';
import { FavouritesMovies } from 'src/app/modules/favourites-movies.interface';
import { visitAll } from '@angular/compiler';
import { FormControl, FormGroup } from '@angular/forms';

//import { LoginComponent } from 'src/app/auth/login/login.component';
//declare function getScrollVal(): any
///declare function scrollR(): any
//declare function scrollL(): any
@Component({
    selector: 'app-home-movies',
    templateUrl: './home-movies.component.html',
    styleUrls: ['./home-movies.component.scss']
})
export class HomeMoviesComponent implements OnInit {

    slideConfig = {
        "slidesToShow": 5,
        "slidesToScroll": 5,
        "autoplay": true,
        "speed": 1000,
        "autoplaySpeed": 3000,
        "pauseOnOver": true,
        "infinite": true,
        "arrows": true,
        "responsive": [{
            "breakpoint": 992,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 4,
                "slideToScroll": 4,
            }
        },
        {
            "breakpoint": 768,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 3,
                "slideToScroll": 3,
            }
        },
        {
            "breakpoint": 567,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 2,
                "slideToScroll": 2,
            }
        }]
    }







    sub!: Subscription;
    // newMovies: Movies[] | undefined;
    //newFavourites: FavouritesMovies[] | undefined;
    //filmLiked: Favourites[] | undefined;
    //newLikedYet!: Favourites | null;
    loadIntro = true;



    number = Math.floor(Math.random() * 10) + 1;
    in_trending: any;
    upcoming: any
    most_watch: any;
    top_rated: any;
    discovered: any;
    latest: any;
    popular: any;
    user!: AuthInterface;
    homepage = true;
    searched: any;
    detail: any;

    @Input() movieId!: number; // Ricevi l'ID del film come input dal componente padre

    movieDetails: any; // Variabile per memorizzare i dettagli del film
    showModal = false; // Variabile per mostrare/nascondere il modale
    selectedMovieId!: number; // Variabile per memorizzare l'ID del film selezionato



    constructor(private http: CrudServiceService, private authService: AuthService, private route: Router, private details: ActivatedRoute) {
    }


    openModal(movieId: number) {
        this.selectedMovieId = movieId;
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
    }

    ngOnInit(): void {
        this.sub! = this.http.getMovieDetails(this.selectedMovieId).subscribe(data =>{
           this.movieDetails = data;
        })


        this.sub! = this.http.getMovies().subscribe((trend: any) => {
            this.in_trending = trend.results
            console.log(this.in_trending);
        });

        this.sub! = this.http.getMoviesPopular().subscribe((popular: any) => {
            this.upcoming = popular.results
            console.log(this.upcoming);

        })

        this.sub! = this.http.getFavourites().subscribe((watched: any) => {
            this.most_watch = watched.results
            console.log(this.most_watch);
        })

        this.sub! = this.http.getToprated().subscribe((top: any) => {
            this.top_rated = top.results
            console.log(this.top_rated);
        })
        this.sub! = this.http.getToprated().subscribe((discover: any) => {
            this.discovered = discover.results
            console.log(this.top_rated);
        })
        this.sub! = this.http.getToprated().subscribe((latest: any) => {
            this.latest = latest.results
            console.log(this.top_rated);
        })
        this.sub! = this.http.getToprated().subscribe((popular: any) => {
            this.popular = popular.results
            console.log(this.top_rated);
        })






    }







    searchForm = new FormGroup({
        'movieName': new FormControl(null)
    })
    submitForm() {
        console.log(this.searchForm.value, 'search');
        this.sub! = this.http.getSearchMovies(this.searchForm.value).subscribe((result: any) => {
            console.log(result, 'searchMovies##');
            this.searched = result.results;
        })
        this.searchForm.reset();
    }

    allTheOthers = {
        "slidesToShow": 5,
        "slidesToScroll": 4,
        "speed": 1000,
        "autoplay": true,
        "pauseOnOver": true,
        "infinite": true,
        "arrows": true,
        "responsive": [{
            "breakpoint": 992,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 4,
                "slideToScroll": 4,
            }
        },
        {
            "breakpoint": 768,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 3,
                "slideToScroll": 3,
            }
        },
        {
            "breakpoint": 567,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 2,
                "slideToScroll": 2,
            }
        }]
    }


    topTen = {
        "slidesToShow": 5,
        "slidesToScroll": 5,
        "speed": 1000,
        "autoplay": true,
        "pauseOnOver": true,
        "infinite": true,
        "arrows": true,
        "responsive": [{
            "breakpoint": 992,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 4,
                "slideToScroll": 4,
            }
        },
        {
            "breakpoint": 768,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 3,
                "slideToScroll": 3,
            }
        },
        {
            "breakpoint": 567,
            "settings": {
                "arrows": true,
                "infinite": true,
                "slideToShow": 2,
                "slideToScroll": 2,
            }
        }]
    }
    /*getLiked(movieId: number, userId: number) {
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
 */




    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();;
        }
    }

}




