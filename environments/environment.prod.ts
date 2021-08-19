export const environment = {
  production: true,
  adaptiveBaseURL: true, // This option will ignore following address and use `window.location.origin` to determine api address
  apiRetryCount: 7,
  apiRetryDelay: 1500,
  apiAddress: 'https://conduit-api-realworld.herokuapp.com/',
  socketAddress: '',
  UploadsBasePath: '',
  initialLang: {
    lng: 'en',
    dir: 'ltr',
  },
};
