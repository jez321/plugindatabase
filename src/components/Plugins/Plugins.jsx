import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faCheckCircle, faSpinner, faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as regFaStar, faCheckCircle as regFaCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { withAuth } from '@okta/okta-react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
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
  const [searchChanged] = useDebouncedCallback(
    (st) => {
      setSearchTerm(st);
    },
    400,
  );
  const togglePluginOwned = (pluginId) => {
    if (owned.includes(pluginId)) {
      removeOwned(pluginId);
    } else {
      addOwned(pluginId);
    }
  };
  const togglePluginWanted = (pluginId) => {
    if (wanted.includes(pluginId)) {
      removeWanted(pluginId);
    } else {
      addWanted(pluginId);
    }
  };
  const isPluginOwned = pluginId => owned.includes(pluginId);
  const isPluginWanted = pluginId => wanted.includes(pluginId);
  useEffect(() => {
    async function checkAuthentication() {
      const at = await auth.isAuthenticated();
      if (at !== authenticated) {
        setAuthenticated(at);
      }
    }
    checkAuthentication();
  }, [auth, authenticated]);
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
          <section className="search-wrap" style={{ marginBottom: '0.625rem' }}>
            <SearchBox changed={searchChanged} />
          </section>
          {loading
            ? (
              <div style={{ textAlign: 'left', fontSize: '1.5rem' }}>
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
                        if (pluginListType === 'owned' && !isPluginOwned(p.id_plugin)) return '';
                        if (pluginListType === 'wanted' && !isPluginWanted(p.id_plugin)) return '';
                        return (
                          <li key={p.id_plugin}>
                            { authenticated ? (
                              <div style={{
                                textAlign: 'right', fontSize: '2rem', lineHeight: '3rem', whiteSpace: 'nowrap',
                              }}
                              >
                                <LinkButton title={isPluginOwned(p.id_plugin) ? "I don't own this!" : 'I own this!'}>
                                  <FontAwesomeIcon
                                    onClick={() => { togglePluginOwned(p.id_plugin); }}
                                    icon={isPluginOwned(p.id_plugin) ? faCheckCircle : regFaCheckCircle}
                                  />
                                </LinkButton>
                                <LinkButton title={isPluginOwned(p.id_plugin) ? "I don't want this!" : 'I want this!'}>
                                  <FontAwesomeIcon
                                    onClick={() => { togglePluginWanted(p.id_plugin); }}
                                    icon={isPluginWanted(p.id_plugin) ? faStar : regFaStar}
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
  owned: PropTypes.arrayOf(PropTypes.number).isRequired,
  wanted: PropTypes.arrayOf(PropTypes.number).isRequired,
  addWanted: PropTypes.func.isRequired,
  removeWanted: PropTypes.func.isRequired,
  addOwned: PropTypes.func.isRequired,
  removeOwned: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  owned: state.plugins.ownedPlugins,
  wanted: state.plugins.wantedPlugins,
});
const mapDispatchToProps = dispatch => ({
  addWanted: pluginId => dispatch({ type: ADD_WANTED_PLUGIN, pluginId }),
  removeWanted: pluginId => dispatch({ type: REMOVE_WANTED_PLUGIN, pluginId }),
  addOwned: pluginId => dispatch({ type: ADD_OWNED_PLUGIN, pluginId }),
  removeOwned: pluginId => dispatch({ type: REMOVE_OWNED_PLUGIN, pluginId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(PluginsRaw));
