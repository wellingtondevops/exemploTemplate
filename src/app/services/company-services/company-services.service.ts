import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CompanyServiceList, CompanyServices, CompanyServiceSearchList } from 'src/app/models/service';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CompanyServicesService {

  constructor(
    private http: HttpClient
  ) { }

  services(page) {
    if (page) {
      return this.http.get<CompanyServiceList>(`${url}/companyservices/list?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<CompanyServiceList>(`${url}/companyservices/list?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  newService(service) {
    return this.http.post<CompanyServices>(`${url}/companyservices`, service)
      .pipe(
        tap(data => data)
      );
  }

  service(id) {
    return this.http.get<any>(`${url}/companyservices/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  deleteService(id) {
    return this.http.delete<CompanyServices>(`${url}/companyservices/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  updateService(service) {
    return this.http.put<CompanyServices>(`${url}/companyservices/${service._id}`, service)
      .pipe(
        tap(data => data)
      );
  }

  searchServices(formdata, page) {
    if (page) {
      return this.http.post<CompanyServiceSearchList>(`${url}/companyservices/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<CompanyServiceSearchList>(`${url}/companyservices/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }
}
