import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import MyPlugins from './MyPlugins';
import TestUtil from '../../test/testUtil';

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<MyPlugins {...props} />);
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
    const pluginTypeList = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-type-list-option');
    expect(pluginTypeList.length).toBe(3);
});
