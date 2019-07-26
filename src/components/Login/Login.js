import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
//import '@okta/okta-signin-widget/dist/css/okta-theme.css';

export default class Login extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      features: {
        registration: true,                 // Enable self-service registration flow
        rememberMe: true                  // Enable voice call-based account recovery
      },
      redirectUri: window.location.origin + '/implicit/callback'
    });
    this.widget.renderEl({el}, this.onSuccess, this.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  onSuccess(res) {
    if (res.status === 'SUCCESS') {
      return this.props.auth.redirect({
        sessionToken: res.session.token
      });
   } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  onError(err) {
    console.log('error logging in', err);
  }
  render() {
    return <div />;
  }
};