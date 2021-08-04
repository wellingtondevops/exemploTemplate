import { Pagination } from './pagination';

export class Batch {
  _links: {
    self: string
  };
  _id: string;
  name: string;
  company: {
    _id: string;
    name: string;
  };
  doct: {
    _id: string;
    name: string;
  };
  batchNr: number;
  author: string;
  mailSignup: string;
  __v: number;
  departament: string;
  storehouse: string;
  volume: string;
  sourceVolume: boolean;
  btnEdit: boolean;
  dateCreated: string;
}

export class BatchesList {
  _links: Pagination;
  items: Batch[];
}

export class BatchesSearchList {
  _links: Pagination;
  items: [{
    _id: string;
    name: string;
  }];
}


