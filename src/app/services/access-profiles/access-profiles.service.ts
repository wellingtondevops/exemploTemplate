import { AdcDocts } from './../../models/access-profiles';
import { AccessDocts } from 'src/app/models/access-profiles';
import { tap } from 'rxjs/operators';
import { AccessProfiles, AccessProfilesList } from '../../models/access-profiles';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AccessProfilesService {

    constructor(
        public http: HttpClient,
    ) { }

    searchAccessProfile(formData, page) {
        if (page) {
            return this.http.post<AccessProfilesList>(`${url}/accessprofiles/search?_page=${page.pageNumber}&size=10`, formData)
                .pipe(
                    tap(data => data)
                );
        } else {
            return this.http.post<AccessProfilesList>(`${url}/accessprofiles/search?size=10`, formData)
                .pipe(
                    tap(data => data)
                );
        }
    }

    accessProfile(id) {
        return this.http.get<AccessProfiles>(`${url}/accessprofiles/${id}`)
            .pipe(
                tap(data => data)
            );
    }

    newProfile(profile) {
        return this.http.post<AccessProfiles>(`${url}/accessprofiles`, profile)
            .pipe(
                tap(data => data)
            );
    }

    addDocts(_id) {
        return this.http.post<any>(`${url}/accessprofiles/addocuemnts/${_id}`, _id)
            .pipe(
                tap(data => data)
            );
    }

    removeDocts(id) {
        return this.http.post<AdcDocts>(`${url}/accessprofiles/rmdocuemnts/${id}`, id)
            .pipe(
                tap(data => data)
            );
    }

    update(profile) {
        return this.http.patch<AccessProfiles>(`${url}/accessprofiles/${profile._id}`, profile)
            .pipe(
                tap(data => data)
            );
    }

    delete(id) {
        return this.http.delete<AccessProfiles>(`${url}/accessprofiles/${id}`)
            .pipe(
                tap(data => data)
            );
    }

    documentsProfiles(id) {
        return this.http.get<AccessDocts>(`${url}/accessprofiles/listdoumentosprof/${id}`)
            .pipe(
                tap(data => data)
            );
    }

    avaliableDocuments(id) {
        return this.http.get<AccessDocts>(`${url}/accessprofiles/listdoumentos/${id}`)
            .pipe(
                tap(data => data)
            );
    }
}