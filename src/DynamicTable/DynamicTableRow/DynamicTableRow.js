import React from 'react'
import styled from 'styled-components'

const dynamictablerow = props => {	
    const Cell = styled.td`
        padding: 5px;
    `
    const allCells = props.rowData.map((data, i) => {
      return <Cell>{data}</Cell>
    })
      return (
        <tr onClick={props.click}>
            {allCells}
        </tr>
      );
    }

  export default dynamictablerow;
