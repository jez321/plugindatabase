import React from 'react';
import { shallow } from 'enzyme';
import DynamicTable from './DynamicTable';
import TestUtil from '../../test/testUtil';

const columns = [{ title: 'Name', key: 'name' }, { title: 'Count', key: 'count' }];
const rows = [{ id_deal: 1, name: 'Test Name', count: 5 }];
const defaultProps = { columns, rows, sortChanged: () => { } };

const setup = (props = {}, state = null) => {
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<DynamicTable {...setupProps} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

test('renders DynamicTableRow', () => {
  const wrapper = setup({});
  const row = wrapper.find('DynamicTableRow');
  expect(row.length).toBe(1);
});

test('renders column headers in correct order', () => {
  const wrapper = setup({});
  const columnHeads = TestUtil.findByDataTestAttrVal(wrapper, 'component-head-cell');
  columns.forEach((col, i) => {
    // test indexOf since text() may have sort icon after title
    expect(columnHeads.at(i).text().indexOf(col.title)).toBe(0);
  });
});
