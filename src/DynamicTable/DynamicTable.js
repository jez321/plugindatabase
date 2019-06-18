import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DynamicTableRow from './DynamicTableRow/DynamicTableRow'

const DynamicTable = props => {
  const [rows, setRows] = useState(props.rows);
  const [sortColumn, setSortColumn] = useState(props.defaultSortColumn !== undefined ? props.defaultSortColumn : props.columns[0].key);
  const [sortDir, setSortDir] = useState(props.defaultSortDir !== undefined ? props.defaultSortDir : 'asc');

  const sortRows = (columnKey) => {
    const newRows = [...rows]
    const newSortDir = sortColumn === columnKey ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc'
    newRows.sort((a, b) => {
      if (props.columns.find(c => c.key === columnKey).type === 'link') {
        return newSortDir === 'asc' ? a[columnKey].text.localeCompare(b[columnKey].text) : b[columnKey].text.localeCompare(a[columnKey].text)
      } else {
        return newSortDir === 'asc' ? a[columnKey].localeCompare(b[columnKey]) : b[columnKey].localeCompare(a[columnKey])
      }
    })
    setSortDir(newSortDir)
    setSortColumn(columnKey)
    setRows(newRows)
  }

  const HeadCell = styled.th`
    padding: 5px;
    background-color: #333;
    color: white;
    cursor:pointer;
  `
  const allColumns = props.columns.map((col) => {
    return <HeadCell key={col.key} onClick={() => { sortRows(col.key) }}>{col.title}</HeadCell>
  })
  const allRows = rows.map((row, i) => {
    return <DynamicTableRow key={row.id} rowData={row} columnData={props.columns} click={() => props.clicked(row.id)} />
  })
  return (
    <table>
      <thead>
      <tr>
        { allColumns }
      </tr>
    </thead>
    <tbody>
      { allRows }
    </tbody>
  </table>
  );
}

DynamicTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  clicked: PropTypes.func,
  defaultSortDir: PropTypes.string,
}

export default DynamicTable;
