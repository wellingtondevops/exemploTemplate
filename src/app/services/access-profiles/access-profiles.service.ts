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

    profile(id) {
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

    update(profile) {
        return this.http.patch<AccessProfiles>(`${url}/accessprofiles/${profile._id}`, profile)
            .pipe(
                tap(data => data)
            );
    }

    delete(profile) {
        return this.http.delete<AccessProfiles>(`${url}/accessprofiles/${profile._id}`)
            .pipe(
                tap(data => data)
            );
    }
}
