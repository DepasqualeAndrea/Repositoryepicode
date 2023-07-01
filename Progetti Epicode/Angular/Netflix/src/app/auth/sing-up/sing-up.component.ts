import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { catchError, of, tap } from 'rxjs';

@Component({
    selector: 'app-sing-up',
    templateUrl: './sing-up.component.html',
    styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

    login_page = true;
    netflixIntro = false;
    login = true;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
    }

    register() {
        this.login = false;
    }
    getSignIn() {
        this.login = true;
    }


    signUp(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        console.log(email, password);
        this.authService.signup(email, password).subscribe(data => {
            console.log(data);
        });
        form.reset();


    }


    logIn(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        console.log(email, password);
        this.authService.signIn(email, password).subscribe((data: any) => {
            console.log(data);

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
            this.authService.createUser(data.email, data.localId, data.idToken, expirationDate)
            localStorage.setItem('user', JSON.stringify(this.authService.user))

            console.log(this.authService.user);
            if (!data) {
                alert('login failed with error: \n Le credenziali non sono corrette!')
            }else if (data){
                alert('Login Effettuato');
                this.login_page = false;
                setTimeout(() => {
                    this.router.navigate(['movies']);
                    this.netflixIntro = true;
                }, 5000);
            }
        });
        form.reset();
    }
}
