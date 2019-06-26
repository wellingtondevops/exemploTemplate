import { Pagination } from './pagination';

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
  cpfCnpj: string;
  dateCreated: string;
}

export class CompaniesList {
  _links: Pagination;
  items: Company[];
}


