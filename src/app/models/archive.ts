import { Doctype } from './doctype';
import { Departament } from './departament';
import { Pagination } from './pagination';



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
  picture: {
    _id: string,
    url: string,
    name: string,
    page: number
  };
  startcurrentdate: string;
  departament: Departament;
  doct: Doctype;
  tag: string[];
  create: string;
  author: Author;
  sponsor: Sponsor;
  startDateCurrent: string;
  finalDateCurrent: string;
  startDateIntermediate: string;
  finalDateIntermediate: string;
  finalFase: string;
  exportUrl: string;
  finalCurrent: Boolean;
  finalIntermediate: Boolean;
  final: Boolean;
  pending: Boolean;
}

class Author {
  _id: string;
  email: string;
}

class Sponsor {
  _id: string;
  name: string;
  cnpj: string;
}

// export class ArchivesList {
//   _links: {
//     self: string;
//     totalPage: number;
//     currentPage: number;
//     foundItems: number;
//     next: string;
//   };
//   items: Archive[];
// }
export class ArchivesList {
  _links: Pagination;
  items: Archive[];
}
