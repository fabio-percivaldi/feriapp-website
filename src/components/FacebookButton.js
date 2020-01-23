import React, { Component } from "react";
import { Auth } from "aws-amplify";
// import FacebookLogin from 'react-facebook-login';
import LoaderButton from './LoaderButton'

import { FacebookLoginButton } from "react-social-login-buttons";

import './FacebookButton.css'
function waitForInit() {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

export default class FacebookButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await waitForInit();
    this.setState({ isLoading: false });
  }

  statusChangeCallback = response => {
    if (response.status === "connected") {
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    window.FB.login(this.checkLoginState, { scope: "public_profile,email" });
  };

  handleError(error) {
    alert(error);
  }

  async handleResponse(data) {
    const { email, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };

    this.setState({ isLoading: true });

    try {
      const response = await Auth.federatedSignIn(
        "facebook",
        { token, expires_at },
        user
      );
      this.setState({ isLoading: false });
      this.props.onLogin(response);
    } catch (e) {
      this.setState({ isLoading: false });
      this.handleError(e);
    }
  }
  responseFacebook = (response) => {
    console.log(response);
  }
  render() {
    return (
        <FacebookLoginButton
          onClick={this.handleClick}
          disabled={this.state.isLoading} 
          style={{height:'40px'}}
          >
        <span>Login con Facebook</span>
      </FacebookLoginButton>
      // <LoaderButton
      //   block
      //   className="facebook-button"
      //   text="Login with Facebook"
      //   onClick={this.handleClick}
      //   disabled={this.state.isLoading}
      // />
    );
  }
}
