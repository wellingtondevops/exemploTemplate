import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Storehouse, StorehousesList } from '../../models/storehouse';

@Injectable({
  providedIn: 'root'
})
export class StorehousesService {

  constructor(
    private http: HttpClient
  ) { }

  storeHouses() {
    return this.http.get<StorehousesList>('https://www.archi-api.com/storehouses')
    .pipe(
        tap(data => { return data})
    );
  }

  storehouse(id){
    return this.http.get<Storehouse>(`https://www.archi-api.com/storehouses/${id}`)
    .pipe(
        tap(data => { return data })
    );
  }
}
