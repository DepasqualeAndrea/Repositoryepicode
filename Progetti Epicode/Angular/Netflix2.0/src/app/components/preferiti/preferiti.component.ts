import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavouriteMovies } from 'src/app/interface/favourite-movies.interface';
import { CRUDService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {
  preferiti: FavouriteMovies[] = [];
  sub!: Subscription;
  top_rated: any;
  in_trending: any;
  upcoming: any
  most_watch: any;
  discovered: any;
  latest: any;
  popular: any;
  now_playing: any;
  navBar = true;
  selectedMovieId!: number | any;
  searchQuery!: string;
  searchResults: any[] = [];


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
  constructor(private http: CRUDService) { }

  ngOnInit(): void {
    const preferitiLocalStorage = localStorage.getItem('preferiti');
    if (preferitiLocalStorage) {
      this.preferiti = JSON.parse(preferitiLocalStorage);
    }
    this.sub! = this.http.getToprated().subscribe((top: any) => {
      this.top_rated = top.results
      console.log(this.top_rated);
    })

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

    this.sub! = this.http.getToprated().subscribe((popular: any) => {
      this.popular = popular.results
      console.log(this.top_rated);
    })
  }


  //metodo che riconosce i film preferiti
  Preferito(movie: FavouriteMovies) {
    if (this.isPreferito(movie)) {
      this.rimuoviDaPreferiti(movie);
    } else {
      this.aggiungiAiPreferiti(movie);
    }
  }
  aggiungiAiPreferiti(movie: FavouriteMovies) {
    if (!this.isPreferito(movie)) {
      this.preferiti.push(movie);
      this.salvaPreferitiSuLocalStorage();
    }
  }
  isFilmInPreferiti(film: FavouriteMovies): boolean {
    return this.preferiti.some(f => f.id === film.id);
  }

  isPreferito(movie: FavouriteMovies): boolean {
    return this.preferiti.some((m) => m.id === movie.id);
  }
  rimuoviDaPreferiti(movie: FavouriteMovies) {
    this.preferiti = this.preferiti.filter((m) => m.id !== movie.id);
    this.salvaPreferitiSuLocalStorage();
  }
  salvaPreferitiSuLocalStorage() {
    localStorage.setItem('preferiti', JSON.stringify(this.preferiti));
  }
}
