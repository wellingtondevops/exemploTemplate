import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { VolumeList, Volume } from 'src/app/models/volume';

@Injectable({
  providedIn: 'root'
})
export class VolumesService {

  constructor(
    private http: HttpClient
  ) { }

  volumes(){
    return this.http.get<VolumeList>('https://www.archi-api.com/volumes')
    .pipe(
        tap(data => { return data})
    );
  }

  volume(id){
    return this.http.get<Volume>(`https://www.archi-api.com/volumes${id}`)
    .pipe(
        tap(data => { return data})
    );
  }
}
