import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';//tipo particolare di osservable che richiede un valore iniziale ed emette in tempo reale il suo cambiamento di valore, desottoscrivendosi immediatamente dopo.
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { AuthDATA } from './auth-data.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    jwtHelper = new JwtHelperService(); //serve per leggere e validare il token
    baseUrl = environment.baseUrl;
    private authSbj = new BehaviorSubject<null | AuthDATA>(null);//serve per comunicare in tempo reale all'applicazione la oresenza dell'utente autenticato
    utente!: AuthDATA;

    User$ = this.authSbj.asObservable();//la variabile di tipo behaviourSubject che trasmettera la presenza o meno dell'utente

  constructor(private http: HttpClient) {


  }

  login(data: {email: string, password: string}) {
    return this.http.post(`${this.baseUrl}login`, data)
  }
}
