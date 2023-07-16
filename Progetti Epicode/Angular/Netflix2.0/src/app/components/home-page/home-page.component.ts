import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavouriteMovies } from 'src/app/interface/favourite-movies.interface';
import { Favourites } from 'src/app/interface/favourites.interface';
import { Movie } from 'src/app/interface/movie.interface';
import { NowPlaying } from 'src/app/interface/now-playing.interface';
import { Piuvisti } from 'src/app/interface/piuvisti.interface';
import { Popular } from 'src/app/interface/popular.interface';
import { Toprated } from 'src/app/interface/toprated.interface';
import { Utente } from 'src/app/interface/utente.interface';
import { AuthService } from 'src/app/service/auth.service';
import { CRUDService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  user!: Utente;
  sub!: Subscription;
  upcoming!: Movie[];
  nowPlaying: NowPlaying[] | undefined;
  toprated: Toprated[] | undefined;
  piuVisti: Piuvisti[] | undefined;
  popular: Popular[] | undefined;
  newFavourites: FavouriteMovies[] | undefined;
  filmLiked: Favourites[] | undefined;
  newLikedYet!: Favourites | null;
  // ngx carousel

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

  constructor(private auth: AuthService, private http: CRUDService, public modal: ModalService) { }

  ngOnInit(): void {

    this.sub = this.http.getMoviesUpComing().subscribe((upcoming) => {
      this.upcoming = upcoming;
      console.log(upcoming);
    })
    this.sub = this.http.getMoviesPopular().subscribe((popular) => {
      this.popular = popular;
      console.log(popular);
    })
    this.sub = this.http.getMoviesNowPlaying().subscribe((nowPlaying) => {
      this.nowPlaying = nowPlaying;
      console.log(nowPlaying);
    })
    this.sub = this.http.getMoviesToprated().subscribe((toprated) => {
      this.toprated = toprated;
      console.log(toprated);
    })
    this.sub = this.http.getMoviespiuVisti().subscribe((piuvisti) => {
      this.piuVisti = piuvisti;
      console.log(piuvisti);
    })
    this.sub = this.http.getMoviespiuVisti().subscribe((piuvisti) => {
      this.piuVisti = piuvisti;
      console.log(piuvisti);
    })
    this.sub = this.http.getMovieFavourite().subscribe((data) => {
      this.filmLiked = data;
      console.log(data);
    })
  }



  // metodo per il like dei film

 /* getLiked(movieId: number, userId: number) {
    //const userID = this.http.getUserId();
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
        .subscribe((favorite) => {
          this.filmLiked!.push();
          console.log('Film preferito aggiunto con successo:', favorite);
          console.log('Film preferiti dagli utenti:', this.filmLiked);
        });
    }
  }*/

  /*favouriteCount(movieId: number): boolean {
    const userId = this.http.getUserId();
    return !!this.filmLiked?.find((favour) => favour.userId === userId && favour.movieId === movieId)
  }*/


}

