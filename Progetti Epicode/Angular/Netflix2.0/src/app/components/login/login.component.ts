import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_page = true;
  netflixIntro = false;
  loginForm = true;
  sub!: Subscription;
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;



  constructor(private auth: AuthService, private FireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {

  }
  register() {
    this.loginForm = false;
  }
  getSignIn() {
    this.loginForm = true;
  }
  // metodo login

  login(email: string, password: string) {
    this.FireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      alert('login Effettuato con successo ✅')
      this.login_page = false;
      setTimeout(() => {
        this.netflixIntro = true;
        this.isLoggedIn = true;
        this.router.navigate(['home'])
      },5000)
    }, err => {
      alert('La Passwor inserita o l\'email inserita non sono corrette ');
      this.router.navigate(['/login']);
    })
  }


  getLogin(){
    if(this.email == ''){
      alert('please enter your email')
      return;
    }
    if(this.password == ''){
      alert('please enter a password')
      return;
    }
    this.login(this.email, this.password)
    this.email = '';
    this.password =  '';
  }
//login con google
loginWithGoogle() {
  this.auth.signInWithGoogle().then((data: any) => {
    this.router.navigate(['Home'])
  }).catch((error: any) => {
    console.error(error)
  })
}


  //metodo registrazione
  registrazione(email: string, password: string) {
    this.FireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registratione effettuata con successo ✅, ora puoi procedere con il login!')
      this.loginForm = true;
      this.router.navigate(['/login'])
    }, err => {
      alert('La Password inserita non è valida, deve essere almeno di 6 caratteri contenente un numero ed una maiuscola')
      this.router.navigate(['/login'])
    })
  }


 getRegistration() {
    if (this.email == '') {
      alert('please enter your email');
      return;
    }
    if (this.password == '') {
      alert('please enter your password');
      return;
    }

    this.registrazione(this.email, this.password);
    this.email = '';
    this.password =  '';
  }

isAutenticated(){
  return this.isLoggedIn;
}


}
