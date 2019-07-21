import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';
import TestUtil from '../../test/testUtil';

const defaultProps = { changed: () => { } };

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<SearchBox {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders search input', () => {
  const wrapper = setup();
  const input = TestUtil.findByDataTestAttrVal(wrapper, 'component-search-input');
  expect(input.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  TestUtil.checkProps(SearchBox, defaultProps);
});
