import { Pagination } from './pagination';
export class AccessProfiles {
    _links: {
        self: string;
    };
    _id: string;
    name: string;
    company: string;
    author: string;
    dateCreated: string;
}
export class AccessProfilesList {
    _links: Pagination;
    items: AccessProfiles[];
}
