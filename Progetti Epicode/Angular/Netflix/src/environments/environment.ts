// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlLocale: 'http://localhost:4201/',
  baseUrl: 'https://netflix-clone-2dbe3-default-rtdb.firebaseio.com/',
  TMDBbaseUrl: 'https://api.themoviedb.org/3/',
  apyKeyTMDB: '5f6bf192ba8188e3ecb3599d702c5573',
  APIkeyFirebase: 'AIzaSyCy5rhZuvYEaRmHoW2CabwCheQi0-d-DEo',
  signUpURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCy5rhZuvYEaRmHoW2CabwCheQi0-d-DEo',
  signInURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCy5rhZuvYEaRmHoW2CabwCheQi0-d-DEo',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
