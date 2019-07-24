import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Archive, ArchivesList } from 'src/app/models/archive';
import { HttpClient } from '@angular/common/http';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ArquivesService {

  constructor(
    private http: HttpClient
  ) { }

  archives(page) {
    if (page) {
      return this.http.get<ArchivesList>(`${url}/archives?_page=${page.pageNumber}`)
      .pipe(
          tap(data => data)
      );
    } else {
      return this.http.get<ArchivesList>(`${url}/archives`)
      .pipe(
          tap(data => data)
      );
    }

  }

  archive(id) {
    return this.http.get<Archive>(`${url}/archives/${id}`)
    .pipe(
        tap(data => data)
    );
  }
}
