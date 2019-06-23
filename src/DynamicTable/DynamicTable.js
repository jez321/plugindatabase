import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import DynamicTableRow from './DynamicTableRow/DynamicTableRow';

const DynamicTable = (props) => {
  const {
    rows, defaultSortColumn, defaultSortDir, columns,
  } = props;
  const [stateRows, setRows] = useState(rows);
  const [stateSortColumn, setSortColumn] = useState(
    defaultSortColumn !== null
      ? defaultSortColumn
      : columns[0].key,
  );
  const [sortDir, setSortDir] = useState(
    defaultSortDir !== undefined ? defaultSortDir : 'asc',
  );

  const sortRows = (columnKey) => {
    const newRows = [...stateRows];
    const revSortDir = sortDir === 'asc' ? 'desc' : 'asc';
    const newSortDir = stateSortColumn === columnKey ? revSortDir : 'asc';
    newRows.sort((a, b) => {
      if (props.columns.find(c => c.key === columnKey).type === 'link') {
        return newSortDir === 'asc'
          ? a[columnKey].text.localeCompare(b[columnKey].text)
          : b[columnKey].text.localeCompare(a[columnKey].text);
      }
      return newSortDir === 'asc'
        ? a[columnKey].localeCompare(b[columnKey])
        : b[columnKey].localeCompare(a[columnKey]);
    });
    setSortDir(newSortDir);
    setSortColumn(columnKey);
    setRows(newRows);
  };

  const HeadCell = styled.th`
    padding: 5px;
    background-color: #333;
    color: white;
    cursor: pointer;
  `;

  const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
  `;
  const TableWrap = styled.div`
    margin: auto;
    @media (max-width: 1400px) {
      width: 96%;
    }
    @media (min-width: 1401px) {
      width: 80%;
    }
  `;
  const allColumns = columns.map(col => (
    <HeadCell
      data-test="component-head-cell"
      key={col.key}
      onClick={() => {
        sortRows(col.key);
      }}
    >
      {col.title}
      {' '}
      {stateSortColumn === col.key ? (
        <FontAwesomeIcon
          icon={sortDir === 'asc' ? faChevronUp : faChevronDown}
        />
      ) : null}
      {' '}
    </HeadCell>
  ));
  const allRows = stateRows.map(row => (
    <DynamicTableRow
      key={row.id}
      rowData={row}
      columnData={props.columns}
      clicked={() => props.clicked(row.id)}
    />
  ));
  return (
    <TableWrap>
      <Table>
        <thead>
          <tr>{allColumns}</tr>
        </thead>
        <tbody>{allRows}</tbody>
      </Table>
    </TableWrap>
  );
};

DynamicTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  clicked: PropTypes.func.isRequired,
  defaultSortDir: PropTypes.string,
  defaultSortColumn: PropTypes.string,
};

DynamicTable.defaultProps = {
  defaultSortDir: 'asc',
  defaultSortColumn: null,
};

export default DynamicTable;
