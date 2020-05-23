import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Document, DocumentList, PermissionsUser } from 'src/app/models/document';
import { DocumentsStructurList, DocumentStructur } from 'src/app/models/document-structur';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private http: HttpClient) { }

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

  updateDocument(document) {
    return this.http.patch<Document>(`${url}/docts/${document._id}`, document).pipe(tap(data => data));
  }

  delete(document) {
    return this.http.delete<Document>(`${url}/docts/${document}`).pipe(tap(data => data));
  }

  searchDocuments(company_id = null) {
    if (company_id) {
      return this.http.get<DocumentList>(`${url}/listdocts?company=${company_id}`).pipe(tap(data => data));
    } else {
      return this.http.get<DocumentList>(`${url}/listdocts`).pipe(tap(data => data));
    }

  }

  searchDocts(formdata, page = null) {
    if (page) {
      return this.http.post<DocumentList>(`${url}/docts/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<DocumentList>(`${url}/docts/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }

  doctsUser(user_id) {
    return this.http.get<PermissionsUser>(`${url}/users/permissions/${user_id}`).pipe(
      tap(data => data)
    );
  }

  listStructurs(struct_id){
    return this.http.post(`${url}/docts/listStructure`, { id_Structure: struct_id }).pipe(
      tap(data => data)
    );
  }

  postDoctStruct(data){
    return this.http.post<any>(`${url}/docts/structure`, data).pipe(
      tap(data => data)
    )
  }
}
