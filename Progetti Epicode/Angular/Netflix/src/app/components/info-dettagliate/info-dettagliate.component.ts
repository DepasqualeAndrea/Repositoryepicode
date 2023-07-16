import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudServiceService } from 'src/app/service/crud-service.service';

@Component({
  selector: 'app-info-dettagliate',
  templateUrl: './info-dettagliate.component.html',
  styleUrls: ['./info-dettagliate.component.scss']
})
export class InfoDettagliateComponent implements OnInit {


    details: any;
    sub!: Subscription;
  constructor(private http: CrudServiceService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    /*let getParamsId = this.router.snapshot.paramMap.get('id');
    console.log(getParamsId)
    this.getMovie(getParamsId);*/

  }
    /*getMovie(id:any){
        this.sub! = this.http.getMovieDetails(id).subscribe((data: any) => {
            this.details = data
            console.log(data);
        });
    }*/
}
