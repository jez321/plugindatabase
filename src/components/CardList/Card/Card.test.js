import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';
import TestUtil from '../../../test/testUtil';

const defaultProps = {
  data: {
    company: 'Test Plugin Company',
    added: '2019-07-21 05:24:45+00',
    name: 'Test Plugin',
    end_date: '2019-07-26 05:24:45+00',
    description: 'Test description',
    link: {
      url: 'http://www.test.com/',
      title: 'Test URL',
    },
    url: 'https://pd-test-url.com/plugin-name',
  },
};

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Card {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders a card', () => {
  const wrapper = setup();
  const rows = TestUtil.findByDataTestAttrVal(wrapper, 'component-card-wrapper');
  expect(rows.length).toBe(1);
});

test('renders a card', () => {
  const wrapper = setup();
  const rows = TestUtil.findByDataTestAttrVal(wrapper, 'component-card-wrapper');
  expect(rows.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  TestUtil.checkProps(Card, defaultProps);
});

test('renders plugin link correctly', () => {
  const wrapper = setup();
  const pluginLink = TestUtil.findByDataTestAttrVal(wrapper, 'plugin-link');
  expect(pluginLink.text()).toBe(defaultProps.data.name);
  expect(pluginLink.prop('href')).toBe(defaultProps.data.url);
});