import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, Button, Row, Container } from "react-bootstrap";
import Routes from "./Routes";
import config from "./config";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Container style={{ maxWidth: '100%', padding: '0px 0px 0px 0px', marginTop: '0', height: '100vh', overflowX: 'hidden', overflowY: 'hidden', backgroundRepeat: 'round', backgroundImage: 'url("./background.jpg")' }}>
          <Row style={{height: '10%'}}>
            <Navbar style={{ backgroundColor: 'white', width: '100%', marginBottom: '0'}}>
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
          </Row>
          <Row style={{height: '80%'}}>
            <Routes childProps={childProps} />
          </Row>
          <Row style={{height: '10%'}}>
            <Navbar style={{ backgroundColor: 'white',  width: '100%', marginBottom: '0' }}>
              <Navbar.Collapse className="justify-content-end">
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </Container>
      )
    );
  }
}

export default withRouter(App);
