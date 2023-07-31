import { Component, HostListener, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CRUDService } from 'src/app/service/crud.service';


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




  constructor(private auth: AuthService) { }


  ngOnInit(): void {
  }




  logout() {
    this.auth.logout();
  }
}
