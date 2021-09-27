import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Batch, BatchesList } from 'src/app/models/batch';
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class BatchesService {

    constructor(
        private http: HttpClient
    ) { }

    searchBatches(formdata, page) {

        if (page) {
            return this.http.post<BatchesList>(`${url}/batches/search?_page=${page.pageNumber}&size=10`, formdata)
                .pipe(
                    tap(data => data)
                );
        } else {
            return this.http.post<BatchesList>(`${url}/batches/search?size=10`, formdata)
                .pipe(
                    tap(data => data)
                );
        }
    }

    batches(page) {
        if (page) {
            return this.http.get<BatchesList>(`${url}/batches/?_page=${page.pageNumber}&size=10`)
                .pipe(
                    tap(data => data)
                );
        } else {
            return this.http.get<BatchesList>(`${url}/batches?size=10`)
                .pipe(
                    tap(data => data)
                );
        }
    }

    batchImages(id, page, size) {
        !size ? size = 10 : '';
        if (page) {
            return this.http.get<BatchesList>(`${url}/batches/${id}/imagens?_page=${page.pageNumber}&size=${size}`)
                .pipe(
                    tap(data => data)
                );
        } else {
            return this.http.get<BatchesList>(`${url}/batches?size=10`)
                .pipe(
                    tap(data => data)
                );
        }

    }

    batch(id) {
        return this.http.get<Batch>(`${url}/batches/${id}`)
            .pipe(
                tap(data => data)
            );
    }

    newBatch(batch) {
        return this.http.post<Batch>(`${url}/batches`, batch)
            .pipe(
                tap(data => data)
            );
    }

    updateBatch(batch) {
        return this.http.patch<Batch>(`${url}/batches/${batch._id}`, batch)
            .pipe(
                tap(data => data)
            );
    }

    imagens(batch_id, page, size = 10) {
        if (page) {
            return this.http.get<any>(`${url}/batches/${batch_id}/imagens?_page=${page.pageNumber}&size=${size}`)
                .pipe(
                    tap(data => data)
                );
        } else {
            return this.http.get<any>(`${url}/batches/${batch_id}/imagens?size=${size}`)
                .pipe(
                    tap(data => data)
                );
        }
    }

    batchIndex(id, data) {
        return this.http.post<any>(`${url}/batches/${id}/index`, data)
            .pipe(
                tap(data => data)
            );
    }

    volumes(id, page, data) {
        if (page) {
            return this.http.post<any>(`${url}/batches/${id}/searchvolumes?_page=${page.pageNumber}&size=10`, data)
                .pipe(
                    tap(data => data)
                );
        } else {
            return this.http.post<any>(`${url}/batches/${id}/searchvolumes?size=10`, data)
                .pipe(
                    tap(data => data)
                );
        }
    }

    delete(batch) {
        return this.http.delete<Batch>(`${url}/batches/${batch}`)
            .pipe(
                tap(data => data)
            );
    }

    addVolume(batch_id, volume_id){
        return this.http.patch<any>(`${url}/batches/${batch_id}/addvolume`, {volume: volume_id})
            .pipe(
                tap(data => data)
            );
    }
}
