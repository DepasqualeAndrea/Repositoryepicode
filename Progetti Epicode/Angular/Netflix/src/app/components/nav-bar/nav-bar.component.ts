import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth-interface.interface';


@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

    user!: AuthInterface | null;

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
    constructor(private authService: AuthService, private router: Router) { }



    ngOnInit(): void {

    }

    logOut() {
        this.authService.logout()
    }

}
