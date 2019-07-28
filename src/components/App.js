import React, { useState, useEffect, Fragment } from 'react';
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
          fontWeight: 'bold', marginTop: '20px', marginBottom: '20px' }}
      >
        <div style={{ float: 'left', marginRight: '20px' }}>
          <span style={{ color: '#115599' }}>Plugin</span>
          Database
        </div>
        {authenticated !== null && (
          authenticated ? (
            <SignIn>
              <p>{user ? `Welcome, ${user.given_name}` : ''}</p>
              <a style={{ cursor: "pointer" }} onClick={() => props.auth.logout()}>Sign out</a>
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
        { !isTabletOrMobile ? 
        <Fragment>
        {authenticated ? <NavLink activeClassName="nav-link-active" className="nav-link" to="/myplugins">My plugins</NavLink> : ''}
        <NavLink activeClassName="nav-link-active" className="nav-link" to="/deals">Deals</NavLink>
        </Fragment> : ''}
        <div style={{ clear: 'both' }} />
          <p style={{ margin: 0, padding: 0, fontSize: '16px', color: '#333', fontWeight: 'normal', marginTop: '5px' }}>
            Up to date and historical audio plugin sale information
          </p>
          
        { isTabletOrMobile ? 
        <div className="clearfix" style={{marginBottom: "5px"}}>
        <NavLink activeClassName="nav-link-active" className="nav-link" style={{float: 'none'}} to="/deals">Deals</NavLink>
        {authenticated ? <NavLink activeClassName="nav-link-active" className="nav-link" style={{float: 'none'}} to="/myplugins">My plugins</NavLink> : ''}
        </div> : ''}
      </header>
      {props.children}
    </div>
  );
});
export default App;
