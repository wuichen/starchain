import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import userAction from '../../redux/user/actions';
import IntlMessages from '../../components/utility/intlMessages';
import RegisterStyleWrapper from './register.style';
import Auth0 from "../../helpers/auth0";
import { Steps } from 'antd';
const Step = Steps.Step;

const { updateUser } = userAction;

class Register extends Component {
  state = {
    // redirectToReferrer: false,
  };

  handleRegister = () => {
    const email = document.getElementById('inputEmail').value || ''
    this.props.updateUser({
      email
    })
    console.log(email)

  };

  render() {
    return (
      <RegisterStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <h2>
              Welcome to Starchain
            </h2>
            <p>
              Register with your email to get started!
            </p>
            <br />
            <Steps size="small" current={1}>
              <Step title="Finished" />
              <Step title="In Progress" />
              <Step title="Waiting" />
            </Steps>
            <br />
            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input
                  id="inputEmail"
                  size="large"
                  placeholder="email"
                  defaultValue="demo@gmail.com"
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={this.handleRegister}>
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </RegisterStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    User: state.User
  }),
  { updateUser }
)(Register);
