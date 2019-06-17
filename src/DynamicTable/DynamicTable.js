import React, { Component } from 'react'
import styled from 'styled-components'
import DynamicTableRow from './DynamicTableRow/DynamicTableRow'

class DynamicTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
     rows: props.rows,
      sortColumn: props.defaultSortColumn !== undefined ? props.defaultSortColumn : 0,
      sortDir: props.defaultSortDir !== undefined ? props.defaultSortDir : 'asc',
    }
  }
  sortRows = (i) => {
    const rows = [...this.state.rows]
    const sortDir = this.state.sortColumn === i ? (this.state.sortDir === 'asc' ? 'desc' : 'asc') : 'asc'
    rows.sort((a, b) => {
      if (a[i] < b[i]) {
        return sortDir === 'asc' ? -1 : 1;
      }
      if (a[i] > b[i]) {
        return sortDir === 'desc' ? 1 : -1;
      }
      return 0;
    })
    this.setState({ rows: rows, sortColumn: i, sortDir: sortDir })
  }
	
  render() {
    const HeadCell = styled.th`
      padding: 5px;                                           background-color: #333;                                 color: white;                                         `
    const allColumns = this.props.columns.map((col, i) => {
      return <HeadCell onClick={() => { this.sortRows(i) }}>{col.name}</HeadCell>
    })
    const allRows = this.state.rows.map((row, i) => {
      return <DynamicTableRow rowData={row} click={() => this.props.clicked(i)} />
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
}

export default DynamicTable;
