import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import DynamicTable from './DynamicTable'
import { findByDataTestAttrVal } from './../test/testUtil';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const columns = [{title: "Name", key:"name"}, {title: "Count", key: "count"}]
const rows = [{id: 1, name: "Test Name", count: 5}]

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<DynamicTable {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
  }

const setupWithTestData = (state = null) => {
    // column header setup
    // row data setup
    return setup({columns, rows}, state)
}

test('renders DynamicTableRow', () => {
    const wrapper = setupWithTestData()
    const row = wrapper.find('DynamicTableRow')
    expect(row.length).toBe(1)
})

test('renders column headers in correct order', () => {
    const wrapper = setupWithTestData()
    const columnHeads = findByDataTestAttrVal(wrapper, "component-head-cell")
    columns.forEach((col, i) => {
        // test indexOf since text() may have sort icon after title
        expect(columnHeads.at(i).text().indexOf(col.title)).toBe(0)
    });
})