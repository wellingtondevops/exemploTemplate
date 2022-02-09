
export class ShowPemissionsUser {
    _id: string;
    company: {
        _id: string;
        name: string;
    };
    docts: [{
        _id: string;
        name: string
    }];
}

export class ListCompany {
    items: [{
        _id: string;
        company: {
            _id: string;
            name: string;
        }
    }];
}
