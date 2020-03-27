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

  searchVolumes(formData, page) {
    if (page) {
      return this.http.post<VolumeList>(`${url}/volumes/search?_page=${page.pageNumber}&size=10`, formData)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<VolumeList>(`${url}/volumes/search?size=10`, formData)
        .pipe(
          tap(data => data)
        );
    }
  }

  volumes(page) {
    if (page) {
      return this.http.get<VolumeList>(`${url}/volumes?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<VolumeList>(`${url}/volumes?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  deleteVolume(volume) {
    return this.http.delete<Volume>(`${url}/volumes/${volume}`)
      .pipe(
        tap(data => data)
      );
  }

  volume(id) {
    return this.http.get<Volume>(`${url}/volumes/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  updateVolume(volume) {
    return this.http.put<Volume>(`${url}/volumes/${volume._id}`, volume)
      .pipe(
        tap(data => data)
      );
  }

  newVolume(volume) {
    return this.http.post<Volume>(`${url}/volumes`, volume)
      .pipe(
        tap(data => data)
      );
  }

  listvolume(storehouse_id, company_id, location, departament, page = null) {
    if (page) {
      return this.http.get<VolumeList>(`${url}/listvolumes?storehouse=${storehouse_id}&company=${company_id}&location=${location}&departament=${departament}&_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<VolumeList>(`${url}/listvolumes?storehouse=${storehouse_id}&company=${company_id}&location=${location}&departament=${departament}&size=10`)
        .pipe(
          tap(data => data)
        )
    }
  }
}
