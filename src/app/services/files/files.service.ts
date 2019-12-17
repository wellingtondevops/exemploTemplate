import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { File } from 'src/app/models/file';
const apiUrlUpload = environment.apiUrlUpload;
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class FilesService {
    constructor(private http: HttpClient) { }

    file(form) {
        return this.http.post<any>(`${apiUrlUpload}/post`,
            form,
            {
                reportProgress: true,
                observe: 'events'
            }).pipe(map((event) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * (event.loaded / event.total));
                        return { status: 'progress', message: progress };
                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return `Unhandled event: ${event.type}`;
                }
            }));
    }

    getFile(archive_id) {
        return this.http.get<File>(`${url}/pictures?archive=${archive_id}`).pipe(tap(data => data));
    }
}
