import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Container } from "react-bootstrap";
import Routes from "./Routes";
import config from "./config";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie';
import { CookiesBanner } from 'components-extra'
import Footer from './containers/Footer'

class App extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    const acceptCookies = cookies.get('acceptCookies')
    console.log('||||||||||||||||', cookies)
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
  async componentDidMount() {
    this.loadFacebookSDK();
    // const clientType = this.getMobileOperatingSystem()
    // if (clientType === 'iOS') {
    //   window.location.href = 'https://apps.apple.com/it/app/feriapp/id1488392565'
    // }
    // if (clientType === 'Android') {
    //   window.location.href = 'https://play.google.com/store/apps/details?id=it.feriapp&gl=IT'
    // }
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
        cookie: true,
        version: 'v3.1'
      });
      window.FB.AppEvents.logPageView();
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

      !this.state.isAuthenticating && (


        <Container style={{ minWidth: '100%', marginTop: '0', minHeight: '100vh', backgroundColor: '#E1E2E8' }}>
          <CookiesBanner style={{ display: this.state.acceptCookies ? 'none' : 'flex' }} className="cookie-banner" text="Please be aware that this awesome cookies banner informs you that this awesome website uses cookies. Why ? Because cookies are an awesome delight of course!">
            <CookiesBanner.Button onClick={this.cookiesConsent}>
              Ok
        </CookiesBanner.Button>
          </CookiesBanner>
          <Routes childProps={childProps} />
          <Footer></Footer>
        </Container>
      )
    );
  }
}

export default withCookies(App);
