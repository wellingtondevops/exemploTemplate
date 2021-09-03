import { Pagination } from 'src/app/models/pagination';
export class Charts {
    _links: {
        self: string;
    };
    y: number;
    Street: string;
    x: string;
}

export class ChartsData {
    items: Charts[];
}

export class ChartsItems{
    _links: Pagination;
    items: [{
        x: string;
        Street: string;
        y: number;
    }];
}
