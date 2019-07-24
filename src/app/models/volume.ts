import { Pagination } from './pagination';
import { Company } from './company';
import { Storehouse } from './storehouse';

export class Volume {
  _links: {
    self: string
  };
  _id: string;
  email: string;
  name: string;
  storehouse: Storehouse;
  company: Company;
  dateCreated: string;
  profile: string[];
}

export class VolumeList {
  _links: Pagination;
  items: Volume[];
}
