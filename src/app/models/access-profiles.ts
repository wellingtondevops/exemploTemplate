import { Pagination } from './pagination';
export class AccessProfiles {
    _links: {
        self: string;
    };
    _id: string;
    name: string;
    company: string;
    docts: AccessDocts[];
}
export class AccessProfilesList {
    _links: Pagination;
    items: AccessProfiles[];
}
export class AccessDocts {
    _id: string;
    name: string;
}
