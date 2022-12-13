import { Archive } from './archive';
import { Pagination } from './pagination';

export class MovimentSearch {
  link: {
    self: string;
  };
  _id: string;
  company: {
    _id: string;
    name: string;
  };
  requester: {
    _id: string;
    name: string;
  };
  author: string;
  demandDate: string;
  itens: [];
  processed: boolean;
  title: string;
  demand: boolean;
  moveVolume: boolean;
  moveArchive: boolean;
  nr: number;
  textField: string;
  location: string;

}

export class Moviment {
  link: {
    self: string;
  };
  _id: string;
  company: {
    _id: string;
    name: string;
  };
  requester: {
    _id: string;
    name: string;
    email: string;
  };
  author: {
    _id: string;
    name: string;
  };
  demandDate: string;
  itens: [];
  processed: boolean;
  title: string;
  demand: boolean;
  normal: boolean;
  emergency: boolean;
  moveVolume: boolean;
  moveArchive: boolean;
  digital: boolean;
  delivery: boolean;
  withdraw: boolean;
  low: boolean;
  loan: boolean;
  nr: number;
}

export class MovimentList {
  _links: Pagination;
  items: MovimentSearch[];
}

export class MovimentSearchVolumes {
    departament: string;
    location: string;
	storehouse: string;
	guardType: string;
    initDate: string;
	endDate: string;
	reference: string;
}

export class MovimentSearchArchives {
  departament: string;
  location: string;
  storehouse: string;
  doct: string;
  initDate: string;
  endDate: string;
  search: string;

}
