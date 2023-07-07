import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth-interface.interface';
import { ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudServiceService } from 'src/app/service/crud-service.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    user!: AuthInterface | null;
    searchContent= false;
    navbg: any;
    sub!: Subscription;
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



    searched:any;
    check: Boolean=false;

    constructor(private authService: AuthService, private router: Router, private http:CrudServiceService) { }



    ngOnInit(): void {

    }

    searchForm = new FormGroup({
        'movieName' : new FormControl(null)
    })

    submitForm(){
        console.log(this.searchForm.value, 'search');
        this.sub! = this.http.getSearchMovies(this.searchForm.value).subscribe((result: any) => {
            console.log(result, 'searchMovies##');
            this.searched = result.results;
        })
        this.searchForm.reset();
    }

    openSearch(){

    }

    logOut() {
        this.authService.logout()
    }

}
