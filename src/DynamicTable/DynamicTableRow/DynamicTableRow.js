import React from 'react'
const dynamictablerow = props => {
    const allCells = props.rowData.map((data, i) => {
      return <td>{data}</td>
    })
      return (
        <tr onClick={props.click}>
            {allCells}
        </tr>
      );
    }

  export default dynamictablerow;