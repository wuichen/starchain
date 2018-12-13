import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Steps, Icon, Button, message, Form, Avatar} from 'antd';
import InstagramLogin from 'react-instagram-login';
import axios from 'axios';

export default class SocialLink extends Component {

  componentDidMount() {
  }

  constructor(props) {
    super(props);
    this.state = {
      ig_user: null
    };
  }

  async responseInstagram(response) {
    try {
      const ig_response = await fetch('https://api.instagram.com/v1/users/self/?access_token=' + response, {mode: 'cors'})
      const ig_user = await ig_response.json()
      console.log(ig_user)
      this.setState({
        ig_user: ig_user.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  linkSocial() {
    this.props.linkSocial(this.state.ig_user)
  }


  render() {

    return (
      <div>

        <h3>
          Social Link
        </h3>
        <div>
          { this.state.ig_user ?
            ( <div>
                <Avatar src={this.state.ig_user.profile_picture} /> &nbsp;
                <span>{this.state.ig_user.username}</span>
              </div>
            ) : (
              <div>
                <Avatar icon="user" /> &nbsp;
                <InstagramLogin
                  clientId="33444dbefb4a40f593a0be7508e41cd2"
                  buttonText="Link your instagram account"
                  cssClass='link_instagram'
                  onSuccess={this.responseInstagram.bind(this)}
                  onFailure={this.responseInstagram.bind(this)}
                  implicitAuth={true}
                />
              </div>
            )
          }
        </div>
        <br />
        <div>
          <Button type="primary" onClick={this.linkSocial.bind(this)} className="login-form-button">
            Next
          </Button>
        </div>
      </div>
    )
  }
}