// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'netflix-37897',
    appId: '1:1059694493823:web:d0465008e650b73ea07f4a',
    storageBucket: 'netflix-37897.appspot.com',
    apiKey: 'AIzaSyAiTAxzYpbNhkHm65-o99dba4YEUGaboZM',
    authDomain: 'netflix-37897.firebaseapp.com',
    messagingSenderId: '1059694493823',
  },
  baseURL: 'http://localhost:4201/',
  TMDBbaseUrl: 'https://api.themoviedb.org/3/',
  apyKeyTMDB: '5f6bf192ba8188e3ecb3599d702c5573',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
