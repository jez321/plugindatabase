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
  useEffect(() => {
    // Update the document title using the browser API+
    const newRows = getSorted([...stateRows], props.columns, stateSortColumn, sortDir);
    setRows(newRows);
  }, [rows]);

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
    padding: 10px;
    background-color: #333;
    color: white;
    cursor: pointer;
    .fa-chevron-up, .fa-chevron-down {
      position: absolute;
      right:-18px;
      top: 3px;
    }
    span {
      position: relative;
    }
  `;

  const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
  `;
  const TableWrap = styled.div`
    margin: auto;
  `;
  const allColumns = columns.map(col => (
    <HeadCell
      data-test="component-head-cell"
      key={col.key}
      onClick={() => {
        sortRows(col.key);
      }}
    >
      <span>
        {col.title}
        {stateSortColumn === col.key ? (
          <FontAwesomeIcon
            icon={sortDir === 'asc' ? faChevronUp : faChevronDown}
          />
        ) : null}
      </span>
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
