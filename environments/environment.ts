export const environment = {
  production: true,
  adaptiveBaseURL: false, // This option will ignore following address and use `window.location.origin` to determine api address
  apiRetryCount: 5,
  apiRetryDelay: 1500,
  apiAddress: 'https://conduit.productionready.io/',
  socketAddress: '',
  UploadsBasePath: '',
  initialLang: {
    lng: 'en',
    dir: 'ltr',
  },
};
