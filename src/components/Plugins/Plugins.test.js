import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import { PluginsRaw } from './Plugins';
import TestUtil from '../../test/testUtil';

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<PluginsRaw {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const testProps = {
  auth: {
    isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(false)),
  },
  addWanted: jest.fn().mockImplementation(() => {}),
  removeWanted: jest.fn().mockImplementation(() => {}),
  addOwned: jest.fn().mockImplementation(() => {}),
  removeOwned: jest.fn().mockImplementation(() => {}),
  owned: [],
  wanted: [],
};

test('renders without error', () => {
  const wrapper = setup(testProps);
  expect(wrapper).toBeTruthy();
});

test('renders plugin type list menu correctly when logged out', (done) => {
  const wrapper = setup(testProps);
  setImmediate(() => {
    wrapper.update();
    try {
      const pluginTypeList = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list');
      expect(pluginTypeList.length).toBe(1);
      done();
    } catch (error) {
      done.fail(error);
    }
  });
});

test('renders plugin type list menu correctly when logged in', (done) => {
  const wrapper = setup({
    ...testProps,
    auth: {
      isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(true)),
    },
  });
  setImmediate(() => {
    wrapper.update();
    try {
      const pluginTypeList = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list');
      expect(pluginTypeList.length).toBe(1);
      done();
    } catch (error) {
      done.fail(error);
    }
  });
});

test('renders plugin type list menu options', () => {
  const wrapper = setup(testProps);
  const pluginTypeListOptions = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list-option');
  expect(pluginTypeListOptions.length).toBe(1);
});
