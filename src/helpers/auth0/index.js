import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from '../../settings';

import history from './history';
import { notification } from '../../components';

class Auth0Helper {

  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      params: {
        scope: 'openid profile'
      }
    }
  });

  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  // TODO: need to make this a react component
  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this));
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (err) => {
      console.log(err);
      notification('error', `Error: ${err.error}. Check the console for further details.`);
      // alert(`Error: ${err.error}. Check the console for further details.`);
      history.replace('/signin');
    });
  }

  checkSession() {
    return new Promise(async (resolve, reject) => {
      this.lock.checkSession({}, (err, authResult) => {
        console.log(err)
        console.log(authResult)
        if (err) {
          reject(err)
        } else {
          resolve(authResult)
        }
      })
    })
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem('access_token')
      this.lock.getUserInfo(accessToken, (err, profile) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(profile)
      })
    })
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // localStorage.setItem('profile', JSON.stringify(authResult))
      // navigate to the home route
      // history.replace('/dashboard');
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

export default new Auth0Helper();
