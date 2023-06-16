import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserTasks } from '../models/user-tasks.interface';
import { Users } from '../models/users.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

        tasks: UserTasks [] | undefined;
        userTasks!: UserTasks
        users: Users [] | undefined;
        baseURL = environment.baseUrl;
        greedyTask: UserTasks[] = [];

  constructor(private http: HttpClient) { }
//metodo per la get dei task
    getTasks(){
       return this.http.get<UserTasks[]>(`${this.baseURL}userInterface`);
    }
//metodo per la get degli users del login
    getUsers(){
      return this.http.get<Users[]>(`${this.baseURL}users`);
    }
//metodo per la post del nuovo oggetto
    AddTask(data: UserTasks ){
        return this.http.post<UserTasks>(`${this.baseURL}userInterface`, data );
    }
//metodo per eliminare una task
    deleteTasks(id: number ){
       return this.http.delete(`${this.baseURL}userInterface/${id}` );
    }
//metodo per modificare un oggetto
    changeTask(id: number, data: UserTasks){
      return this.http.put(`${this.baseURL}userInterface/${id}`, data );
    }
//metodo per richiamare una sola task dall'array
    getOneTasks(id: number){
      return this.http.get<UserTasks>(`${this.baseURL}userInterface/${id}`);
   }
//metodo che ritorna l'array da inserire in  un set timeout, per via che non carica velocemente i cambiamenti
   getTasksAfter() {
    return this.greedyTask;
  }

}
