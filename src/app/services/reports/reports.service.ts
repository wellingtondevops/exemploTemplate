import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Report } from '../../models/report';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient
  ) { }

  reports(data){
    return this.http.post<Report>(`${url}/companies/totalcollection`, data)
    .pipe(
      tap(data => data)
    );
  }
}
