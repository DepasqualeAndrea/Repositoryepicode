import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  // ngx carousel

  slideConfig = {
    "type": 'fixed',
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

  user!: Utente;
  sub!: Subscription;
  in_trending: any;
  upcoming: any
  most_watch: any;
  top_rated: any;
  discovered: any;
  latest: any;
  popular: any;
  now_playing: any;
  preferiti: FavouriteMovies[] = [];



  modal = {
    showModal: false
  };

  navBar = true;

  selectedMovieId!: number | any;

  openModal(movieId: number) {
 // Memorizza l'ID del film selezionato
    setTimeout(() => {
      this.selectedMovieId = movieId;
      this.modal.showModal = true;// Mostra il modale
      this.navBar = false;
    }, 400)
  }
  closeModal() {
    this.modal.showModal = false; // Chiudi il modale impostando showModal su false
    this.selectedMovieId = null;
    this.navBar = true;// Resetta l'ID del film selezionato
  }


  constructor(private auth: AuthService, private http: CRUDService, public modale: ModalService, private details: ActivatedRoute) { }

  ngOnInit(): void {

    const preferitiLocalStorage = localStorage.getItem('preferiti');
    if (preferitiLocalStorage) {
      this.preferiti = JSON.parse(preferitiLocalStorage);
    }
    console.log(this.preferiti)


    /* this.sub = this.http.getMoviesUpComing().subscribe((upcoming) => {
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
     })*/

    this.sub! = this.http.getMovies().subscribe((trend: any) => {
      this.in_trending = trend.results
      console.log(this.in_trending);
    });
    this.sub! = this.http.getMoviesPlaying().subscribe((playing: any) => {
      this.now_playing = playing.results
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

    this.sub! = this.http.getDiscoverTv().subscribe((popular: any) => {
      this.popular = popular.results
      console.log(this.popular);
    })

  }


  // metodo per il like dei film
  // Funzione per aggiungere o rimuovere il film dai preferiti
  Preferito(movie: FavouriteMovies) {
    if (this.isPreferito(movie)) {
      this.rimuoviDaPreferiti(movie);
    } else {
      this.aggiungiAiPreferiti(movie);
    }
  }

  // Funzione per aggiungere il film ai preferiti
  aggiungiAiPreferiti(movie: FavouriteMovies) {
    if (!this.isPreferito(movie)) {
      this.preferiti.push(movie);
      this.salvaPreferitiSuLocalStorage();
    }
  }

  // Funzione per rimuovere il film dai preferiti
  rimuoviDaPreferiti(movie: FavouriteMovies) {
    this.preferiti = this.preferiti.filter((m) => m.id !== movie.id);
    this.salvaPreferitiSuLocalStorage();
  }

  // Funzione per verificare se il film è tra i preferiti
  isPreferito(movie: FavouriteMovies): boolean {
    return this.preferiti.some((m) => m.id === movie.id);
  }

  // Funzione per salvare i film preferiti nello storage locale
  salvaPreferitiSuLocalStorage() {
    localStorage.setItem('preferiti', JSON.stringify(this.preferiti));
  }

}

