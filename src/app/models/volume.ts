import { Pagination } from './pagination';

export class Volume {
  _links: {
    self: string
  };
  _id: string;
  email: string;
  name: string;
  dateCreated: string;
  profile: string[];
}

export class VolumeList {
  _links: Pagination;
  items: Volume[];
}
