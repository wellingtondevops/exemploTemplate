import { CertificateSearchList, CertificateList } from './../../models/certificate';
import { environment } from './../../../environments/environment';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private http: HttpClient
  ) { }

  searchCertificadeList() {
    return this.http.get<any>(`${url}/listcertificates`)
      .pipe(
        tap(data => data)
      );
  }

  searchCertificate(page) {
    if (page) {
      return this.http.get<any>(`${url}/certificates/?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<CertificateList>(`${url}/certificates?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

}
