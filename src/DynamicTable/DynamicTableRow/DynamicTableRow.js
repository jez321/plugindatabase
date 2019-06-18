import React from 'react'
import styled from 'styled-components'

const DynamicTableRow = props => {	
    const Cell = styled.td`
        padding: 5px;
    `
    const allCells = props.columnData.map((col, i) => {
      const data = props.rowData[col.key];
      if (col.type && col.type === 'link') {
        return <Cell key={col.key + '_' + i}><a target='_blank' rel='noopener noreferrer' href={data.url}>{data.text}</a></Cell>
      } else {
        return <Cell key={col.key + '_' + i}>{data}</Cell>
      }
    })
      return (
        <tr onClick={props.click}>
            {allCells}
        </tr>
      );
    }

  export default DynamicTableRow;
