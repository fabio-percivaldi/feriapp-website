import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import bridges from "./store/bridges";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { SnackbarProvider } from 'notistack';
import { StyledProvider } from 'components-extra'
import { Auth0Provider } from "@auth0/auth0-react";

window.bridges = bridges;

function retrieveContainer (props) {
  const {container} = props
  return container ? container.querySelector('#root') : document.querySelector('#root')
}


const rootComponent = <Auth0Provider
domain="dev-mqipnlbj.us.auth0.com"
clientId="TgxtZLFyI5FpBUQkc3PbtDZAkhA4WeHM"
redirectUri={`${window.location.origin}/holidays`}
><StyledProvider>
    <CookiesProvider>
      <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/bridges/' : '/'} >
        <Provider store={bridges}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Provider>
      </BrowserRouter >
    </CookiesProvider>
  </StyledProvider>
  </Auth0Provider>
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
