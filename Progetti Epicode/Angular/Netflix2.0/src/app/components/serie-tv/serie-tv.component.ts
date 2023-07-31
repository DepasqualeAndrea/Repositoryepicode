import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavouriteMovies } from 'src/app/interface/favourite-movies.interface';
import { Utente } from 'src/app/interface/utente.interface';
import { CRUDService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-serie-tv',
  templateUrl: './serie-tv.component.html',
  styleUrls: ['./serie-tv.component.scss']
})
export class SerieTvComponent implements OnInit {
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
  selectedMovieId!: number | any;
  searchQuery!: string;
  searchResults: any[] = [];
  navBar = true;

  modal = {
    showModal: false
  };

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

  onSearchInput(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    if (this.searchQuery.trim() !== '') {
      this.http.searchMovies(this.searchQuery).subscribe(
        (searchResults) => {
          this.searchResults = searchResults.results;
          console.log(searchResults)
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Resetta i risultati della ricerca quando l'input è vuoto
      this.searchResults = [];
    }
  }


  constructor(private http: CRUDService, public modale: ModalService) {

  }

  ngOnInit(): void {

    const preferitiLocalStorage = localStorage.getItem('preferiti');
    if (preferitiLocalStorage) {
      this.preferiti = JSON.parse(preferitiLocalStorage);
    }
    console.log(this.preferiti)


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
