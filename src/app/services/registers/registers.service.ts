import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Register, RegistersList } from '../../models/register';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(
    private http: HttpClient
  ) { }


  listregister(volume){
    return this.http.get<RegistersList>(`${url}/listregister?volume=${volume}`)
    .pipe(
      tap(data => data)
    )
  }

}