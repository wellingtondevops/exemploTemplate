import { Pagination } from './pagination';
export class ShowPemissionsUser {
    _links: {
        self: string
    };
    _id: string;
    company: {
        _id: string;
        name: string;
    };
    docts: [{
        _id: string;
        name: string
    }];
}
export class ListCompany {
    items: [{
        _id: string;
        company: {
            _id: string;
            name: string;
        }
    }];
}
export class CompanyList {
    _links: Pagination;
    items: ShowPemissionsUser[];
}
