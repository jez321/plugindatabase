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
    text-align:right;
  }
  p {
    margin:0;
    padding:0;
    margin-bottom:2px;
  }
`;

const AppHeader = styled.header`
  font-size: calc(10px + 3vmin);
  color: #333;
  font-size:32px;
  text-align: left;
  font-weight: bold;
  padding: 10px 10px 0 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .top-menu {
    display: flex;
    justify-content: flex-end;
  }
 .nav-link {
    float:right;
    text-decoration: none;
    margin-right:30px;
    font-size:24px;
    line-height: 40px;
    color: #999;
  }
  .nav-link:visited {
    color: #999;
  }
  .nav-link:hover {
    color: #777;
  }
  .nav-link-active {
    color: #333;
  }
  .nav-link-active:visited {
    color: #333;
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
        <NavLink onClick={closeMenu} activeClassName="nav-link-active" className="nav-link" style={{ float: 'none' }} to="/plugins">Plugins</NavLink>
        {authenticated ? <NavLink onClick={closeMenu} activeClassName="nav-link-active" className="nav-link" style={{ float: 'none' }} to="/profile">My profile</NavLink> : ''}
      </Menu>
      <AppHeader>
        <div className="logo">
          <span style={{ color: '#115599' }}>Plugin</span>
          Database
          <p style={{
            margin: 0, padding: 0, fontSize: '16px', color: '#333', fontWeight: 'normal', marginTop: '5px',
          }}
          >
            Up to date and historical audio plugin sale information
          </p>
        </div>
        <div className="top-menu">
          {!isTabletOrMobile ? (
            <Fragment>
              <NavLink activeClassName="nav-link-active" className="nav-link" to="/deals">Deals</NavLink>
              <NavLink activeClassName="nav-link-active" className="nav-link" to="/plugins">Plugins</NavLink>
              {authenticated ? <NavLink activeClassName="nav-link-active" className="nav-link" to="/profile">My profile</NavLink> : ''}
            </Fragment>
          ) : ''
          }
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
        </div>
      </AppHeader>
      <div style={{ padding: '0 10px' }}>
        {props.children}
      </div>
    </div>
  );
});
export default App;
