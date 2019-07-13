import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  errorMessages(error) {
    const response = {
      message: '',
      status: 0
    };
    switch (error.status) {
        case 403:
          response.message = error.error.message;
          response.status = error.status;
          break;
        case 404:
          response.message = error.error.message;
          response.status = error.status;
          break;
        case 405:
          response.message = error.error.message;
          response.status = error.status;
          break;
        case 500:
          response.message = error.error.message;
          response.status = error.status;
          break;
        case 0:
          response.message = error.error.message;
          response.status = error.status;
          break;
    }
    this.showError(response);
    return response;
  }

  showError(error) {
    this.toastr.error(`Erro ${error.status}`, error.message);
  }
}
