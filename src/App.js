import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie';
import { CookiesBanner } from 'components-extra'
import {
  withRouter
} from 'react-router-dom'
import Footer from './containers/Footer'

class App extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    const acceptCookies = cookies.get('acceptCookies')
    this.state = {
      acceptCookies,
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
  
  privacy = () => {
    this.props.history.push('/privacy')
  }
  cookiesConsent = () => {
    const { cookies } = this.props;
    cookies.set('acceptCookies', 'acceptCookies')
    this.setState({
      acceptCookies: 'acceptCookies'
    })
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
        <Container style={{ minWidth: '100%', marginTop: '0', minHeight: '100vh', backgroundColor: '#E1E2E8' }}>
          <CookiesBanner style={{ display: this.state.acceptCookies ? 'none' : 'flex' }} className="cookie-banner" text="This site uses proprietary cookies in order to improve the browsing experience. For more information, read the Privacy Policy.">
          <CookiesBanner.Button onClick={this.privacy}>
              More
        </CookiesBanner.Button>
            <CookiesBanner.Button onClick={this.cookiesConsent}>
              Ok
        </CookiesBanner.Button>
          </CookiesBanner>
          <Routes childProps={childProps} />
          <Footer></Footer>
        </Container>
    );
  }
}

export default withRouter(withCookies(App));
