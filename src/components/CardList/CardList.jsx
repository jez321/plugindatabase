import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Card from './Card/Card';
import NoItemsMsg from './CardList.styles';

export const CardListRaw = ({
  auth, owned, wanted, data, sortChanged, isLoading, showWantedOnly,
}) => {
  let cards;
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
  useEffect(() => {
    sortChanged('added', 'desc');
  }, [sortChanged]);
  const isPluginOwned = pluginId => owned.includes(pluginId);
  const isPluginWanted = pluginId => wanted.includes(pluginId);
  const noItems = <NoItemsMsg>No deals</NoItemsMsg>;
  if (isLoading && data.length === 0) {
    cards = (
      <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        <FontAwesomeIcon
          icon={faSpinner}
          spin
        />
      </div>
    );
  } else {
    let hasRows = false;
    cards = data.map((d) => {
      if (!showWantedOnly || isPluginWanted(d.id_plugin)) {
        hasRows = true;
        return (
          <Card
            data-test="component-card"
            key={d.id_deal}
            data={d}
            owned={isPluginOwned(d.id_plugin)}
            wanted={isPluginWanted(d.id_plugin)}
            showOwnedWanted={authenticated}
          />
        );
      }
      return null;
    });
    if (!hasRows) {
      cards = noItems;
    }
  }
  return (
    isLoading || data.length > 0 ? (
      <div className={isLoading ? 'opacity-5' : ''}>
        {cards}
      </div>
    ) : noItems
  );
};

CardListRaw.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
  owned: PropTypes.arrayOf(PropTypes.number).isRequired,
  wanted: PropTypes.arrayOf(PropTypes.number).isRequired,
  showWantedOnly: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      added: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      end_date: PropTypes.string,
      description: PropTypes.string.isRequired,
      link: PropTypes.shape({ url: PropTypes.string.isRequired, title: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
  ).isRequired,
  sortChanged: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
CardListRaw.defaultProps = {
  isLoading: false,
  showWantedOnly: false,
};

const mapStateToProps = state => ({
  owned: state.plugins.ownedPlugins,
  wanted: state.plugins.wantedPlugins,
});

export default connect(mapStateToProps)(withAuth(CardListRaw));
