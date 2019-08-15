import { Pagination } from './pagination';

export class Document {
    _links: {
        self: string;
    };
    _id: string;
    name: string;
    retentionTime: number;
    retention: string;
    __v: number;
    dateCreated: string;
    label: Label[];
}

export class DocumentList {
    _links: Pagination;
    items: Document[];
}

export class Label {
    namefield: string;
    typeField: number;
    uniq: boolean;
    _id: string;
}