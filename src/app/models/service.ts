import { Pagination } from './pagination';

export class CompanyServices {
  link: {
    self: string;
  }
  _id: string;
  datePrice: string;
  price: number;
  company: Company[];
  author: {
    _id: string;
    name: string;
  };
  services: Service[];
  mailSignup: string;
  dateCreated: string;
}

class Service {
  description: {
    _id: string;
    descriptionService: string;
  };
  _id: string;
  datePrice: string;
  price: number
}

export class CompanyServiceList {
  _links: Pagination;
  items: Company[];
}

export class CompanyServiceSearchList {
  _links: Pagination;
  items: Company[];
}

class Company {
  _id: string;
  name: string;
}
