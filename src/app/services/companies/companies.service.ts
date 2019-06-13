import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Company, CompaniesList } from '../../models/company';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private http: HttpClient
  ) { }

  companies() {
    return this.http.get<CompaniesList>(`${url}/companies`)
    .pipe(
        tap(data => { return data})
    );
  }

  company(id){
    return this.http.get<Company>(`${url}/companies/${id}`)
    .pipe(
        tap(data => { return data })
    );
  }
}
