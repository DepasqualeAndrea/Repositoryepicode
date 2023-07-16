import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router , ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
     if (localStorage.getItem('token') ){
      return true;
  }
      alert('Per visualizzare questa risorsa devi essere loggato!\nAccedi o registrati'
      );
      this.router.navigate(['login'])
      return false
  }

}
