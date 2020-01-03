import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faCheckCircle, faSpinner, faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as regFaStar, faCheckCircle as regFaCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { withAuth } from '@okta/okta-react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { PluginsWrap, PluginListTypes, PluginList } from './Plugins.styles';
import api from '../../api/api';
import SearchBox from '../SearchBox/SearchBox';
import LinkButton from '../LinkButton/LinkButton';
import {
  ADD_WANTED_PLUGIN, ADD_OWNED_PLUGIN, REMOVE_OWNED_PLUGIN, REMOVE_WANTED_PLUGIN,
} from '../../redux/actionTypes';

export const PluginsRaw = ({
  auth, removeOwned, removeWanted, addOwned, addWanted, owned, wanted,
}) => {
  // TODO: Save to db instead of localStorage
  const [plugins, setPlugins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pluginListType, setPluginListType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    async function checkAuthentication() {
      const at = await auth.isAuthenticated();
      if (at !== authenticated) {
        setAuthenticated(at);
      }
    }
    checkAuthentication();
  }, [auth, authenticated]);
  function searchChanged(st) {
    setSearchTerm(st);
  }
  const togglePluginOwned = (p) => {
    if (owned.includes(p.id_plugin)) {
      removeOwned(p.id_plugin);
    } else {
      addOwned(p.id_plugin);
    }
  };
  const togglePluginWanted = (p) => {
    if (wanted.includes(p.id_plugin)) {
      removeWanted(p.id_plugin);
    } else {
      addWanted(p.id_plugin);
    }
  };
  const isPluginOwned = p => owned.includes(p.id_plugin);
  const isPluginWanted = p => wanted.includes(p.id_plugin);
  useEffect(() => {
    // get plugin list from api
    setLoading(true);
    const source = axios.CancelToken.source();
    api.get(`plugins?search=${searchTerm}&sortby=name&sortdr=asc`, {
      cancelToken: source.token,
    }).then((response) => {
      setLoading(false);
      setPlugins(response.data);
    });
    return () => {
      source.cancel('Cancelling axios request in Plugins cleanup');
    };
  }, [pluginListType, searchTerm]);
  return (
    <>
      <PluginsWrap>
        <PluginListTypes className="clearfix" data-test="plugin-type-list">
          <li data-test="plugin-type-list-option">
            <LinkButton
              onClick={() => setPluginListType('all')}
              className={pluginListType === 'all' ? 'plugin-list-type-active' : ''}
            >
              <FontAwesomeIcon icon={faCircle} />
              {` All (${plugins.length})`}
            </LinkButton>
          </li>
          {authenticated
            ? (
              <>
                <li data-test="plugin-type-list-option">
                  <LinkButton
                    onClick={() => setPluginListType('owned')}
                    className={pluginListType === 'owned' ? 'plugin-list-type-active' : ''}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} />
                    {` Owned (${owned.length})`}
                  </LinkButton>
                </li>
                <li data-test="plugin-type-list-option">
                  <LinkButton
                    onClick={() => setPluginListType('wanted')}
                    className={pluginListType === 'wanted' ? 'plugin-list-type-active' : ''}
                  >
                    <FontAwesomeIcon icon={faStar} />
                    {` Wanted (${wanted.length})`}
                  </LinkButton>
                </li>
              </>
            ) : null}
        </PluginListTypes>
        <div style={{ flexGrow: 1, padding: '0' }}>
          <section className="search-wrap">
            <SearchBox changed={searchChanged} />
          </section>
          {loading
            ? (
              <div style={{ textAlign: 'left', fontSize: '24px' }}>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                />
              </div>
            )
            : (
              <>
                {plugins.length === 0
                || (pluginListType === 'owned' && owned.length === 0)
                || (pluginListType === 'wanted' && wanted.length === 0)
                  ? (
                    <div>No plugins</div>
                  )
                  : (
                    <PluginList>
                      {plugins.map((p) => {
                        if (pluginListType === 'owned' && !isPluginOwned(p)) return '';
                        if (pluginListType === 'wanted' && !isPluginWanted(p)) return '';
                        return (
                          <li key={p.id_plugin}>
                            { authenticated ? (
                              <div style={{
                                textAlign: 'right', fontSize: '32px', lineHeight: '48px', whiteSpace: 'nowrap',
                              }}
                              >
                                <LinkButton title={isPluginOwned(p) ? "I don't own this!" : 'I own this!'}>
                                  <FontAwesomeIcon
                                    onClick={() => { togglePluginOwned(p); }}
                                    icon={isPluginOwned(p) ? faCheckCircle : regFaCheckCircle}
                                  />
                                </LinkButton>
                                <LinkButton title={isPluginOwned(p) ? "I don't want this!" : 'I want this!'}>
                                  <FontAwesomeIcon
                                    onClick={() => { togglePluginWanted(p); }}
                                    icon={isPluginWanted(p) ? faStar : regFaStar}
                                  />
                                </LinkButton>
                              </div>
                            ) : null }
                            <div>
                              <p className="small-text">
                                {`${p.company} | ${p.category}`}
                              </p>
                              <p>{p.name}</p>
                            </div>
                          </li>
                        );
                      })}
                    </PluginList>
                  )
                }
              </>
            )
          }
        </div>
      </PluginsWrap>
    </>
  );
};

PluginsRaw.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
  addWanted: PropTypes.func.isRequired,
  removeWanted: PropTypes.func.isRequired,
  addOwned: PropTypes.func.isRequired,
  removeOwned: PropTypes.func.isRequired,
  owned: PropTypes.arrayOf(PropTypes.number).isRequired,
  wanted: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const mapStateToProps = state => ({
  wanted: state.plugins.wantedPlugins,
  owned: state.plugins.ownedPlugins,
});
const mapDispatchToProps = dispatch => ({
  addWanted: pluginId => dispatch({ type: ADD_WANTED_PLUGIN, pluginId }),
  removeWanted: pluginId => dispatch({ type: REMOVE_WANTED_PLUGIN, pluginId }),
  addOwned: pluginId => dispatch({ type: ADD_OWNED_PLUGIN, pluginId }),
  removeOwned: pluginId => dispatch({ type: REMOVE_OWNED_PLUGIN, pluginId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(PluginsRaw));
