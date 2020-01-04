import React from 'react';
import { shallow } from 'enzyme';
import '../../matchMedia.mock';
import Deals from './Deals';
import TestUtil from '../../test/testUtil';
import * as SC from '../../constants/Style';

const mediaQueries = {
  tabletOrMobile: { maxWidth: SC.MOBILE_MAX_WIDTH },
};
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Deals {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

afterEach(() => {
  TestUtil.mockMatchMedia({
    matches: false,
  });
});

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toBeTruthy();
});


test('renders either table or card list', (done) => {
  TestUtil.mockMatchMedia({
    media: mediaQueries.tabletOrMobile,
    matches: true,
  });
  const wrapper = setup();
  setImmediate(() => {
    wrapper.update();
    try {
      const cardList = TestUtil.findByDataTestAttrVal(wrapper, 'component-card-list');
      const dynamicTable = TestUtil.findByDataTestAttrVal(
        wrapper,
        'component-dynamic-table',
      );
      expect(cardList.length + dynamicTable.length).toBe(1);
      done();
    } catch (error) {
      done.fail(error);
    }
  });
});
