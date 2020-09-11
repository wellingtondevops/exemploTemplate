import { Pagination } from './pagination';

export class User {
  _links: {
    self: string
  };
  _id: string;
  email: string;
  name: string;
  permissions: Permission[];
  dateCreated: string;
  profiles: string[];
  profile: {
    _id: string;
  };
  download: boolean;
  print: boolean
}

export class UserList {
  _links: Pagination;
  items: User[];
}

export class Permission {
  company: IdName;
  docts: [string[]];
}


class IdName {
  _id: string;
  name: string;
}
