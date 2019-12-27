import React, { useState, useEffect, Fragment } from 'react';
import { useMedia } from 'use-media';
import './App.css';
import { withAuth } from '@okta/okta-react';
import { Link, NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import { useAuth } from '../auth';
import * as SC from '../constants/Style';

const SignIn = styled.div`
  font-size:16px;
  font-weight:normal;
  @media (min-width: 980px) {
    float:right;
    text-align:right;
  }
  p {
    margin:0;
    padding:0;
    margin-bottom:2px;
  }
`;

const App = withAuth((props) => {
  if (window.location.pathname === '/login') {
    return (
      <div className="App">
        {props.children}
      </div>
    );
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, user] = useAuth(props.auth);
  const [authenticated, setAuthenticated] = useState('authenticated');
  const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
  useEffect(() => {
    checkAuthentication();
  });
  async function checkAuthentication() {
    const at = await props.auth.isAuthenticated();
    if (at !== authenticated) {
      setAuthenticated(at);
    }
  }
  const closeMenu = function (event) {
    setMenuOpen(false);
  };
  const handleStateChange = function (state) {
    setMenuOpen(state.isOpen);
  };
  return (
    <div className="App">
      <Menu
        isOpen={menuOpen}
        onStateChange={state => handleStateChange(state)}
        right
        disableAutoFocus
        width="250px"
      >
        <div>
          {authenticated !== null && (
            authenticated ? (
              <SignIn>
                <p>{user ? `Welcome, ${user.given_name}` : ''}</p>
                <a style={{ cursor: 'pointer' }} onClick={() => { props.auth.logout(); closeMenu(); }}>Sign out</a>
              </SignIn>
            )
              : (
                <SignIn>
                  <p>Not signed in</p>
                  <Link onClick={() => { closeMenu(); }} to="login">Sign in/Sign up</Link>
                </SignIn>
              )
          )}
        </div>
        <NavLink onClick={closeMenu} activeClassName="nav-link-active" className="nav-link" style={{ float: 'none' }} to="/deals">Deals</NavLink>
        {authenticated ? <NavLink onClick={closeMenu} activeClassName="nav-link-active" className="nav-link" style={{ float: 'none' }} to="/myplugins">My plugins</NavLink> : ''}
      </Menu>
      <header
        style={{ padding: '0 10px', paddingTop: '10px' }}
        className="App-header"
      >
        <div style={{ float: 'left', marginRight: '20px' }}>
          <span style={{ color: '#115599' }}>Plugin</span>
          Database
          <p style={{
            margin: 0, padding: 0, fontSize: '16px', color: '#333', fontWeight: 'normal', marginTop: '5px',
          }}
          >
            Up to date and historical audio plugin sale information
          </p>
        </div>
        {!isTabletOrMobile && authenticated !== null && (
          authenticated ? (
            <SignIn>
              <p>{user ? `Welcome, ${user.given_name}` : ''}</p>
              <a style={{ cursor: 'pointer' }} onClick={() => props.auth.logout()}>Sign out</a>
            </SignIn>
          )
            : (
              <SignIn>
                <p>Not signed in</p>
                <Link to="login">Sign in/Sign up</Link>
              </SignIn>
            )
        )}
        {!isTabletOrMobile ? (
          <Fragment>
            {authenticated ? <NavLink activeClassName="nav-link-active" className="nav-link" to="/myplugins">My plugins</NavLink> : ''}
            <NavLink activeClassName="nav-link-active" className="nav-link" to="/deals">Deals</NavLink>
          </Fragment>
        ) : ''
          }
        <div style={{ clear: 'both' }} />
        <p style={{
          margin: 0, padding: 0, fontSize: '16px', color: '#333', fontWeight: 'normal', marginTop: '5px',
        }}
        >
          Up to date and historical audio plugin sale information
        </p>
      </header>
      <div style={{ padding: '0 10px' }}>
        {props.children}
      </div>
    </div>
  );
});
export default App;
