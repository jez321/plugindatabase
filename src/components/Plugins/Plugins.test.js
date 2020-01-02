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

test('renders without error', () => {
  const wrapper = setup({
    auth: {
      isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(false)),
    },
  });
  expect(wrapper).toBeTruthy();
});

test('renders plugin type list menu correctly when logged out', (done) => {
  const wrapper = setup({
    auth: {
      isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(false)),
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

test('renders plugin type list menu correctly when logged in', (done) => {
  const wrapper = setup({
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
  const wrapper = setup({
    auth: {
      isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(false)),
    },
  });
  const pluginTypeListOptions = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list-option');
  expect(pluginTypeListOptions.length).toBe(1);
});
