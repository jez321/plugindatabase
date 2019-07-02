import React from 'react';
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
  const { data } = props;
  const cards = data.map(d => <Card key={d.id} data={d} />);
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
};

export default CardList;
