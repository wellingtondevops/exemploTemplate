import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DoctypeList, Doctype } from 'src/app/models/doctype';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DoctypesService {

  constructor(
    private http: HttpClient
  ) { }

  doctypes() {
    return this.http.get<DoctypeList>(`${url}/docts`)
    .pipe(
        tap(data => { return data})
    );
  }

  doctype(id){
    return this.http.get<Doctype>(`${url}/docts/${id}`)
    .pipe(
        tap(data => { return data })
    );
  }
}
