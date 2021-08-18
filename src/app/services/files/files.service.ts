import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { File } from 'src/app/models/file';
import { Observable } from 'rxjs';
const apiUrlUpload = environment.apiUrlUpload;
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) { }

  file(form) {
    return this.http.post<any>(`${apiUrlUpload}/api/posts`,
      form,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * (event.loaded / event.total));
            console.log(progress)
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      }));
  }

  filesProgress(form): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${apiUrlUpload}/api/posts`, form, {
      reportProgress: true,
      responseType: 'json'
    });
    /* return this.http.post<any>(`${apiUrlUpload}/api/posts`,
          form,
          {
              reportProgress: true,
              responseType: 'json'
          }) */
    return this.http.request(req);
  }

  delete(file_id) {
    return this.http.delete(`${apiUrlUpload}/api/posts/${file_id}`).pipe(
      tap(data => data)
    );
  }
}
