// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  origin: 'https://localhost/wp-cart',
  wcEndpoint: '/wp-json/wc/v3',
  woocommerce: {
    consumer_key:  'ck_ee2c25d2645a0558b0e213428e3432d66e2efb57',
    consumer_secret: 'cs_2eb4a36b8d9a2c0a4716576e5e6dc39ed1a07e9f'
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
