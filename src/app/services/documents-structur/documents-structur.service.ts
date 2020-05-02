import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DocumentsStructurList, DocumentStructur } from 'src/app/models/document-structur';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DocumentsStructurService {
  constructor(private http: HttpClient) { }

  documentsStructur(page) {
    if (page) {
      return this.http.get<DocumentsStructurList>(`${url}/templates?_page=${page.pageNumber}`).pipe(tap(data => data));
    } else {
      return this.http.get<DocumentsStructurList>(`${url}/templates`).pipe(tap(data => data));
    }
  }

  documentStructur(id) {
    return this.http.get<DocumentStructur>(`${url}/templates/${id}`).pipe(tap(data => data));
  }

  delete(id) {
    return this.http.delete<Document>(`${url}/templates/${id}`).pipe(tap(data => data));
  }

  update(documentStructur) {
    return this.http.patch<DocumentStructur>(`${url}/templates/${documentStructur._id}`, documentStructur).pipe(tap(data => data));
  }

  newDocumentStructur(formdata) {
    return this.http.post<DocumentStructur>(`${url}/templates`, formdata).pipe(tap(data => data));
  }
}
