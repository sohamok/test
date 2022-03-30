// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl : 'https://smartweld-server.azurewebsites.net/api/v1/'
  //apiUrl : 'http://localhost:3000/api/v1/',
  // apiUrl : 'http://192.168.43.11:3000/api/v1/'
  //apiUrl : 'http://192.168.0.103:3000/api/v1/'
  apiUrl : 'https://smartweld-server-dev.azurewebsites.net/api/v1/',
  socketServerUrl: 'https://smartweld-server-dev.azurewebsites.net',

  //socketServerUrl: 'http://localhost:3000',
  // storage: window.sessionStorage,
  storage: window.localStorage,
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
