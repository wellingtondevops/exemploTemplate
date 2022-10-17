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
    user: string;
    accessprofiles: [{
        _id: string;
        name: string;
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
export class UserDocts {
    _id: string;
    name: string;
}
export class UpdateList {
    docts: [];
}
export class UserProfile {
    _id: string;
    name: string;
}
export class UpdateProfileList {
    accessprofiles: [];
}
