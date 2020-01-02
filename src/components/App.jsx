import React, {
  useState, useEffect, useCallback, Fragment,
} from 'react';
import { useMedia } from 'use-media';
import './App.css';
import { withAuth } from '@okta/okta-react';
import { Link, NavLink } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import LinkButton from './LinkButton/LinkButton';
import { AppLogo, SignIn, AppHeader } from './App.styles';
import * as SC from '../constants/Style';

const App = withAuth(({ children, auth }) => {
  if (window.location.pathname === '/login') {
    return (
      <div className="App">
        {children}
      </div>
    );
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  if (authenticated && !user) {
    auth.getUser().then((info) => {
      setUser(info);
    });
  }
  const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
  async function checkAuthentication() {
    const at = await auth.isAuthenticated();
    if (at !== authenticated) {
      setAuthenticated(at);
    }
  }
  useEffect(() => {
    checkAuthentication();
  });
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);
  const signOutAndCloseMenu = useCallback(() => {
    auth.logout();
    closeMenu();
  }, [auth, closeMenu]);
  const signOut = useCallback(() => {
    auth.logout();
  }, [auth]);

  const handleStateChange = function handleStateChange(state) {
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
                <LinkButton onClick={signOutAndCloseMenu}>Sign out</LinkButton>
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
        <NavLink
          onClick={closeMenu}
          activeClassName="nav-link-active"
          className="nav-link"
          to="/deals"
        >
Deals
        </NavLink>
        <NavLink
          onClick={closeMenu}
          activeClassName="nav-link-active"
          className="nav-link"
          to="/plugins"
        >
Plugins
        </NavLink>
        {authenticated ? (
          <NavLink
            onClick={closeMenu}
            activeClassName="nav-link-active"
            className="nav-link"
            style={{ float: 'none' }}
            to="/profile"
          >
Profile
          </NavLink>
        ) : ''}
      </Menu>
      <AppHeader>
        <AppLogo>
          <span>Plugin</span>
          Database
          <p className="tag-text">
            Up to date and historical audio plugin sale information
          </p>
        </AppLogo>
        <div className="top-menu">
          {!isTabletOrMobile ? (
            <Fragment>
              <NavLink activeClassName="nav-link-active" className="nav-link" to="/deals">Deals</NavLink>
              <NavLink activeClassName="nav-link-active" className="nav-link" to="/plugins">Plugins</NavLink>
              {authenticated ? (
                <NavLink
                  activeClassName="nav-link-active"
                  className="nav-link"
                  to="/profile"
                >
Profile
                </NavLink>
              ) : ''}
            </Fragment>
          ) : ''
          }
          {!isTabletOrMobile && authenticated !== null && (
            authenticated ? (
              <SignIn>
                <p>{user ? `Welcome, ${user.given_name}` : ''}</p>
                <LinkButton onClick={signOut}>Sign out</LinkButton>
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
        {children}
      </div>
    </div>
  );
});
export default App;
