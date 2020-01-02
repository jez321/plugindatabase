import PropTypes from 'prop-types';
import React from 'react';
import SearchInput from './SearchBox.styles';

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
