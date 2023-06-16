import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth.interface';
import { Subscription } from 'rxjs';
import { UserTasks } from 'src/app/models/user-tasks.interface';
import { CrudServiceService } from 'src/app/service/crud.service';
import { environment } from 'src/environments/environment';
import { Users } from 'src/app/models/users.interface';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit {


  user!: AuthInterface | null;
  users: Users [] | undefined;
  sub!: Subscription
  tasks: UserTasks[] | undefined;
  userTasks!: UserTasks | null;
  loadHome = false;
  greedyTask: UserTasks[] = [];

  baseURL = environment.baseUrl;



  constructor(private authService: AuthService, private router: Router, private http: CrudServiceService) { }



  ngOnInit(): void {
    //metodo riconoscimento dell'login da parte dell'utente

    this.authService.user$.subscribe((_user) => {
      this.user = _user;
    });

    //metodo di recupero dati dal json con le task salvate

    this.sub! = this.http.getTasks().subscribe((task: UserTasks[]) => {
      this.tasks = task;
      console.log(this.tasks);
      setTimeout(() => {
        this.greedyTask = this.http.getTasksAfter()
        this.loadHome = true;
      }, 3000)
    });

    this.sub! = this.http.getUsers().subscribe((user: Users[]) =>  {
      this.users = user;
    });

  }


  //metodo per la delete della task confronto id, e recupero dell'id per la delete
  getToDelete(id?: number) {
    const tasksId = this.tasks!.find(task => task.id === id);
    if (tasksId) {
      this.http.deleteTasks(tasksId.id!).subscribe(() => {
        const tasksIndex = this.tasks!.indexOf(tasksId);
        if (tasksIndex !== -1) {
          this.tasks!.splice(tasksIndex, 1);
        }
      });
      console.log(tasksId)
    } else {

    }
  }

  getPost(form: NgForm){

    this.userTasks = {
      title: form.value.title,
      descrizione: form.value.descrizione,
      url: form.value.url,
      id: this.userTasks?.id
    }
    this.http.AddTask(this.userTasks!).subscribe((task: UserTasks) =>{
      this.tasks?.push(task)
    })
    console.log(this.tasks);
    form.reset()

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
