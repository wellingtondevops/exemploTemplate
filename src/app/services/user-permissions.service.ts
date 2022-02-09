import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListCompany, ShowPemissionsUser } from '../../app/models/userPermissions';
import { environment } from 'src/environments/environment';
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class UserPermissionsService {

    constructor(
        public http: HttpClient,
    ) { }

    companyList(id) {
        return this.http.get<ListCompany>(`${url}/users/listcompaniespermissions/${id}`)
            .pipe(
                tap(data => data)
            );
    }

    showPermissionsList(id) {
        return this.http.get<ShowPemissionsUser>(`${url}/userpermissions/${id}`)
            .pipe(
                tap(data => data)
            );
    }
}
