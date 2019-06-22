import React from 'react';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import './matchMedia.mock'
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without error', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toBeTruthy()
})

test('renders either table or card list', () => {
  const wrapper = shallow(<App />)
  const cardList = wrapper.find('[data-test="component-card-list"]')
  const dynamicTable = wrapper.find('[data-test="component-dynamic-table"]')
  expect(cardList.length + dynamicTable.length).toBe(1)
})