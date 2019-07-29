import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const NoItemsMsg = styled.div`
  font-size:20px;
  text-align:center;
`;
const CardList = (props) => {
  const { data, sortChanged, loading } = props;
  let cards;
  useEffect(() => {
    sortChanged('added', 'desc');
  }, []);
  if (loading) {
    cards = <div style={{ textAlign: "center", fontSize: "24px" }}>
      <FontAwesomeIcon
        icon={faSpinner} spin
      />
    </div>
  } else {
    cards = data.map(d => <Card data-test="component-card" key={d.id_deal} data={d} />)
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

CardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      added: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      end_date: PropTypes.string,
      description: PropTypes.string.isRequired,
      link: PropTypes.shape({ url: PropTypes.string.isRequired, title: PropTypes.string.isRequired }).isRequired,
    }).isRequired).isRequired,
  sortChanged: PropTypes.func.isRequired,
};

export default CardList;
