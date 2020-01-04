import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Card from './Card/Card';
import NoItemsMsg from './CardList.styles';

const CardListRaw = (props) => {
  const {
    auth, owned, wanted, data, sortChanged, loading,
  } = props;
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
  if (loading) {
    cards = (
      <div style={{ textAlign: 'center', fontSize: '24px' }}>
        <FontAwesomeIcon
          icon={faSpinner}
          spin
        />
      </div>
    );
  } else {
    cards = data.map(d => (
      <Card
        data-test="component-card"
        key={d.id_deal}
        data={d}
        owned={isPluginOwned(d.id_plugin)}
        wanted={isPluginWanted(d.id_plugin)}
        showOwnedWanted={authenticated}
      />
    ));
  }
  return (
    data.length > 0 ? (
      <div>
        {cards}
      </div>
    ) : (
      <NoItemsMsg>No deals</NoItemsMsg>
    )
  );
};

CardListRaw.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
  owned: PropTypes.arrayOf(PropTypes.number).isRequired,
  wanted: PropTypes.arrayOf(PropTypes.number).isRequired,
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
  loading: PropTypes.bool,
};
CardListRaw.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  owned: state.plugins.ownedPlugins,
  wanted: state.plugins.wantedPlugins,
});

export default connect(mapStateToProps)(withAuth(CardListRaw));
