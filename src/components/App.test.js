import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import './matchMedia.mock';
import App from './App';
import TestUtil from './test/TestUtil';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toBeTruthy();
});

test('renders either table or card list', () => {
  const wrapper = setup();
  const cardList = TestUtil.findByDataTestAttrVal(wrapper, 'component-card-list');
  const dynamicTable = TestUtil.findByDataTestAttrVal(
    wrapper,
    'component-dynamic-table',
  );
  expect(cardList.length + dynamicTable.length).toBe(1);
});
