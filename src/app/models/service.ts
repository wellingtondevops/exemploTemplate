import { Pagination } from './pagination';

export class Service {
  description: {
    _id: string;
    descriptionService: string;
  };
  _id: string;
  datePrice: string;
  price: number;
  company: Company[];
  author: {
    _id: string;
    name: string;
  };
  mailSignup:string;
  dateCreated: string;
}

export class ServiceList {
  _links: Pagination;
  items: Company[];
}

export class ServiceSearchList {
  _links: Pagination;
  items: Company[];
}

class Company {
  _id: string;
  name: string;
}
