import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private FireAuth: AngularFireAuth, private router: Router) { }
  signInWithGoogle(){
    return this.FireAuth.signInWithPopup(new GoogleAuthProvider());
  }

  //register con email e pw
 registerWhitEmailAndPassword(user: { email: string; password: string}){
  return this.FireAuth.createUserWithEmailAndPassword(user.email, user.password);
}

//login con email e pw

signInWithEmailAndPassword(user: { email: string; password: string}){
  return this.FireAuth.signInWithEmailAndPassword(user.email, user.password)
}


  //register method



  //metodo log out

  logout() {
    this.FireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login'])
    }, err => {
      alert(err.message)
    })
  }



}


/*  signInWithGoogle(){
    return this.FireAuth.signInWithPopup(new GoogleAuthProvider());
  }

  //register con email e pw
registerWhitEmailAndPassword(user: { email: string; password: string}){
  return this.FireAuth.createUserWithEmailAndPassword(user.email, user.password);
}

//login con email e pw

signInWithEmailAndPassword(user: { email: string; password: string}){
  return this.FireAuth.signInWithEmailAndPassword(user.email, user.password);
}*/
