import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Archive, ArchivesList } from 'src/app/models/archive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ArquivesService {

  constructor(
    private http: HttpClient
  ) { }

  archives(formData, page, size = 10) {
    if (page) {
      return this.http.post<ArchivesList>(`${url}/archives/search?_page=${page.pageNumber}&size=10`, formData)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<ArchivesList>(`${url}/archives/search`, formData)
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

  newArchive(archive) {
    return this.http.post<Archive>(`${url}/archives`, archive)
      .pipe(
        tap(data => data)
      );
  }

  patchStartCurrentDate(archive_id) {
    return this.http.patch<Archive>(`${url}/archives/startcurrentdate/${archive_id}`, {})
      .pipe(
        tap(data => data)
      );
  }

  import(archives) {
    return this.http.post<any>(`${url}/archives/import`, archives)
      .pipe(
        tap(data => data)
      );
  }

  searchImportErrors(formData, page, size = 10) {
    if (page) {
      return this.http.post<any>(`${url}/sheetarchives/search?_page=${page.pageNumber}&size=${size}`, formData)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<any>(`${url}/sheetarchives/search`, formData)
        .pipe(
          tap(data => data)
        );
    }
  }

  export(formData) {
    return this.http.post<any>(`${url}/exportarchives`, formData, {
      headers: new HttpHeaders().set('Accept', 'text/csv'),
      observe: 'response',
      responseType: 'blob' as 'json'
    })
      .pipe(
        tap(data => data)
      );
  }
}
