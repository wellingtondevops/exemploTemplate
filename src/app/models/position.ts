import { Pagination } from './pagination';
export  class Position {
    _links: {
        self: string
    };
    position: string;
    used: boolean;
    company: {
        name: string;
    };
    departament: {
        name: string;
    };
}

export  class PositionList {
    _links: Pagination;
    items: Position[];
}

export class PositionSearchList {
    _links: Pagination;
    items: [{
        _id: string;
        name: string;
    }];
}
