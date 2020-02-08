import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Button, Navbar, Row, Container } from "react-bootstrap";
import Routes from "./Routes";
import config from "./config";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie';
import Login from './containers/Login'
import Signup from './containers/Signup'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
      }
  
      if (/android/i.test(userAgent)) {
          return "Android";
      }
  
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
      }
  
      return "unknown";
  }
  async componentDidMount() {
    this.loadFacebookSDK();
    const clientType = this.getMobileOperatingSystem()
    if (clientType === 'iOS') {
      window.location.href = 'https://apps.apple.com/it/app/feriapp/id1488392565'
    }
    if (clientType === 'Android') {
      window.location.href = 'https://play.google.com/store/apps/details?id=it.feriapp&gl=IT'
    }
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
        cookie     : true,
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
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      
      !this.state.isAuthenticating && (
        <Container style={{ maxWidth: '100%', padding: '0px 0px 0px 0px', marginTop: '0', height: '100vh', overflowX: 'hidden', overflowY: 'hidden', backgroundRepeat: 'round', backgroundImage: 'url("./background.jpg")' }}>
          <Row style={{height: '8%'}}>
            <Navbar style={{ backgroundColor: '#fbf8ed', width: '100%', marginBottom: '0', borderBottom: '2px solid black'}}>
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
                  <Button onClick={this.handleLogout}>Logout</Button>
                ) : (
                    <Fragment>
                      <Signup></Signup>
                      <Login userHasAuthenticated={this.userHasAuthenticated}></Login>
                    </Fragment>
                  )}
              </Navbar.Collapse>
            </Navbar>
          </Row>
          <Row style={{height: '92%'}}>
            <Routes childProps={childProps} />
          </Row>
          <Row style={{height: '8%'}}>
            <Navbar style={{ backgroundColor: '#fff8e1',  width: '100%', marginBottom: '0' }}>
              <Navbar.Collapse className="justify-content-end">
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </Container>
      )
    );
  }
}

export default withCookies(App);
