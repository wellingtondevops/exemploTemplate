import { Pagination } from './pagination';

export class AccessPofiles {
    _links: {
        self: string;
    };
    _id: string;
    company: Company[];
    name: string;
    author: string;
    mailSignup: string;
    dateCreated: string;
    docts: Doct[];
}

export class Company {
    _id: string;
    name: string;
}

export class Doct {
    _id: string;
    name: string;
}

export class AccessProfilesList {
    _links: Pagination;
    items: AccessPofiles;
}
