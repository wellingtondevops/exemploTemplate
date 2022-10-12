import { Departament } from 'src/app/models/departament';
import { Doctype } from 'src/app/models/doctype';
import { Pagination } from 'src/app/models/pagination';

export class ObjNew {
    _links: {
        self: string
    };
    _id: string;
    location: string;
    volumeType: string;
    guardType: string;
    storehouse: {
        _id: string,
        name: string
    };
    company: {
        _id: string,
        name: string
    };
    departament: Departament;
    doct: Doctype;
    tag: string[];
    author: Author;
}

class Author {
    _id: string;
    email: string;
}

export class objList {
    _links: Pagination;
    items: ObjNew[];
  }