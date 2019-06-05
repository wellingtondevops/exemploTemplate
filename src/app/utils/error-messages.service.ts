import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  errorMessages(error){
    let response = {
      message: '',
      status: 0
    }
    switch(error.status)
    {
        case 403:
            response.message = error.error.message
            response.status = error.status
            this.showError(response)
            break;    
    }
    return response;
  }

  showError(error) {
    this.toastr.error(`Erro ${error.status}`, error.message);
  }
}
