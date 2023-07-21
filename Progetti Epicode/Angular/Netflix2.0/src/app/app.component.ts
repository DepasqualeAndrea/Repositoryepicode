import { Component } from '@angular/core';
import { ModalService } from './service/modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public modal: ModalService){}
  ngOnInit(){

  }

  title = 'Netflix2.0';
}
