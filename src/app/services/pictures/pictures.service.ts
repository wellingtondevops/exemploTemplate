import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { File } from 'src/app/models/file';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(
    private http: HttpClient
  ) { }

  picture(archive_id) {
    return this.http.get<File>(`${url}/pictures?archive=${archive_id}`).pipe(tap(data => data));
}
}
