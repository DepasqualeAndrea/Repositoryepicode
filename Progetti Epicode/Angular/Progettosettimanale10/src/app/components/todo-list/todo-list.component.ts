import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models/to-do.inteface';
import { CRUDServiceService } from 'src/app/service/crudservice.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {


  todoForm!: FormGroup;
  newtodoInput: string = '';
  LoadBar= true;
  To_Do: ToDo[] = [];
  progressBar = true;


  constructor(private TDSrv: CRUDServiceService) { }

  RemoveTodo(i: number){
    this.To_Do.splice(i, 1);
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.To_Do = this.TDSrv.getTodoList()
      this.newtodoInput = '';
      this.LoadBar = false;
    }, 2000)
  }

  ceckTask():boolean{
    return this.To_Do.every(val => val.completed === true);
  }

}

