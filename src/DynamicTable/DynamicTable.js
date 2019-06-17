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
  componentWillReceiveProps(nextProps) {
    this.setState({ rows: nextProps.rows });  
  }
  sortRows = (columnKey) => {
    const rows = [...this.state.rows]
    const sortDir = this.state.sortColumn === columnKey ? (this.state.sortDir === 'asc' ? 'desc' : 'asc') : 'asc'
    rows.sort((a, b) => {
      if (this.props.columns.find(c => c.key === columnKey).type === 'link') {
        return sortDir === 'asc' ? a[columnKey].text.localeCompare(b[columnKey].text) : b[columnKey].text.localeCompare(a[columnKey].text)
      } else {
        return sortDir === 'asc' ? a[columnKey].localeCompare(b[columnKey]) : b[columnKey].localeCompare(a[columnKey])
      }
    })
    this.setState({ rows: rows, sortColumn: columnKey, sortDir: sortDir })
  }
	
  render() {
    const HeadCell = styled.th`
      padding: 5px;
      background-color: #333;
      color: white;
      cursor:pointer;
    `
    const allColumns = this.props.columns.map((col) => {
      return <HeadCell key={col.key} onClick={() => { this.sortRows(col.key) }}>{col.title}</HeadCell>
    })
    const allRows = this.state.rows.map((row, i) => {
      return <DynamicTableRow key={row.id} rowData={row} columnData={this.props.columns} click={() => this.props.clicked(row.id)} />
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
