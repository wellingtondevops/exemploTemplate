import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { VolumeList, Volume } from 'src/app/models/volume';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class VolumesService {

  constructor(
    private http: HttpClient
  ) { }

  volumes() {
    return this.http.get<VolumeList>(`${url}/volumes`)
    .pipe(
        tap(data => data)
    );
  }

  volume(id) {
    return this.http.get<Volume>(`${url}/volumes${id}`)
    .pipe(
        tap(data => data)
    );
  }
}
