import { Batch } from './../../models/batch';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent, HttpRequest } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { File } from 'src/app/models/file';
import { Observable } from 'rxjs';
import { data } from 'jquery';
const apiUrlUpload = environment.apiUrlUpload;
const apiUrlUploadSingle = environment.apiUrlUploadSingle;

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
            console.log(progress);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      }));
  }

  fileS(form) {
    return this.http.post<any>(`${apiUrlUploadSingle}/api/posts`,
      form,
      {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * (event.loaded / event.total));
            console.log(progress);
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
    return this.http.delete(`${apiUrlUploadSingle}/api/posts/${file_id}`).pipe(
      tap(data => data)
    );
    }

    deleteImgs(pictures) {
        return this.http.post<any>(`${apiUrlUpload}/api/posts/multidelete`, pictures)
        .pipe(
            tap(data => data)
        );
  }
}
