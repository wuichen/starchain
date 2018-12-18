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
  }

  async responseInstagram(response) {
    try {
      const ig_response = await fetch('https://api.instagram.com/v1/users/self/?access_token=' + response, {mode: 'cors'})
      const ig_user = await ig_response.json()
      ig_user.data.access_token = response
      this.props.linkSocial(ig_user.data)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.props.social_data)
    return (
      <div>

        <h3>
          Social Link
        </h3>
        <div>
          { this.props.social_data ?
            ( <div>
                <Avatar src={this.props.social_data.profile_picture} /> &nbsp;
                <span>{this.props.social_data.username}</span>
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
          <Button type="primary" onClick={this.props.next} className="login-form-button">
            Next
          </Button>
        </div>
      </div>
    )
  }
}