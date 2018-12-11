import auth0 from 'auth0-js';
import { AUTH_CONFIG } from '../../settings';
import AuthHelper from '../authHelper';


class Auth0Helper {

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    // audience: `https://${params.domain}/userinfo`,
    // audience: params.apiAudience,
    redirectUri: AUTH_CONFIG.callbackUrl,
    scope: 'openid profile read:current_user',
    responseType: 'token id_token',
    // auto_login: false
  });

  constructor() {
    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  signin() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: AUTH_CONFIG.clientId
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          return resolve(authResult);
        } else if (err) {
          console.log(err);
          return reject(err);
        }
      });
    })
  }

  // checkSession() {
  //   return new Promise((resolve, reject) => {
  //     this.auth0.checkSession({}, (err, authResult) => {
  //       if (authResult && authResult.accessToken && authResult.idToken) {
  //         this.setSession(authResult);
  //         return resolve(authResult);
  //       } else if (err) {
  //         console.log(err);
  //         return reject(err);
  //       }
  //     });
  //   })
  // }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      try {
        const access_token = localStorage.getItem('access_token')

        this.auth0.client.userInfo(access_token, (err, user) => {
          if (err) {
            reject(err)
          }
          resolve(user)
        })



        // const access_token = localStorage.getItem('access_token')
        // const id_token = localStorage.getItem('id_token')
        // const profile = AuthHelper.decodeToken(id_token)
        // const auth0Manage = new auth0.Management({
        //   domain: AUTH_CONFIG.domain,
        //   token: access_token
        // });
        // auth0Manage.getUser(profile.sub , (err, user) => {
        //   if (err) {
        //     reject(err)
        //   }
        //   resolve(user)
        // });
      } catch (err) {
        reject(err)
      }

    })

  }

}

export default new Auth0Helper();
