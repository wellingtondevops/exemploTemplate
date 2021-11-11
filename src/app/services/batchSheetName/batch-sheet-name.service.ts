import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";
import { BatchSheetName } from "./../../models/batchSheetName";
const url = environment.apiUrl;

@Injectable({
    providedIn: "root",
})
export class BatchSheetNameService {
    constructor(private http: HttpClient) {}

    getId(id) {
        return this.http.get<BatchSheetName>(`${url}/sheetnames/${id}`)
          .pipe(
            tap(data => data)
          );
      }

    delete(id) {
        return this.http
            .delete<BatchSheetName>(`${url}/sheetnames/${id}`)
            .pipe(tap((data) => data));
    }
}
