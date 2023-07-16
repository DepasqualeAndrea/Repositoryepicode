import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CRUDService } from 'src/app/service/crud.service';

import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {

  sub!: Subscription;

  constructor(public modal:ModalService, private details: ActivatedRoute, private http: CRUDService) { }

  ngOnInit(): void {
     let getParamsId = this.details.snapshot.paramMap.get('id');
    console.log(getParamsId)
    this.getMovie(getParamsId)
  }

 getMovie(id:any){
        this.sub! = this.http.getMovieDetails(id).subscribe((data: any) => {
            this.details = data
            console.log(data);
        });
    }


}
