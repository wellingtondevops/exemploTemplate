import { Pagination } from './pagination';
import { Company } from './company';
import { Storehouse } from './storehouse';
import { Departament } from './departament';

export class Volume {
  _links: {
    self: string
  };
  _id: string;
  description: string;
  location: string;
  departament: Departament;
  storehouse: Storehouse;
  company: Company;
  guardType: string;
  uniqueField: string;
  volumeType: string;
  dateCreated: string;
  status: string;
}

export class VolumeList {
  _links: Pagination;
  items: Volume[];
}
