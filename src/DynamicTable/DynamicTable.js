import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DynamicTableRow from './DynamicTableRow/DynamicTableRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

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

  const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
  `
  const TableWrap = styled.div`
    margin: auto;
    @media (max-width: 1400px) {
      width: 96%;
    }
    @media (min-width: 1401px) {
      width: 80%;
    }
  `
  const allColumns = props.columns.map((col) => {
  return <HeadCell data-test="component-head-cell" key={col.key} onClick={() => { sortRows(col.key) }}>{col.title} { sortColumn === col.key ? <FontAwesomeIcon icon={ sortDir === 'asc' ? faChevronUp : faChevronDown} /> : null} </HeadCell>
  })
  const allRows = rows.map((row, i) => {
    return <DynamicTableRow key={row.id} rowData={row} columnData={props.columns} click={() => props.clicked(row.id)} />
  })
  return (
    <TableWrap>
      <Table>
        <thead>
        <tr>
          { allColumns }
        </tr>
      </thead>
      <tbody>
        { allRows }
      </tbody>
    </Table>
  </TableWrap>
  );
}

DynamicTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  clicked: PropTypes.func,
  defaultSortDir: PropTypes.string,
}

export default DynamicTable;
