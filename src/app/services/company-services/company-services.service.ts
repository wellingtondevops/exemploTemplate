import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Service, ServiceList, ServiceSearchList } from 'src/app/models/service';
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
      return this.http.get<ServiceList>(`${url}/companyservices/list?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<ServiceList>(`${url}/companyservices/list?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  newService(service) {
    return this.http.post<Service>(`${url}/companyservices`, service)
      .pipe(
        tap(data => data)
      );
  }

  service(id) {
    return this.http.get<Service>(`${url}/companyservices/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  deleteService(id) {
    return this.http.delete<Service>(`${url}/companyservices/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  updateService(service) {
    return this.http.put<Service>(`${url}/companyservices/${service._id}`, service)
      .pipe(
        tap(data => data)
      );
  }

  searchServices(formdata, page) {
    if (page) {
      return this.http.post<ServiceSearchList>(`${url}/companyservices/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<ServiceSearchList>(`${url}/companyservices/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }
}
