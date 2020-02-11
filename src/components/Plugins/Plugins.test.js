import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../matchMedia.mock';
import { act } from 'react-dom/test-utils';
import moxios from 'moxios'
import api from '../../api/api';
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
const setupMount = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = mount(<PluginsRaw {...setupProps} />);
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

test('renders plugin link correctly', (done) => {
  moxios.install(api);
  const response =
    [{
      id_plugin: 1,
      company: 'Test Plugin Company',
      name: 'Test Plugin',
      url: 'http://www.test.com/',
    }];
  let wrapper;
  act(() => {
    wrapper = setupMount();
  });
  moxios.wait(async () => {
    let request = moxios.requests.mostRecent()
    await act(async () => {
      request.respondWith({
        status: 200,
        response,
      }).then(response => {
        wrapper.update();
        const pluginLink = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-link');
        expect(pluginLink.text()).toBe(response.data[0].name);
        expect(pluginLink.prop('href')).toBe(response.data[0].url);
        done();
      }).catch(error => {
        done.fail(error);
      })
    });
  });
});
