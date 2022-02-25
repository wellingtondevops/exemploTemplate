import { Pagination } from 'src/app/models/pagination';
export class EmailServiceList {
    _links: {
        self: string;
    };
    _id: string;
    title: string;
    archive: {
        _id: string;
        pending: boolean;
    };
    userSernder: {
        _id: string,
        name: string
    };
    highlighted: boolean;
    dateCreated: string;
    notes: string;
}
export class EmailsList {
    items: EmailServiceList[];
}

export enum ResquestEnum {
    CORRECAO_IMAGEM, CORRECAO_INDICE, EMPRESTIMO,
}

