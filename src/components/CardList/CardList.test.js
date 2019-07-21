import React from 'react';
import { shallow } from 'enzyme';
import CardList from './CardList';
import TestUtil from '../../test/testUtil';

const data = [
  {
    id_deal: 1,
    company: 'Test Plugin Company',
    added: '2019-07-21 05:24:45+00',
    name: 'Test Plugin',
    end_date: '2019-07-26 05:24:45+00',
    description: 'Test description',
    link: {
      url: 'http://www.test.com/',
      title: 'Test URL',
    },
  }, {
    id_deal: 2,
    company: 'Test Plugin Company 2',
    added: '2019-07-21 05:24:45+00',
    name: 'Test Plugin 2',
    end_date: '2019-07-26 05:24:45+00',
    description: 'Test description 2',
    link: {
      url: 'http://www.test.com/',
      title: 'Test URL 2',
    },
  },
];
const defaultProps = { data, sortChanged: () => { } };

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<CardList {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders two cards', () => {
  const wrapper = setup();
  const row = TestUtil.findByDataTestAttrVal(wrapper, 'component-card');
  expect(row.length).toBe(2);
});

test('does not throw warning with expected props', () => {
  TestUtil.checkProps(CardList, defaultProps);
});
