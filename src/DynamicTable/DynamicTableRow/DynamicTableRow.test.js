import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import DynamicTableRow from './DynamicTableRow';
import { findByDataTestAttrVal } from './../../test/testUtil';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const columnData = [{title: "Name", key:"name"}, {title: "Count", key: "count"}]
const rowData = {name: "Test Name", count: 5}

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<DynamicTableRow {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
  }

const setupWithTestData = (state = null) => {
    // column header setup
    // row data setup
    return setup({columnData, rowData}, state)
}

test('renders one row', () => {
    const wrapper = setupWithTestData()
    const row = findByDataTestAttrVal(wrapper, "component-row")
    expect(row.length).toBe(1)
})

test('renders correct number of data columns', () => {
    const wrapper = setupWithTestData()
    const dataColumns = findByDataTestAttrVal(wrapper, "component-cell")
    expect(dataColumns.length).toBe(columnData.length)
})

test('renders correct data in data columns', () => {
    const wrapper = setupWithTestData()
    const dataColumns = findByDataTestAttrVal(wrapper, "component-cell")
    columnData.forEach((col, i) => {
        expect(dataColumns.at(i).text()).toBe(rowData[col["key"]].toString())
    });
})