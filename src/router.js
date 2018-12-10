import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

import App from './containers/App/App';
// import Auth0Callback from './containers/Page/auth0callback';
import asyncComponent from './helpers/AsyncFunc';
import Auth0 from "./helpers/auth0";

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route
          exact
          path={'/signin'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/'}
          component={asyncComponent(() => import('./containers/Page/signin'))}
        />
        <Route
          exact
          path={'/register'}
          component={asyncComponent(() => import('./containers/Page/register'))}
        />
        <Route
          path="/callback"
          component={asyncComponent(() => import('./containers/Page/auth0callback'))}
        />
        <RestrictedRoute
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null
}))(PublicRoutes);
