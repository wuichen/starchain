import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import IndexStyleWrapper from './index.style';
import Auth0 from "../../helpers/auth0";

const { logout } = authAction;

class VerifyEmail extends Component {

  render() {

    return (
      <IndexStyleWrapper className="">
        verify your email first!!
        <Button onClick={this.props.logout}>logout</Button>
      </IndexStyleWrapper>
    );
  }
}

export default connect(
  null,
  { logout }
)(VerifyEmail);
