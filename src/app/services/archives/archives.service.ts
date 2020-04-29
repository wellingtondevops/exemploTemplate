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
}
