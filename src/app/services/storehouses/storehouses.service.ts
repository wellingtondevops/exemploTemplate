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

  storeHouses() {
    return this.http.get<StorehousesList>(`${url}/storehouses`)
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
}
