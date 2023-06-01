import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  nuovoNome: string = "";

  constructor(private userSrv: UserService) { }

  ngOnInit(): void {
  }
  onNewUser(nuovoNome: string) {
    this.userSrv.createUser(nuovoNome)
}
}
