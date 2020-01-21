import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import config from "./config";
import "./index.css";
import bridges from "./store/bridges";
import { calculateBridges } from "./actions/bridges";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

window.bridges = bridges;
window.calculateBridges = calculateBridges;

ReactDOM.render(
  <CookiesProvider>
    <Router>
      <Provider store={bridges}>
        <App />
      </Provider>
    </Router>
  </CookiesProvider>,
  document.getElementById("root")
);
registerServiceWorker();
