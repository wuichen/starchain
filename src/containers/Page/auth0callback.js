import React, { Component } from 'react';
import { connect } from 'react-redux';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0'
const { checkAuthorization } = authAction;

export class Auth0Callback extends Component {
  componentDidMount() {
    Auth0.handleAuthentication()
    this.props.checkAuthorization()
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
  }),
  { checkAuthorization }
)(Auth0Callback);
