import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) { }

  forgotPassword(email) {
    return this.http.get<any>(`${url}/users/Forgotpassword?email=${email}`).pipe(
      tap(data => data)
    );
  }
}
