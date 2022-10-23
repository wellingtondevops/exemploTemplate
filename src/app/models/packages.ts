import { Pagination } from './pagination';

export class Package {
    link: {
        self: string;
    }
    _id: string;
    author: string;
    labelPackage: string;
    mailSignup: string;
    describe: string;
    price: number;
    descriptionService: string;
    filesPackage: number;
    pagesPackage: number;
	signature: boolean;
    ocr: boolean;
}

export class PackageList {
    _links: Pagination;
    items: Package[];
}

export class PackageSeachrList {
    _links: Pagination;
    items: Package[];
}
