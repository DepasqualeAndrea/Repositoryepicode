
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToDo } from 'src/app/models/to-do.inteface';
import { CRUDServiceService } from 'src/app/service/crudservice.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {


  todoForm!: FormGroup;

  To_Do: ToDo[] = [];
  completed: ToDo[] = [];
  newtodoInput: string = '';
  updateIndex!: any;
  idEnabled: boolean = false;
  LoadBar= true;
  progressBar = false;
  percents: number = 0;

  get style(){
    return 'width:' + this.percents + '%;';
  }


  constructor(private fb: FormBuilder, private TDSrv: CRUDServiceService) { }

  onKey(event: any) {
    const inputvalue = event.target.value;
    console.log(inputvalue);
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
    setTimeout(() => {
      this.To_Do = this.TDSrv.getTodoList()
      this.newtodoInput = '';
      this.LoadBar = false;
    }, 3000)
  }


  addTo_DoToo(inputvalue: string): void {
    this.TDSrv.addTodItems(inputvalue);
    this.newtodoInput = '';
    this.todoForm.reset();
    this.progressBar = true;
    setTimeout(() => {
      this.To_Do = this.TDSrv.getTodoList()
      this.newtodoInput = '';
      this.LoadBar = false;
    }, 3000)
    /*const tipo = setTimeout(() =>{
      timer(1000, 10).subscribe(d => {
      if(d){
        if(this.percents >= 100){
          this.percents = 0;
      }else{
        this.percents += 2;
      }
      }
    });
    }, 2000)
    clearTimeout(tipo);
  }*/
}

  RemoveTodo(i: number) {
    this.To_Do.splice(i, 1);
    setTimeout(() => {
      this.To_Do = this.TDSrv.getTodoList()
      this.newtodoInput = '';
      this.LoadBar = false;
    }, 3000)
  }




  getEdit(item: ToDo, i: number) {
    this.todoForm.controls['item'].setValue(item.title);
    this.updateIndex = i;
    this.idEnabled = true;
  }

  updateTodo() {
    this.To_Do[this.updateIndex].title = this.todoForm.value.item;
    this.To_Do[this.updateIndex].completed = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.idEnabled = false;
    setTimeout(() => {
      this.To_Do = this.TDSrv.getTodoList()
      this.newtodoInput = '';
      this.LoadBar = false;
    }, 3000)
  }

  ceckTask():boolean{
    return this.To_Do.every(val => val.completed === true);
  }
}
