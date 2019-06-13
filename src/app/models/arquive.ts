export class Arquive {
  _links: {
    self: string
  }
  _id: string;
  company: {
    _id: string,
    name: string
  };
  storehouse: {
    _id: string,
    name: string
  };
  volume: {
    _id: string,
    location: string
  };
  doct: string;
  tag: string[];
  create: string;
}

export class ArquivesList {
  _links: string;
  items: Arquive[]
}