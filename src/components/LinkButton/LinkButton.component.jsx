import PropTypes from 'prop-types';
import React from 'react';
import Button from './LinkButton.styles';

const LinkButton = (props) => {
  const { onClick, children, ...other } = props;
  return (<Button data-test="component-search-input" type="button" onClick={onClick} {...other}>{children}</Button>);
};

LinkButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onClick: PropTypes.func,
};

LinkButton.defaultProps = {
  onClick: null,
};

export default LinkButton;
