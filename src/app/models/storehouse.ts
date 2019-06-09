export class Storehouse {
  _links: {
    self: string
  }
  _id: string;
  name: string;
  dateCreated: string;
}

export class StorehousesList {
  _links: string;
  items: Storehouse[]
}


