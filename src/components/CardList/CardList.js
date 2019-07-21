import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card/Card';

const ListWrap = styled.ul`
list-style-type:none;
padding:0;
margin:0;
`;
const NoItemsMsg = styled.div`
  font-size:20px;
  text-align:center;
`;
const CardList = (props) => {
  const { data, sortChanged } = props;
  const cards = data.map(d => <Card data-test="component-card" key={d.id_deal} data={d} />);
  useEffect(() => {
    sortChanged('added', 'desc');
  }, []);
  return (
    data.length > 0 ? (
      <ListWrap>
        {cards}
      </ListWrap>
    ) : (
      <NoItemsMsg>No items</NoItemsMsg>
    )
  );
};

CardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortChanged: PropTypes.func.isRequired,
};

export default CardList;
