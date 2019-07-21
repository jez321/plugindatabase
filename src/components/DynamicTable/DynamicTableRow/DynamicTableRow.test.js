import React from 'react';
import { shallow } from 'enzyme';
import DynamicTableRow from './DynamicTableRow';
import TestUtil from '../../../test/testUtil';

const columnData = [{ title: 'Name', key: 'name' }, { title: 'Count', key: 'count' }];
const rowData = { id: 1, name: 'Test Name', count: 5 };
const defaultProps = { columnData, rowData, clicked: () => { } };

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<DynamicTableRow {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders a row', () => {
  const wrapper = setup();
  const rows = TestUtil.findByDataTestAttrVal(wrapper, 'component-row');
  expect(rows.length).toBe(1);
});

test('renders correct number of data columns', () => {
  const wrapper = setup();
  const dataColumns = TestUtil.findByDataTestAttrVal(wrapper, 'component-cell');
  expect(dataColumns.length).toBe(columnData.length);
});

test('renders correct data in data columns', () => {
  const wrapper = setup();
  const dataColumns = TestUtil.findByDataTestAttrVal(wrapper, 'component-cell');
  dataColumns.forEach((col, i) => {
    expect(dataColumns.at(i).text()).toBe(rowData[columnData[i].key].toString());
  });
});
