import { Pagination } from './pagination';

export class Departament {
  _links: {
    self: string
  };
  _id: string;
  name: string;
  dateCreated: string;
}

export class DepartamentList {
  _links: Pagination;
  items: Departament[];
}


