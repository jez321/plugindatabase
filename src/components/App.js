import React, { useState, useEffect } from 'react';
import { useMedia } from 'use-media';
import './App.css';
import * as SC from '../constants/Style';
import { withAuth } from '@okta/okta-react';
import { useAuth } from '../auth';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SignIn = styled.div`
font-size:16px;
text-align:right;
font-weight:normal;
float:right;
p {
  margin:0;
  padding:0;
  margin-bottom:2px;
}
`;

const App = withAuth((props) => {
  if (window.location.pathname === '/login') return (
    <div className="App">
      {props.children}
    </div>
  );
  const [auth, user] = useAuth(props.auth);
  const [authenticated, setAuthenticated] = useState('authenticated');
  const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
  useEffect(() => {
    checkAuthentication();
  })
  async function checkAuthentication() {
    const at = await props.auth.isAuthenticated();
    if (at !== authenticated) {
      setAuthenticated(at);
    }
  }
  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          fontWeight: 'bold', marginTop: '20px', marginBottom: '20px', marginRight: '20px',
        }}
      >
        <div style={{ float: 'left', marginRight: '20px' }}>
          <span style={{ color: '#115599' }}>Plugin</span>
          Database
            </div>
        {authenticated !== null && (
          authenticated ? (
            <SignIn>
              <p>{user ? `Welcome, ${user.given_name}` : ''}</p>
              <a href="#" onClick={() => props.auth.logout()}>Sign out</a>
            </SignIn>
          )
            :
            (
              <SignIn>
                <p>Not signed in</p>
                <Link to="login">Sign in/Sign up</Link>
              </SignIn>
            )
        )}
        {authenticated ? <NavLink activeClassName="nav-link-active" className="nav-link" to="/myplugins">My plugins</NavLink> : ''}
        <NavLink activeClassName="nav-link-active" className="nav-link" to="/deals">Deals</NavLink>
        <div style={{ clear: 'both' }} />
      </header>
      {props.children}
    </div>
  );
});
export default App;