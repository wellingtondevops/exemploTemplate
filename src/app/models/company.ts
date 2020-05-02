import { Pagination } from './pagination';
import { Departament } from './departament';

export class Company {
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

export class CompaniesList {
  _links: Pagination;
  items: Company[];
}

export class CompaniesSearchList {
  _links: Pagination;
  items: [{
    _id: string;
    name: string;
  }];
}


