/**
 * An object used to get page information from the server
 */
export class Profiles {
  items: [
    {
      _links: {
        self: string
      };
      _id: string;
      profileName: string;
      profilePlaceHolder: string;
      mailSignup: string;
      __v: number;
      moves: boolean;
      templates: boolean;
      users: boolean;
      archivesRegister: boolean;
      archivesError: boolean;
      archivesImport: boolean;
      archives: boolean;
      documents: boolean;
      volumesError: boolean;
      volumesImport: boolean;
      volumes: boolean;
      departaments: boolean;
      companies: boolean;
      storehouses: boolean;
      requesters: boolean;
      delete: boolean;
      change: boolean;
      read: boolean;
      write: boolean;
      profileExternal: boolean
    }];
  _links: {
    self: string;
    totalPage: number
  }
}


