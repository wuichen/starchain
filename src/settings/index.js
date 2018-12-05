require('dotenv').config()
export default {
  apiUrl: 'http://yoursite.com/api/',
};
const siteConfig = {
  siteName: 'ISOMORPHIC',
  siteIcon: 'ion-flash',
  footerText: 'Isomorphic ©2018 Created by RedQ, Inc',
};
const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};

const language = 'english';

const AUTH_CONFIG = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  callbackUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL,
  responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
  scope: process.env.REACT_APP_AUTH0_SCOPE
};

const jwtConfig = {
  fetchUrl: '/v1/api',
  secretKey: 'secretKey',
};

export { siteConfig, language, themeConfig, jwtConfig, AUTH_CONFIG };
