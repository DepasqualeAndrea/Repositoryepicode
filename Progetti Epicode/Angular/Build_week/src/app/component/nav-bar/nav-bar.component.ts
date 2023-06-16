import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth.interface';
import { Subscription } from 'rxjs';
import { UserTasks } from 'src/app/models/user-tasks.interface';
import { CrudServiceService } from 'src/app/service/crud.service';
import { environment } from 'src/environments/environment';
import { Users } from 'src/app/models/users.interface';
import { AuthGuard } from 'src/app/auth/login/auth.guard';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user!: AuthInterface | null;
  users: Users [] | undefined;
  sub!: Subscription

  constructor(private authService: AuthService, private router: Router, private http: CrudServiceService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((_user) => {
      this.user = _user;
    });

    this.sub! = this.http.getUsers().subscribe((user: Users[]) =>  {
      this.users = user;
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate([''])
  }


  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();;
    }
  }

}
