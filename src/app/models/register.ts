export class Register {
    _links: {
      self: string
    };
    _id: string;
    doct: {
        _id: string;
        label: [Label];
        tag: []
    };
  }

  export class RegistersList {
    _links: {
      self: string;
      totalPage: number;
      currentPage: number;
      foundItems: number;
      next: string;
    };
    items: Register[];
  }

  export class Label {
      namefield: string;
      typeField: string;
      _id: string;
      uniq: boolean;
  }
