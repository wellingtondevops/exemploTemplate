import { CompaniesList, CompaniesSearchList, Company } from 'src/app/models/company';
import { AppState, getListCompanies, setListCompanies, successLoadCompanies } from './app.state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs/';
import { Store } from '@ngrx/store';
import { withLatestFrom, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const url = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CompaniesEffectService {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<{ app: AppState }>,
    ) { }

    carregaTodos = createEffect(
        () => this.actions$.pipe(
            ofType(getListCompanies),
            withLatestFrom(
                this.store.select('app').pipe(
                    map(app => app.companiesList)
                )
            ),
            switchMap(([action, companiesList]) => {
                if (companiesList.length === 0) {
                    return this.http.get<CompaniesSearchList[]>(`${url}/listcompanies/`)
                        .pipe(
                            tap(companiesList => this.store.dispatch(setListCompanies({ payload: companiesList }))),
                            map(() => successLoadCompanies())
                        );
                }
                return of(successLoadCompanies());
            }
            )
        )
    )

    //         ofType(getListCompanies),
    //         withLatestFrom (
    //             this.store.select('app').pipe(
    //                 map(app => app.companiesList)
    //             )
    //         ),
    //         switchMap(([action, companiesList]) => {
    //             if (companiesList.length === 0) {
    //                 return this.http.get<Company[]>(`${url}/companies/`)
    //                     .pipe(
    //                         tap(listCompnies => this.store.dispatch(setListCompanies({ payload: listCompnies }))),
    //                         map(() => successLoadCompanies())
    //                     );
    //             }
    //             return of(successLoadCompanies());
    //         })
    //     )
    // );
}
