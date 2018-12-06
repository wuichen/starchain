const path = require('path');

// import .env variables
require('dotenv-safe').config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  auth0_domain: process.env.AUTH0_DOMAIN,
  auth0_clientId: process.env.AUTH0_CLIENT_ID,
  auth0_clientSecret: process.env.AUTH0_CLIENT_SECRET
};
