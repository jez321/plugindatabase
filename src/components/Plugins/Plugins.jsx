import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faCheckCircle, faSpinner, faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as regFaStar, faCheckCircle as regFaCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { withAuth } from '@okta/okta-react';
import { PluginsWrap, PluginListTypes, PluginList } from './Plugins.styles';
import api from '../../api/api';
import SearchBox from '../SearchBox/SearchBox';
import LinkButton from '../LinkButton/LinkButton';

const Plugins = withAuth(({ auth }) => {
  // TODO: Save to db instead of localStorage
  const lsOwned = localStorage.getItem('pluginsOwned');
  const lsWanted = localStorage.getItem('pluginsWanted');
  const [plugins, setPlugins] = useState([]);
  const [pluginsOwned, setPluginsOwned] = useState(lsOwned ? JSON.parse(lsOwned) : {});
  const [pluginsWanted, setPluginsWanted] = useState(lsWanted ? JSON.parse(lsWanted) : {});
  const [searchTerm, setSearchTerm] = useState('');
  const [pluginListType, setPluginListType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  async function checkAuthentication() {
    const at = await auth.isAuthenticated();
    if (at !== authenticated) {
      setAuthenticated(at);
    }
  }
  useEffect(() => {
    checkAuthentication();
  });
  function searchChanged(st) {
    setSearchTerm(st);
  }
  const togglePluginOwned = (p) => {
    const temp = { ...pluginsOwned };
    if (pluginsOwned[p.id_plugin]) {
      delete temp[p.id_plugin];
    } else {
      temp[p.id_plugin] = true;
    }
    localStorage.setItem('pluginsOwned', JSON.stringify(temp));
    setPluginsOwned(temp);
  };
  const togglePluginWanted = (p) => {
    const temp = { ...pluginsWanted };
    if (pluginsWanted[p.id_plugin]) {
      delete temp[p.id_plugin];
    } else {
      temp[p.id_plugin] = true;
    }
    localStorage.setItem('pluginsWanted', JSON.stringify(temp));
    setPluginsWanted(temp);
  };
  const isPluginOwned = p => pluginsOwned[p.id_plugin];
  const isPluginWanted = p => pluginsWanted[p.id_plugin];
  useEffect(() => {
    // get from api
    setLoading(true);
    api.get(`plugins?search=${searchTerm}&sortby=name&sortdr=asc`).then((response) => {
      setLoading(false);
      setPlugins(response.data);
    });
  }, [pluginListType, searchTerm]);
  return (
    <Fragment>
      <PluginsWrap>
        <div>
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
                      {` Owned (${Object.keys(pluginsOwned).length})`}
                    </LinkButton>
                  </li>
                  <li data-test="plugin-type-list-option">
                    <LinkButton
                      onClick={() => setPluginListType('wanted')}
                      className={pluginListType === 'wanted' ? 'plugin-list-type-active' : ''}
                    >
                      <FontAwesomeIcon icon={faStar} />
                      {` Wanted (${Object.keys(pluginsWanted).length})`}
                    </LinkButton>
                  </li>
                </>
              ) : null}
          </PluginListTypes>
        </div>
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
              <Fragment>
                {plugins.length === 0
                || (pluginListType === 'owned' && Object.keys(pluginsOwned).length === 0)
                || (pluginListType === 'wanted' && Object.keys(pluginsWanted).length === 0)
                  ? (
                    <div>No plugins</div>
                  )
                  : (
                    <PluginList>
                      {plugins.map((p) => {
                        if (pluginListType === 'owned' && !pluginsOwned[p.id_plugin]) return '';
                        if (pluginListType === 'wanted' && !pluginsWanted[p.id_plugin]) return '';
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
              </Fragment>
            )
          }
        </div>
      </PluginsWrap>
    </Fragment>
  );
});

Plugins.propTypes = {
};

export default Plugins;
