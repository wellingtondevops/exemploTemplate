import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, UserList } from '../../models/user';
import { Profiles } from '../../models/profiles';
import { Moviment, MovimentList, MovimentSearchArchives, MovimentSearchVolumes } from 'src/app/models/moviment';
import { Company } from 'src/app/models/company';
import { Departament } from 'src/app/models/departament';
const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MovimentsService {

  constructor(public http: HttpClient) { }

  searchMoviments(formData, page) {
    if (page) {
      return this.http.post<MovimentList>(`${url}/demands/search?_page=${page.pageNumber}&size=10`, formData)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<MovimentList>(`${url}/demands/search?size=10`, formData)
        .pipe(
          tap(data => data)
        );
    }
  }

  moviments(page) {
    if (page) {
      return this.http.get<MovimentList>(`${url}/demands?_page=${page.pageNumber}&size=10`)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.get<MovimentList>(`${url}/demands?size=10`)
        .pipe(
          tap(data => data)
        );
    }
  }

  deleteMoviment(user) {
    return this.http.delete<Moviment>(`${url}/demands/${user}`)
      .pipe(
        tap(data => data)
      );
  }

  updateMoviment(user) {
    return this.http.patch<Moviment>(`${url}/demands/${user._id}`, user)
      .pipe(
        tap(data => data)
      );
  }

  moviment(id) {
    return this.http.get<Moviment>(`${url}/demands/${id}`)
      .pipe(
        tap(data => data)
      );
  }

  newMoviment(user) {
    return this.http.post<Moviment>(`${url}/demands`, user)
      .pipe(
        tap(data => data)
      );
  }

  searchVolumes(data, id, page) {
    return this.http.post<any>(`${url}/demands/${id}/searchVolumes?_page=${page.pageNumber}&size=10`, data)
      .pipe(
        tap(data => data)
      );
  }

  searchArchives(data, id, page) {
    return this.http.post<any>(`${url}/demands/${id}/searchArchives?_page=${page.pageNumber}&size=10`, data)
      .pipe(
        tap(data => data)
      );
  }

  

  


  


  

  company(id) {
    return this.http.get<any>(`${url}/demands/${id}/companyDemand`)
      .pipe(
        tap(data => data)
      );
  }

  departaments(id) {
    return this.http.get<any>(`${url}/demands/${id}/listDepartaments`)
      .pipe(
        tap(data => data)
      );
  }

  documents(id) {
    return this.http.get<any>(`${url}/demands/${id}/listDocuments`)
      .pipe(
        tap(data => data)
      );
  }

  removeMoviment(id, data) {
    return this.http.post<any>(`${url}/demands/${id}/removeItensDemand`, { itens: data })
      .pipe(
        tap(data => data)
      );
  }

  showItensArchives(id, form, page = null) {
    if(page){
    return this.http.post<any>(`${url}/demands/${id}/showItensArchives?_page=${page.pageNumber}`, form)
      .pipe(
        tap(data => data)
      );
    } else {
      return this.http.post<any>(`${url}/demands/${id}/showItensArchives`, form ? form : {})
      .pipe(
        tap(data => data)
      );
    }
  }

  showItensVolumes(id, form, page = null) {
    if (form && page) {
      return this.http.post<any>(`${url}/demands/${id}/showItensVolumes?_page=${page.pageNumber}`, form)
        .pipe(
          tap(data => data)
        );
    } else {
      return this.http.post<any>(`${url}/demands/${id}/showItensVolumes`, {})
        .pipe(
          tap(data => data)
        );
    }
  }

  generatMoviment(id, data) {
    return this.http.post<any>(`${url}/demands/${id}/generatDemand`, { itens: data })
      .pipe(
        tap(data => data)
      );
  }

  countMove(id) {
    return this.http.get<any>(`${url}/demands/${id}/countMove`)
      .pipe(
        tap(data => data)
      );
  }

  services(id) {
    return this.http.get<any>(`${url}/demands/${id}/listSevices`)
      .pipe(
        tap(data => data)
      );
  }

  processMove(id, form){
    return this.http.post<any>(`${url}/demands/${id}/processMove`, form)
    .pipe(
      tap(data => data)
    );
  }

  lows(id, form){
    return this.http.post<any>(`${url}/demands/${id}/lows`, form)
    .pipe(
      tap(data => data)
    );
  }

  devolutions(id, form){
    return this.http.post<any>(`${url}/demands/${id}/devolutions`, form)
    .pipe(
      tap(data => data)
    );
  }
}
