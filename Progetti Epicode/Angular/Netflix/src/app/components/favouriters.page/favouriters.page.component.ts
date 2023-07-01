import { Component, OnInit } from '@angular/core';
import { Subscription, min } from 'rxjs';
import { AuthService } from 'src/app/service/auth-service.service';
import { CrudServiceService } from 'src/app/service/crud-service.service';
@Component({
  selector: 'app-favouriters.page',
  templateUrl: './favouriters.page.component.html',
  styleUrls: ['./favouriters.page.component.scss']
})
export class FavouritersPageComponent implements OnInit {

    sub!: Subscription;
    most_watch: any;
  constructor(private authService: AuthService, private http: CrudServiceService) { }

  ngOnInit(): void {
    this.sub! = this.http.getFavourites().subscribe((watched: any) => {
        this.most_watch = watched.results
        console.log(this.most_watch);
    })
  }

}
