import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import { PluginsRaw } from './Plugins';
import TestUtil from '../../test/testUtil';

const defaultProps = {
  auth: {
    isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(false)),
  },
  owned: [],
  wanted: [],
  addWantedPlugin: jest.fn().mockImplementation(() => { }),
  removeWantedPlugin: jest.fn().mockImplementation(() => { }),
  addOwnedPlugin: jest.fn().mockImplementation(() => { }),
  removeOwnedPlugin: jest.fn().mockImplementation(() => { }),
};
const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<PluginsRaw {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};


test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toBeTruthy();
});

test('renders plugin type list menu correctly when logged out', (done) => {
  const wrapper = setup();
  setImmediate(() => {
    wrapper.update();
    try {
      const pluginTypeList = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list');
      expect(pluginTypeList.length).toBe(0);
      done();
    } catch (error) {
      done.fail(error);
    }
  });
});

test('doesnt render plugin type list menu options when logged out', () => {
  const wrapper = setup();
  const pluginTypeListOptions = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list-option');
  expect(pluginTypeListOptions.length).toBe(0);
});
