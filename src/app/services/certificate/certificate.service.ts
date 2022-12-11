import { Certificate } from 'src/app/models/certificate';
import { Company } from 'src/app/models/company';
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

  newCertificate(certificate) {
    return this.http.post<any>(`${url}/certificates`, certificate)
      .pipe(
        tap(data => data)
      );
  }

  removeCertificate(id, endpoint) {
    return this.http.delete<any>(`${url}/companies/${endpoint}/${id}`,)
      .pipe(
        tap(data => data)
      );
  }

  simpleGetCertificate(id) {
    return this.http.get<any>(`${url}/certificates/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  delete(id) {
    return this.http.delete<Certificate>(`${url}/certificates/${id}`)
      .pipe(
        tap(data => data)
      );
  }

}
