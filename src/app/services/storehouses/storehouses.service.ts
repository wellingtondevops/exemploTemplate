import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Storehouse, StorehousesList } from '../../models/storehouse';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StorehousesService {

  constructor(
    private http: HttpClient
  ) { }

  storeHouses(page) {
    if (page) {
      return this.http.get<StorehousesList>(`${url}/storehouses?_page=${page.currentPage}`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<StorehousesList>(`${url}/storehouses`)
      .pipe(
          tap(data => data)
      );
    }
  }

  newStoreHouse(storeHouse) {
    return this.http.post<Storehouse>(`${url}/storehouses`, storeHouse)
    .pipe(
        tap(data => data)
    );
  }

  storehouse(id) {
    return this.http.get<Storehouse>(`${url}/storehouses/${id}`)
    .pipe(
        tap(data => data)
    );
  }

  updateStoreHouse(storeHouse) {
    return this.http.put<Storehouse>(`${url}/storehouses/${storeHouse._id}`, storeHouse)
    .pipe(
        tap(data => data)
    );
  }
}
