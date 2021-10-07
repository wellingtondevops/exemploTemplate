import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  successMessages(message) {
    this.showSuccess(message);
  }

  showSuccess(message) {
    this.toastr.success(message, 'Sucesso!', {
        timeOut: 4000,
        positionClass: 'toast-bottom-right',
    });
  }
}
