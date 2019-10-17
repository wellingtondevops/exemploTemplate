import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { File } from 'src/app/models/file';
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class FilesService {
    constructor(private http: HttpClient) { }

    file(form) {
        return this.http.post<File>(`https://archioqa.appspot.com/posts`, form).pipe(tap(data => data));
    }

    getFile (archive_id) {
        return this.http.get<File>(`${url}/pictures?archive=${archive_id}`).pipe(tap(data => data));
    }
}
