// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   apiUrl: 'http://localhost:3000/',
//   apiUrlUpload: 'http://localhost:2000',
//   exportUrl: 'http://34.69.67.148:4000/',
//   production: false
// };
export const environment = {

  apiUrl: 'https://archiomain.archio.com.br/',
  apiUrlUpload: 'https://archioqa.appspot.com',
  exportUrl: 'https://exportarchives.archio.com.br',
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCy9X4r36l6o1PLn4DuVdFpO41P5SmA57g",
    authDomain: "archionotifier.firebaseapp.com",
    databaseURL: "https://archionotifier-default-rtdb.firebaseio.com",
    projectId: "archionotifier",
    storageBucket: "archionotifier.appspot.com",
    messagingSenderId: "805529833577",
    appId: "1:805529833577:web:9e5bfaa56d5a4b2ff4d2f8",
    measurementId: "G-DWEG5M9FGZ"
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
