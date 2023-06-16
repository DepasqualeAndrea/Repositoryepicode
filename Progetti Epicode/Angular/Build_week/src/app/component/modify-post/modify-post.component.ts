import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/service/crud.service';
import { Users } from 'src/app/models/users.interface';
import { UserTasks } from 'src/app/models/user-tasks.interface';
import { AuthGuard } from 'src/app/auth/login/auth.guard';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router, RouterModule } from '@angular/router';
import { AuthInterface } from 'src/app/auth/login/auth.interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {

  user!: AuthInterface | null;
  users: Users[] | undefined;
  sub!: Subscription
  tasks: UserTasks[] | undefined;
  taskID!: number;
  swapTask!: UserTasks;
  form!: NgForm;

  userTasks: UserTasks = {
    id: 0,
    title: '',
    descrizione: '',
    url: '',
  }


  baseURL = environment.baseUrl;

  constructor(private authService: AuthService, private router: Router, private http: CrudServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((_user) => {
      this.user = _user;
    });

    this.route.params.subscribe((task) => {
      this.taskID = +task['id'];
    });


    this.sub! = this.http.getOneTasks(this.taskID).subscribe((task: UserTasks) => {
      this.userTasks = task
    });

  }

  //metodo per la modifica del post di riferimento con id e valori associati all'oggetto :D

  changePost(form: NgForm, data: UserTasks) {
    this.userTasks = {
      title: form.value.title,
      descrizione: form.value.descrizione,
      url: form.value.url,
      id: this.userTasks?.id
    }
    this.http.changeTask(this.taskID, data).subscribe(() => { });
    this.router.navigate(['/home-page']);
    console.log(this.userTasks);
    form.reset()
  }

  //metodo per assegnare i valori ai campi di input, che riprenderà in fase di modifica nel caso in cui non vengano modifucati
  SrcValue(userTasks: UserTasks) {
    this.form.setValue({
      title: userTasks.title,
      descrizione: userTasks.descrizione,
      url: userTasks.url
    })
  }




  getToDelete(id?: number) {

    this.http.deleteTasks(id!).subscribe(() => {
      this.router.navigate(['/home-page']);
    });

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();;
    }
  }

}
