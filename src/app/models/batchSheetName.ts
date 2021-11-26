import { Pagination } from './pagination';

export class BatchSheetName {
  _links: {
    self: string;
  };
  sheetname: string;
  createAt: string;
  _id: string;
}

export class BatchesSheetList {
  _links: Pagination;
  items: BatchSheetName[];
}
