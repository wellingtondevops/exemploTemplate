export interface Auth {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  profile: string;
  routes: Route[];
  actions: Action[];
  userExternal: boolean;
}

class Route {
  archivesError: true
  archivesImport: true
  archivesRegister: true
  archivesSearch: true
  companies: true
  departaments: true
  documents: true
  moves: true
  requesters: true
  storehouses: true
  templates: true
  users: true
  volumesError: true
  volumesImport: true
  volumesSearch: true
}

class Action {
  write: boolean
  delete: boolean
  change: boolean
  read: boolean
}
