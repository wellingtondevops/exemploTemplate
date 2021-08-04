import { Pagination } from './pagination';
import { Departament } from './departament';

export class Batch {
  _links: {
    self: string
  };
  _id: string;
  name: string;
  adress: string;
  province: string;
  city: string;
  fone: string;
  email: string;
  answerable: string;
  departaments: Departament[];
  typePerson: string;
  cpf: string;
  cnpj: string;
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


