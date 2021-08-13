import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import config from "./config";
import "./index.css";
import bridges from "./store/bridges";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { SnackbarProvider } from 'notistack';
import { StyledProvider } from 'components-extra'
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

function retrieveContainer (props) {
  const {container} = props
  return container ? container.querySelector('#root') : document.querySelector('#root')
}


const rootComponent = <StyledProvider>
    <CookiesProvider>
      <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'} >
        <Provider store={bridges}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Provider>
      </BrowserRouter >
    </CookiesProvider>
  </StyledProvider>

function render(props) {
  ReactDOM.render(rootComponent, retrieveContainer(props))
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(retrieveContainer(props));
}

registerServiceWorker();
