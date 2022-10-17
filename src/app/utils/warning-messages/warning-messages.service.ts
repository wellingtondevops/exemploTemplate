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
    this.toastr.warning(message, '', {
        disableTimeOut: disTimeOut,
        toastClass: 'warnclass ngx-toastr',
        progressBar: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-center-center',
        enableHtml: true, });
  }
}
