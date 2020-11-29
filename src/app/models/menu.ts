import { Pagination } from './pagination';

export class Menu {
  link: {
    self: string;
  }
  _id: string;
  author: string;
  mailSignup: string;
  descriptionService: string;
}

export class MenuList {
  _links: Pagination;
  items: Menu[];
}

export class MenuSearchList {
  _links: Pagination;
  items: Menu[];
}
