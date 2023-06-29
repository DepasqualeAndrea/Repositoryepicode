import { Component } from '@angular/core';
import { AuthService } from './service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Netflix';

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    if(localStorage.getItem('user')){
        const user = JSON.parse(localStorage.getItem('user') || '');
        this.authService.createUser(user.email, user.id, user._token, user._expirationDate)
    }
  }
}
