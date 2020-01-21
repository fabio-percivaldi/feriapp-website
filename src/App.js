import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import Routes from "./Routes";
import config from "./config";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    this.loadFacebookSDK();

    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "not authenticated") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container" style={{ maxWidth: '100%', padding: '0px 0px 0px 0px', marginTop: '0', maxHeight: '100vh', backgroundRepeat: 'round', backgroundImage: 'url("./background.jpg")' }}>

          <Navbar style={{ backgroundColor: 'white', height: '8%' }}>
            <Navbar.Brand href="/">
              <img
                alt=""
                src="./feriapp_icon.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Feriapp
          </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              {this.state.isAuthenticated ? (
                <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
              ) : (
                  <Fragment>
                    <Button className="orange-button" style={{ marginRight: '20px' }} href="/signup">Signup</Button>
                    <Button className="orange-button" href="/login">Login</Button>
                  </Fragment>
                )}
            </Navbar.Collapse>
          </Navbar>
          <Routes 
          childProps={childProps} />
          <Navbar style={{ backgroundColor: 'white', height: '8%', marginBottom: '0' }}>
            <Navbar.Collapse className="justify-content-end">
            </Navbar.Collapse>
          </Navbar>
        </div>
      )
    );
  }
}

export default withCookies(App);
