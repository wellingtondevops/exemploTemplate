import { Pagination } from './pagination';
import { Company } from './company';

export class Document {
    _links: {
        self: string;
    };
    _id: string;
    name: string;
    retentionTime: number;
    retention: string;
    __v: number;
    dateCreated: string;
    company: Company;
    dcurrentValue: number;
    dcurrentLabel: string;
    dintermediateValue: number;
    dintermediateLabel: string;
    dfinal: string;
    label: Label[];
    currentControl:boolean;
}

export class DocumentList {
    _links: Pagination;
    items: Document[];
}

export class Label {
    namefield: string;
    typeField: number;
    uniq: boolean;
    _id: string;
}

class Permission {
  _id: string;
  name: string;
  docts: DocumentSingle[];
}

export class PermissionsUser {
  _id: string;
  permissions: Permission[];

}

class DocumentSingle {
  _id: string;
  name: string;
}
