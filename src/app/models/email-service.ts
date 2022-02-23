import { Pagination } from './pagination';
export class EmailService {
    _links: {
        self: string;
    };
    _id: string;
    title: string;
    archive: {
        _id: string;
        pending: boolean;
    };
    userSernder: {
        _id: string,
        name: string
    };
    highlighted: boolean;
    dateCreated: string;
    notes: string;
}
