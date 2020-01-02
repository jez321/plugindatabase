import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.thisRef = React.createRef();
  }

  componentDidMount() {
    const { onSuccess, onError, baseUrl } = this.props;
    this.widget = new OktaSignIn({
      baseUrl,
      brandName: 'PluginDatabase',
      logo: '/logo.png',
      features: {
        registration: true, // Enable self-service registration flow
        rememberMe: true, // Enable voice call-based account recovery
      },
      // redirectUri: window.location.origin + '/implicit/callback'
    });
    this.widget.renderEl({ el: this.thisRef.current }, onSuccess, onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div ref={this.thisRef} />;
  }
}

SignIn.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
};
