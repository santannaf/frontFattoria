import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: String, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    setTimeout(() => {bsModalRef.hide()}, dismissTimeout)
  }

  showAlertDanger(message: String) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: String) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }
}
