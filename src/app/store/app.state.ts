import { createAction, props, createReducer, on} from '@ngrx/store';
import { CompaniesSearchList, Company } from 'src/app/models/company';

export interface AppState {
    companiesList: CompaniesSearchList[];
}

export const appInitialState: AppState = {
    companiesList: [],
};

export const getListCompanies = createAction('[App] Get List Company');
export const successLoadCompanies = createAction('[App] [Success] Load List Companies');
export const setListCompanies = createAction('[App] Set Companies', props<{ payload: CompaniesSearchList[] }>());


export const appReducer = createReducer(
    appInitialState,
    on(setListCompanies, (state, { payload }) => {
        state = {
            ...state,
            companiesList: payload
        };
        return state;
    })
);
