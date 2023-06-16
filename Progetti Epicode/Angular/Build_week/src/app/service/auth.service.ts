import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, catchError } from 'rxjs/operators';
import { AuthInterface } from '../auth/login/auth.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class AuthService {


    jwtHelper = new JwtHelperService();
    baseURL = environment.baseUrl;
    private authSubj = new BehaviorSubject<null | AuthInterface>(null);
    utente!: AuthInterface;

    user$ = this.authSubj.asObservable();
    timeoutLogout: any;

    constructor(private http: HttpClient, private router: Router) {}

    login(data: { email: string; password: string }) {
        return this.http.post<AuthInterface>(`${this.baseURL}login`, data).pipe(
            // Il login è una POST e non una GET perché deve scrivere il token
            tap((data) => {
                console.log(data);
                this.authSubj.next(data);
                this.utente = data;
                console.log(this.utente);
                localStorage.setItem('user', JSON.stringify(data));
                this.autoLogout(data);
            }),
            catchError(this.errors)
        );
    }

    restore() {

        const users = localStorage.getItem('user');
        if (!users) {
            return;
        }
        const userData: AuthInterface = JSON.parse(users);
        if (this.jwtHelper.isTokenExpired(userData.accessToken)) {

            return;
        }
        this.authSubj.next(userData);
        this.autoLogout(userData);
    }
//function per registrare l'utente nell oggetto users
    signUp(data: {
        nome: string;
        cognome: string;
        email: string;
        password: string;
    }) {
        return this.http.post(`${this.baseURL}users`, data);
    }


//functtion per effettuare il logout del user


    logout() {
        this.authSubj.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/']);
        if (this.timeoutLogout) {
            clearTimeout(this.timeoutLogout);
        }
    }


// function per far si che la scandenza del token avvenga automaticamente, e che non faccia refresh della pagina ogni volta
    autoLogout(data: AuthInterface) {
        const expirationDate = this.jwtHelper.getTokenExpirationDate(
            data.accessToken
        ) as Date;
        const expirationMilliseconds =
            expirationDate.getTime() - new Date().getTime();
        this.timeoutLogout = setTimeout(() => {
            this.logout();
        }, expirationMilliseconds );
    }

    private errors(err: any) {
        switch (err.error) {
            case 'Email already exists':
                return throwError(err);
                break;

            case 'Email format is invalid':
                return throwError(err);
                break;

            default:
                return throwError(err);
                break;
        }
    }

}

