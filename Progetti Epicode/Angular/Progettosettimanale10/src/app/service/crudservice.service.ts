import { Injectable } from '@angular/core';
import { ToDo } from '../models/to-do.inteface';


@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {
  To_Do: ToDo[] = [];
  i = 1;
  constructor() { }

  addTodItems(title: string): void {
    this.To_Do.push({
      id: this.i++,
      title,
      completed: false
    });
  }

getTodoList() {
    return this.To_Do;
  }


}
