// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import authAction from '../../redux/auth/actions';
// import Auth0 from '../../helpers/auth0'
// const { checkAuthorization } = authAction;

// export class Auth0Callback extends Component {
//   componentDidMount() {
//     Auth0.handleAuthentication()
//     this.props.checkAuthorization()
//   }
//   render() {
//     return (
//       <div></div>
//     );
//   }
// }

// export default connect(
  // state => ({
  //   auth: state.Auth,
  // }),
//   { checkAuthorization }
// )(Auth0Callback);




import React, { Component } from 'react';
import { connect } from "react-redux";
import authAction from '../../redux/auth/actions';

const { logout, handleAuthentication, callbackLoading } = authAction

class Auth0Callback extends Component {

  // componentWillMount() {
  //   this.props.callbackLoading();
  //   console.log('willmount')

  //   this.forceUpdate();
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //       console.log('shouldupdate')
  //   if (/access_token|id_token|error/.test(nextProps.location.hash)) {
  //     this.props.handleAuthentication((err, result) => {
  //       if (err) {
  //         this.props.history.push('/');
  //         return;
  //       }
  //         this.props.history.push('/dashboard')
  //         return;
  //     });
  //   } else {
  //     this.props.history.push('/');
  //   }
  //   return this.props.callbackLoading === false;
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('new')
  //   this.props.logout();
  //   const that = this;
  //   if (/access_token|id_token|error/.test(nextProps.location.hash)) {
  //     this.props.handleAuthentication((err, result) => {
  //       if (err) {
  //         this.props.history.push('/');
  //         return;
  //       }
  //         this.props.history.push('/dashboard')
  //         return;
  //     });
  //   } else {
  //     this.props.history.push('/');
  //   }
  // }

  componentDidMount() {
    console.log(this.props.history)
    if (/access_token|id_token|error/.test(this.props.history.location.hash)) {
      this.props.handleAuthentication((err, result) => {
        if (err) {
          console.log(err)
          this.props.history.push('/');
          return;
        }
        console.log('callbbackksed!!')
          this.props.history.push('/dashboard')
          return;
      });
    } else {
      this.props.history.push('/');
    }
  }

  render() {
      return (
        <div></div>
      )
  }

}


export default connect(
  state => ({
    auth: state.Auth,
  }),{
  logout,
  callbackLoading,
  handleAuthentication
})(Auth0Callback);