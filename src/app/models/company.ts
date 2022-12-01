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
  pagesAvailable?: number;
//   filesAvailable?: number;
  allDocuments: boolean;
  ocr: boolean;
  signature: boolean;
  certificate: CertificateCompany[];
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

export class CertificateCompany {
  _id: string;
  subscriber: string;
  fileName: string;
  notBefore: string;
  notAfter: string;
}


