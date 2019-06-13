import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Arquive, ArquivesList } from 'src/app/models/arquive';
import { HttpClient } from '@angular/common/http';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ArquivesService {

  constructor(
    private http: HttpClient
  ) { }

  companies() {
    return this.http.get<ArquivesList>(`${url}/companies`)
    .pipe(
        tap(data => { return data })
    );
  }

  company(id){
    return this.http.get<Arquive>(`${url}/companies/${id}`)
    .pipe(
        tap(data => { return data })
    );
  }
}
