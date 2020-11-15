import { Pagination } from './pagination';

export class Requester {
  _links: {
    self: string
  };
  _id: string;
  name: string;
  email: string;
  fone: any;
  dateCreated: string;
  permissions: string;
}

export class RequesterList {
  _links: Pagination;
  items: Requester[];
}

export class RequesterSearchList {
  _links: Pagination;
  items: Requester[];
}


