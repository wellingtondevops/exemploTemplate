import { tap } from 'rxjs/operators';
import { Package, PackageList, PackageSeachrList } from './../../models/packages';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private http: HttpClient
  ) { }

  packages(page) {
    if (page) {
      return this.http.get<PackageList>(`${url}/listpackagestypes?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<PackageList>(`${url}/listpackagestypes?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  listPackage() {
    return this.http.get<PackageList>(`${url}/packagetypes?_page=0`).pipe(
      tap(data => data)
    );
  }

  newPackage(newPackage) {
    return this.http.post<Package>(`${url}/packagetypes`, newPackage)
      .pipe(
        tap(data => data)
      );
  }

  getPackage(id) {
    return this.http.get<Package>(`${url}/packagetypes/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  deletePackage(id) {
    return this.http.delete<Package>(`${url}/packagetypes/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  updatePackage(Patchpackage) {
    return this.http.patch<Package>(`${url}/packagetypes/${Patchpackage._id}`, Patchpackage)
      .pipe(
        tap(data => data)
      );
  }

  searchPackages(formdata, page) {
    if (page) {
      return this.http.post<PackageSeachrList>(`${url}/packagetypes/search?_page=${page.pageNumber}&size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<PackageSeachrList>(`${url}/packagetypes/search?size=10`, formdata)
        .pipe(
          tap(data => data)
        );
    }
  }

  // Purchase

  buyPackage(company, data) {
    return this.http.post<Package>(`${url}/companies/${company}/purchasepackages`, data)
      .pipe(
        tap(data => data)
      );
  }

  getBuyPackage(id) {
    return this.http.get<any>(`${url}/companies/${id}/purchases`)
      .pipe(
        tap(data => data)
      );
  }

  addDocument(id, endpoint, data) {
    return this.http.post<any>(`${url}/companies/${id}/${endpoint}`, data)
      .pipe(
        tap(data => data)
      );
  }

  removeDocument(id, endpoint) {
    return this.http.delete<any>(`${url}/companies/${id}/${endpoint}`)
      .pipe(
        tap(data => data)
      );
  }
}
