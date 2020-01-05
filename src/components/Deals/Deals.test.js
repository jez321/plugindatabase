import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import { Deals } from './Deals';

const defaultProps = {
  auth: {
    isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(false)),
  },
  deals: [],
  dispatch: jest.fn().mockImplementation(() => {}),
  isLoading: true,
  addOwned: jest.fn().mockImplementation(() => {}),
  removeOwned: jest.fn().mockImplementation(() => {}),
};
const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Deals {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toBeTruthy();
});
