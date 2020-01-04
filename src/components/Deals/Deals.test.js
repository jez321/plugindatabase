import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import { Deals } from './Deals';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Deals {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toBeTruthy();
});
