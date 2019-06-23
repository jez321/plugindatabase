import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DynamicTableRow = props => {	
  const Cell = styled.td`
      padding: 10px 0;
  `
  const Row = styled.tr`
      border-bottom: solid #eee 1px;
  `
  const allCells = props.columnData.map((col, i) => {
    const data = props.rowData[col.key];
    if (col.type && col.type === 'link') {
      return <Cell data-test="component-cell" key={col.key + '_' + i}><a target='_blank' rel='noopener noreferrer' href={data.url}>{data.text}</a></Cell>
    } else {
      return <Cell data-test="component-cell" key={col.key + '_' + i}>{data}</Cell>
    }
  })
  return (
    <Row data-test="component-row" onClick={props.click}>
        {allCells}
    </Row>
  )
}

DynamicTableRow.propTypes = {
  columnData: PropTypes.arrayOf(PropTypes.object),
  rowData: PropTypes.object,
  click: PropTypes.func,
}

export default DynamicTableRow;
