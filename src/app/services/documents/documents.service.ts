import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Document, DocumentList } from 'src/app/models/document';
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class DocumentsService {
    constructor(private http: HttpClient) {}

    documents(page) {
        if (page) {
            return this.http.get<DocumentList>(`${url}/docts?_page=${page.pageNumber}`).pipe(tap(data => data));
        } else {
            return this.http.get<DocumentList>(`${url}/docts`).pipe(tap(data => data));
        }
    }

    document(id) {
        return this.http.get<Document>(`${url}/docts/${id}`).pipe(tap(data => data));
    }

    newDocument(document) {
        return this.http.post<Document>(`${url}/docts/`, document).pipe(tap(data => data));
    }

    updateCompany(document) {
        return this.http.patch<Document>(`${url}/docts/${document._id}`, document).pipe(tap(data => data));
    }

    delete(document) {
        return this.http.delete<Document>(`${url}/docts/${document}`).pipe(tap(data => data));
    }
}
