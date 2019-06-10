export class Volume {
  _links: {
    self: string
  }
  _id: string;
  email: string;
  name: string;
  dateCreated: string;
  profile: string[]
}

export class VolumeList {
  _links: string;
  items: Volume[]
}