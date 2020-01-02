import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';
import App from './components/App';
import Login from './components/Login/Login';
import * as serviceWorker from './serviceWorker';
import Plugins from './components/Plugins/Plugins';
import Deals from './components/Deals/Deals';

ReactDOM.render(
  <BrowserRouter>
    <Security
      issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
      client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
      redirect_uri={`${window.location.origin}/implicit/callback`}
    >
      <App>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/deals" />
            )}
          />
          <Route path="/login" exact render={() => <Login baseUrl="https://dev-786379.okta.com" />} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <SecureRoute path="/plugins" exact component={Plugins} />
          <Route path="/deals" exact component={Deals} />
        </Switch>
      </App>
    </Security>
  </BrowserRouter>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
