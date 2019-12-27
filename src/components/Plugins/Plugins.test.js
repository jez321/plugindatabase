import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import Plugins from './Plugins';
import TestUtil from '../../test/testUtil';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Plugins {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toBeTruthy();
});

test('renders plugin type list menu', () => {
  const wrapper = setup();
  const pluginTypeList = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list');
  expect(pluginTypeList.length).toBe(1);
});

test('renders plugin type list menu options', () => {
  const wrapper = setup();
  const pluginTypeListOptions = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list-option');
  expect(pluginTypeListOptions.length).toBe(3);
});
