import React, { Component } from 'react';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { withAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import OktaSignInWidget from './Signin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      authenticated: null,
    };
    this.checkAuthentication();
  }


  componentDidUpdate() {
    this.checkAuthentication();
  }

  onSuccess(res) {
    if (res.status === 'SUCCESS') {
      const { auth } = this.props;
      return auth.redirect({
        sessionToken: res.session.token,
      });
    }
    return null;
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
  }

  onError(err) {
    console.error('Error logging in', err, this.constructor.name);
  }

  async checkAuthentication() {
    const { auth } = this.props;
    const { authenticated } = this.state;
    const isAuthenticated = await auth.isAuthenticated();
    if (isAuthenticated !== authenticated) {
      this.setState({ authenticated: isAuthenticated });
    }
  }

  render() {
    const { authenticated } = this.state;
    const { baseUrl } = this.props;
    if (authenticated === null) return null;
    return authenticated
      ? <Redirect to={{ pathname: '/' }} />
      : (
        <OktaSignInWidget
          baseUrl={baseUrl}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      );
  }
}
Login.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
    redirect: PropTypes.func.isRequired,
  }).isRequired,
  baseUrl: PropTypes.string.isRequired,
};
export default withAuth(Login);
