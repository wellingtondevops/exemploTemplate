import { ChartsPieData } from 'src/app/models/chartspie';
import { ChartsData } from './../../models/charts';
import { PositionList } from 'src/app/models/position';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Storehouse, StorehousesList, StorehousesSearchList } from '../../models/storehouse';

import { Position } from 'src/app/models/position';
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
      return this.http.get<StorehousesList>(`${url}/storehouses?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<StorehousesList>(`${url}/storehouses?size=10`)
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

  deleteStoreHouse(id) {
    return this.http.delete<Storehouse>(`${url}/storehouses/${id}`)
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

  searchStorehouses() {
    return this.http.get<StorehousesSearchList>(`${url}/liststorehouses`)
      .pipe(
        tap(data => data)
      );
  }

  searchStorehouse(formdata, page) {
    if (page) {
      return this.http.post<StorehousesSearchList>(`${url}/storehouses/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<StorehousesSearchList>(`${url}/storehouses/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }

  searchPosition(formdata, page, id) {

    if (page) {
      return this.http.post<PositionList>(`${url}/storehouses/${id}/searchpositions?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<PositionList>(`${url}/storehouses/${id}/searchpositions?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
}
    chartsData(id, chartstreet) {
        return this.http.get<ChartsData>(`${url}/storehouses/${id}/chartstreet`, chartstreet)
            .pipe(
                map(res => res),
                tap(data => data)
            );
    }
    chartsPieData(id, chartcompany) {
        return this.http.get<ChartsPieData>(`${url}/storehouses/${id}/chartcompany`, chartcompany)
            .pipe(
                map(res => res),
                tap(data => data)
                );
        }

}
