import { Injectable } from '@angular/core';
import { AppModalComponent } from '../components/app-modal/app-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal = false;
  constructor() { }
}
