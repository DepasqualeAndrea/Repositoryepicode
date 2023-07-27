import { Component, HostListener, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CRUDService } from 'src/app/service/crud.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navbg: any;

  @HostListener('document:scroll') scrollover() {
    console.log(document.body.scrollTop, 'scrolllength#');

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#000000',
        'transition-all': '0.2s',
        'transition-duration': '0.2s',
      }
    } else {
      this.navbg = {}
    }
  }

  searchQuery: string = '';
  searchResults: any[] = [];


  constructor(private auth: AuthService, private searchService: SearchService, private movieService: CRUDService) { }

  onSearch() {
    if (this.searchQuery.trim() === '') {
      // Se la query di ricerca è vuota, svuota i risultati della ricerca
      this.searchResults = [];
      return;
    }
    this.searchService.setSearchResults(this.searchResults);

    this.movieService.getMovieFinded(this.searchQuery).pipe(
      debounceTime(300), // Ritarda l'esecuzione della chiamata per 300 ms
      distinctUntilChanged() // Evita di chiamare la stessa query di ricerca
    ).subscribe(
      (results: any) => {
        this.searchResults = results;
        this.searchService.setSearchResults(results);
        console.log(this.searchResults);
      },
      (error) => {
        console.error('Errore durante la ricerca dei film:', error);
      }
    );
  }
  ngOnInit(): void {
  }




  logout() {
    this.auth.logout();
  }
}
