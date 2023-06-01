import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { LogService } from 'src/app/service/log.service';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: any;
  @Input() id!: number;

  constructor( private userSrv: UserService, private logSrv: LogService) { }

  ngOnInit(): void {
  }

  cambioStatus(){
    this.userSrv.updateUser(this.id, newUser);
    this.logSrv.logStatusChange(this.id, newUser);
  }

}
