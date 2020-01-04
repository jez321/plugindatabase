import React from 'react';
import { shallow } from 'enzyme';
import { DynamicTableRaw } from './DynamicTable';
import TestUtil from '../../test/testUtil';

const columns = [{ title: 'Name', key: 'name' }, { title: 'Count', key: 'count' }];
const rows = [{ id_deal: 1, name: 'Test Name', count: 5 }, { id_deal: 2, name: 'Test Name 2', count: 6 }];
const defaultProps = {
  auth: {
    isAuthenticated: jest.fn().mockImplementation(() => Promise.resolve(false)),
  },
  owned: [],
  wanted: [],
  columns,
  rows,
  sortChanged: () => { },
};

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<DynamicTableRaw {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders two DynamicTableRows', () => {
  const wrapper = setup();
  const row = wrapper.find('DynamicTableRow');
  expect(row.length).toBe(2);
});

test('renders column headers in correct order', () => {
  const wrapper = setup();
  const columnHeads = TestUtil.findByDataTestAttrVal(wrapper, 'component-head-cell');
  columns.forEach((col, i) => {
    // test indexOf since text() may have sort icon after title
    expect(columnHeads.at(i).text().indexOf(col.title)).toBe(0);
  });
});

test('does not throw warning with expected props', () => {
  TestUtil.checkProps(DynamicTableRaw, defaultProps);
});
