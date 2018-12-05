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

const { login } = authAction;

export default class Index extends Component {

  componentDidMount() {
    Auth0.login();
  }
  render() {

    return (
      <IndexStyleWrapper className="">
        f
      </IndexStyleWrapper>
    );
  }
}
