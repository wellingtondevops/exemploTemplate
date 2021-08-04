import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Company, CompaniesList } from '../../models/company';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  constructor(
    private http: HttpClient
  ) { }

  searchBatches(formdata, page) { 

    if (page) {
      return this.http.post<CompaniesList>(`${url}/batches/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<CompaniesList>(`${url}/batches/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }

  batches(page) {
    if (page) {
      return this.http.get<CompaniesList>(`${url}/batches/?_page=${page.pageNumber}&size=10`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<CompaniesList>(`${url}/batches?size=10`)
      .pipe(
          tap(data => data)
      );
    }
  }

  batch(id) {
    return this.http.get<Company>(`${url}/batches/${id}`)
    .pipe(
        tap(data => data)
    );
  }

  newBatch(batch) {
    return this.http.post<Company>(`${url}/batches`, batch)
    .pipe(
      tap(data => data)
    );
  }

  updateBatch(batch) {
    return this.http.patch<Company>(`${url}/batches/${batch._id}`, batch)
    .pipe(
      tap(data => data)
    );
  }

  delete(batch) {
    return this.http.delete<Company>(`${url}/batches/${batch}`)
    .pipe(
      tap(data => data)
    );
  }
}
