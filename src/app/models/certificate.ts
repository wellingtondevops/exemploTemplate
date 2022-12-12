import { Pagination } from './pagination';

export class Certificate {
  _links: {
    self: string
  };
  _id: string;
  subscriber: string;
  notBefore: string;
  notAfter: string;
  mailSignup: string;
  dateCreated: string;
  password: string;
  fileName: string;
}

export class CertificateList {
  _links: Pagination;
  items: Certificate[];
}

export class CertificateSearchList {
  _links: Pagination;
  items: [{
    _id: string;
    name: string;
  }];
}
