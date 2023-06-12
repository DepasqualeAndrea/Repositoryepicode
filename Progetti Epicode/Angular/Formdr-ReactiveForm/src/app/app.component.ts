
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Formdr-ReactiveForm';


 @ViewChild('formContainer', { static: true }) formContainer!: NgForm;


  users   = {
    name: "",
    alterEgo: '',
    power: '',
    enemy: '',
    planet: '',
    weekness: ''
  }
  usersForm: any = {
    name: '',
    alterEgo: '',
    power: '',
    enemy: '',
    planet: '',
    weekness: ''
  }

  ngOnInit(): void {

    this.formContainer.statusChanges?.subscribe((forum) => {
      console.log(this.formContainer);
      console.log(`stato form: ${forum}`);
    });
  }

  onSubmit() {
    console.log(`Form inviato: ${this.formContainer}`);
    this.users.name = this.formContainer.value;
    this.users.alterEgo = this.formContainer.value.alterEgo;
    this.users.power = this.formContainer.value.power;
    this.users.enemy = this.formContainer.value.enemy;
    this.users.planet = this.formContainer.value.planet;
    this.users.weekness = this.formContainer.value.weekness;
    console.log(this.users);
    this.formContainer.reset();

  }
}
