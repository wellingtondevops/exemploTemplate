import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Company, CompaniesList } from '../../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private http: HttpClient
  ) { }

  companies() {
    return this.http.get<CompaniesList>('https://www.archi-api.com/companies')
    .pipe(
        tap(data => { return data})
    );
  }

  company(id){
    return this.http.get<Company>(`https://www.archi-api.com/companies/${id}`)
    .pipe(
        tap(data => { return data })
    );
  }
}
