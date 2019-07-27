import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import Deals from './Deals';
import TestUtil from '../../test/testUtil';

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<Deals {...props} />);
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
