import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { AuthInterface } from './auth.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user!: AuthInterface | null;

    constructor(private authService: AuthService, private router: Router) { }

    login = true;

    ngOnInit(): void {
        this.authService.user$.subscribe((_user) => {
            this.user = _user;
        });
    }

    register() {
        this.login = false;

    }
    getSignIn() {
        this.login = true;
    }

    signUp(form: NgForm) {
        console.log(form.value);

        this.authService.signUp(form.value).pipe(
          catchError(error => {
            console.error(error);
            alert('Registrazione fallita');
            form.reset();
            return of(null);
          })
        ).subscribe(response => {
          if (response) {
            this.router.navigate(['home-page']);
            alert('Registrazione Effettuata con Successo!');
            this.login = true;
          }
        });
      }


    logIn(form: NgForm) {
        console.log(form.value);

        this.authService.login(form.value).pipe(
          catchError(error => {
            console.error(error);
            alert('Login Fallito');
            return of (null);
          })
        ).subscribe(response => {
          if (response) {
            this.router.navigate(['home-page']);
            alert('Login Effettuato');
          }
        });
      }
}
