import { Pagination } from './pagination';
export class User {
    _links: {
        self: string;
    };
    _id: string;
    email: string;
    name: string;
    permissions: Permission[];
    dateCreated: string;
    profiles: string[];
    profile: Profile;
    download: boolean;
    physicalDocuments: boolean;
    print: boolean;
    DateAcceptanceTerm: string;
    acceptanceTerm: boolean;
}
export class UserList {
    _links: Pagination;
    items: User[];
}
export class Permission {
    company: IdName;
    docts: [string[]];
}
class Profile {
    _id: string;
    profilePlaceHolder: string;
}
class IdName {
    _id: string;
    name: string;
}
