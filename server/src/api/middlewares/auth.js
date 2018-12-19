const httpStatus = require('http-status');
const passport = require('passport');
const User = require('../models/user.model');
const APIError = require('../utils/APIError');
const jwt = require('express-jwt');
const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const {auth0_clientSecret} = require('../../config/vars')
const axios = require('axios')

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (roles === LOGGED_USER) {
    if (user.role !== 'admin' && req.params.userId !== user._id.toString()) {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
    }
  } else if (!roles.includes(user.role)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize = (roles = User.roles) => (req, res, next) =>
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next, roles)
  )(req, res, next);

exports.oAuth = service =>
  passport.authenticate(service, { session: false });

const checkScopes = jwtAuthz([ 'read:messages' ]);

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://starchain.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'http://localhost:3000/v1/api',
  issuer: 'https://starchain.auth0.com/',
  algorithms: ['RS256']
});

const passUser = async (req, res, next) => {
  const access_token = req.headers.authorization
  try {
    const auth0User_resp = await axios('https://starchain.auth0.com/userinfo', {
      headers: {
        Authorization: req.headers.authorization
      }
    })
    const auth0User = auth0User_resp.data
    const dbUser = await User.get(auth0User.sub)
    const user = Object.assign({}, auth0User, dbUser)

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }

}

exports.checkScopes = checkScopes
exports.passUser = passUser
exports.checkJwt = checkJwt

