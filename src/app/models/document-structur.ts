import { Pagination } from './pagination';

export class DocumentStructur {
  _links: {
    self: string
  };
  _id: string;
  structureName: string;
  classes: Class[];
  author: string;
  dateCreated: string;
}

export class Class {
  codTopic: string;
  topic: string;
  currentLabel: string;
  currentValue: number;
  intermediateLabel: string;
  intermediateValue: string;
  final: string;
  comments: string;
  subclasses: SubClass[];
}

export class SubClass {
  codTopic: string;
  topic: string;
  currentLabel: string;
  currentValue: number;
  intermediateLabel: string;
  intermediateValue: string;
  final: string;
  comments: string;
  groups: Group[];
}

export class Group {
  codTopic: string;
  topic: string;
  currentLabel: string;
  currentValue: number;
  intermediateLabel: string;
  intermediateValue: string;
  final: string;
  comments: string;
  subgroups: SubGroup[];
}

export class SubGroup {
  codTopic: string;
  topic: string;
  currentLabel: string;
  currentValue: number;
  intermediateLabel: string;
  intermediateValue: string;
  final: string;
  comments: string;
}

export class DocumentsStructurList {
  _links: Pagination;
  items: DocumentStructur[];
}
