import { Pagination } from './pagination';

export class Storehouse {
  _links: {
    self: string
  };
  _id: string;
  name: string;
  dateCreated: string;
}

export class StorehousesList {
  _links: Pagination;
  items: Storehouse[];
}

export class StorehousesSearchList {
  _links: Pagination;
  items: [{
    _id: string;
    name: string;
    mailSignup: string;
    author: any;
    dateCreated: string;
    _links: any;
  }];
}


