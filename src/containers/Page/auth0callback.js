import React, { Component } from 'react';
import { connect } from 'react-redux';
// import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0'

// const { logout } = authAction;

export class Auth0Callback extends Component {
  componentDidMount() {
    Auth0.handleAuthentication()
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
  })
  // { logout }
)(Auth0Callback);
