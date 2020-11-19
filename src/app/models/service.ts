import { Pagination } from './pagination';

export class Service {
  _links: {
    self: string
  };
  _id: string;
  name: string;
  email: string;
  fone: any;
  dateCreated: string;
  permissions: Permission[];
}

export class ServiceList {
  _links: Pagination;
  items: Service[];
}

export class ServiceSearchList {
  _links: Pagination;
  items: Service[];
}



