import { Pagination } from './pagination';

export class Doctype {
  _links: {
    self: string
  };
  _id: string;
  name: string;
  retention: string;
  dcurrentValue: number;
  dcurrentLabel: string;
  __v: number;
  dateCreated: string;
  label: Label[];
}

export class DoctypeList {
  _links: Pagination;
  items: Doctype[];
}

export class Label {
  namefield: string;
  typeField: number;
  uniq: boolean;
  _id: string;
}
