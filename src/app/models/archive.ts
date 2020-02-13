import { Doctype } from "./doctype";
import { Departament } from "./departament";

export class Archive {
  _links: {
    self: string
  };
  _id: string;
  company: {
    _id: string,
    name: string
  };
  storehouse: {
    _id: string,
    name: string
  };
  volume: {
    _id: string,
    location: string
  };
  departament: Departament;
  doct: Doctype;
  tag: string[];
  create: string;
}

export class ArchivesList {
  _links: {
    self: string;
    totalPage: number;
    currentPage: number;
    foundItems: number;
    next: string;
  };
  items: Archive[];
}
