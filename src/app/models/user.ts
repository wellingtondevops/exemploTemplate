export class User {
  _links: {
    self: string
  }
  _id: string;
  email: string;
  name: string;
  dateCreated: string;
  profile: string[]
}

export class UserList {
  _links: string;
  items: User[]
}


