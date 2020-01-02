import PropTypes from 'prop-types';
import style from 'styled-components';
import React from 'react';
import * as SC from '../../constants/Style';

const SearchInput = style.input`
  margin-bottom: 15px;
  border-radius: 4px;
  border: solid 1px #ccc;
  font-size: 22px;
  padding: 10px 15px;
  box-sizing: border-box;
  width:400px;
  @media (max-width: ${SC.MOBILE_MAX_WIDTH}px) {
    & {
      width: 100%;
    }
  }
`;
const SearchBox = props => (
  <SearchInput
    data-test="component-search-input"
    type="text"
    placeholder="Search..."
    onChange={(event) => { props.changed(event.target.value); }}
  />
);

SearchBox.propTypes = {
  changed: PropTypes.func.isRequired,
};

export default SearchBox;
