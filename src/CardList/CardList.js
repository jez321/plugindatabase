import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card/Card';

const ListWrap = styled.ul`
list-style-type:none;
padding:0;
margin:0;
`;
const CardList = (props) => {
  const { data } = props;
  const cards = data.map(d => <Card key={d.id} data={d} />);
  return (
    <ListWrap>
      {cards}
    </ListWrap>
  );
};

CardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardList;
