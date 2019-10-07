import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WarningMessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  showWarning(message, disTimeOut) {
    this.toastr.warning(message, '', { disableTimeOut: disTimeOut });
  }
}
