import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Menu, MenuList, MenuSearchList } from 'src/app/models/menu';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) { }

  services(page) {
    if (page) {
      return this.http.get<MenuList>(`${url}/menuservices?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<MenuList>(`${url}/menuservices?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  newService(service) {
    return this.http.post<Menu>(`${url}/menuservices`, service)
      .pipe(
        tap(data => data)
      );
  }

  service(id) {
    return this.http.get<Menu>(`${url}/menuservices/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  deleteService(id) {
    return this.http.delete<Menu>(`${url}/menuservices/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  updateService(service) {
    return this.http.put<Menu>(`${url}/menuservices/${service._id}`, service)
      .pipe(
        tap(data => data)
      );
  }

  searchServices(formdata, page) {
    if (page) {
      return this.http.post<MenuSearchList>(`${url}/menuservices/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<MenuSearchList>(`${url}/menuservices/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }
}
