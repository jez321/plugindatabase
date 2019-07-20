import React from 'react';
import { shallow } from 'enzyme';
import DynamicTableRow from './DynamicTableRow';
import TestUtil from '../../../test/testUtil';

const columnData = [{ title: 'Name', key: 'name' }, { title: 'Count', key: 'count' }];
const rowData = { name: 'Test Name', count: 5 };

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<DynamicTableRow {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

// column header setup
// row data setup
const setupWithTestData = (state = null) => setup({ columnData, rowData, clicked: () => { } }, state);

test('renders one row', () => {
  const wrapper = setupWithTestData();
  const row = TestUtil.findByDataTestAttrVal(wrapper, 'component-row');
  expect(row.length).toBe(1);
});

test('renders correct number of data columns', () => {
  const wrapper = setupWithTestData();
  const dataColumns = TestUtil.findByDataTestAttrVal(wrapper, 'component-cell');
  expect(dataColumns.length).toBe(columnData.length);
});

test('renders correct data in data columns', () => {
  const wrapper = setupWithTestData();
  const dataColumns = TestUtil.findByDataTestAttrVal(wrapper, 'component-cell');
  columnData.forEach((col, i) => {
    expect(dataColumns.at(i).text()).toBe(rowData[col.key].toString());
  });
});
