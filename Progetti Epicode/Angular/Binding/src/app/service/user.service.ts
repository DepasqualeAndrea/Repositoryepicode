import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  constructor() { }

  createUser(name: string){
    this.users.push({name, stato: 'Occupato'});
    console.log(this.users);

  }

  updateUser(index: number, newStatus: string){
    this.users[index].stato = newStatus;
}
}
