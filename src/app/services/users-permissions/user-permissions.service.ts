import { UserDocts } from './../../models/userPermissions';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListCompany, ShowPemissionsUser } from '../../models/userPermissions';
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
    documentsUser(id) {
        return this.http.get<UserDocts>(`${url}/userpermissions/listdoumentosuser/${id}`)
            .pipe(
                tap(data => data)
            );
    }

    avaliableDocuments(id) {
        return this.http.get<UserDocts>(`${url}/userpermissions/listdoumentos/${id}`)
            .pipe(
                tap(data => data)
            );
    }
}
