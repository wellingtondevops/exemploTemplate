import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailServiceList, EmailsList } from 'src/app/models/email-service';
import { tap } from 'rxjs/operators';
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class EmailServiceService {

    constructor(
        public http: HttpClient,
    ) { }

    searchListEmails(page, formData) {
            if (page) {
                return this.http.post<EmailsList>(`${url}/emails/box?_page=${page.pageNumber}&size=10`, formData)
                    .pipe(
                        tap(data => data)
                    );
            } else {
                return this.http.post<EmailsList>(`${url}/emails/box?size=10`, formData)
                    .pipe(
                        tap(data => data)
                    );
            }
    }
}
