import React from 'react';
import { shallow } from 'enzyme';
import '../matchMedia.mock';
import App from './App';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toBeTruthy();
});
