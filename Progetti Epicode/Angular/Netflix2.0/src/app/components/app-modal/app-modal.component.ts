import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDetails } from 'src/app/interface/movie-details.interface';
import { Movie } from 'src/app/interface/movie.interface';
import { CRUDService } from 'src/app/service/crud.service';

import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
})
export class AppModalComponent implements OnInit {

  @Input() selectedMovieId!: number |any;
  @Output() closeModalEvent = new EventEmitter()
  movieDetails:MovieDetails | any;
  popular: any;
  sub!: Subscription;
  constructor(public modal: ModalService,private http: CRUDService) { }

  ngOnInit(): void {
    this.http.getMovieDetails(this.selectedMovieId).subscribe((response) => {
      this.movieDetails = response;
    }, (error) =>{
      console.log(error)
    })

  }
  closeModal() {
    this.selectedMovieId = null; // Imposta l'ID del film selezionato su null per nascondere il modale
    this.closeModalEvent.emit(); // Emetti l'evento di chiusura del modale
  }
  ngOnChanges(): void {
    this.sub! = this.http.getMoviesPopular().subscribe((popular: any) => {
      this.popular = popular.results
      console.log(this.popular);
    })
  }


}
