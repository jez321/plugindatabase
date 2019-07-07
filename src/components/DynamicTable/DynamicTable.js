import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import DynamicTableRow from './DynamicTableRow/DynamicTableRow';

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
thead {
  box-shadow: #aaa 1px 1px 2px
}
`;
const TableWrap = styled.div`
margin: auto;
`;

const NoContentRow = styled.tr`
td {
  text-align:center;
  padding: 10px;
}
`;
const getSorted = (rows, columns, sortColumn, sortDir) => {
  rows.sort((a, b) => {
    if (columns.find(c => c.key === sortColumn).type === 'link') {
      return sortDir === 'asc'
        ? a[sortColumn].text.localeCompare(b[sortColumn].text)
        : b[sortColumn].text.localeCompare(a[sortColumn].text);
    }
    return sortDir === 'asc'
      ? a[sortColumn].localeCompare(b[sortColumn])
      : b[sortColumn].localeCompare(a[sortColumn]);
  });
  return rows;
};

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

  // update/resort rows when they get changed (by search etc.)
  useEffect(() => {
    const newRows = getSorted([...rows], columns, stateSortColumn, sortDir);
    setRows(newRows);
  }, [rows, columns, stateRows, stateSortColumn, sortDir]);

  const sortRows = (columnKey) => {
    const revSortDir = sortDir === 'asc' ? 'desc' : 'asc';
    const newSortDir = stateSortColumn === columnKey ? revSortDir : 'asc';
    const newRows = getSorted([...stateRows], props.columns, columnKey, newSortDir);
    setSortDir(newSortDir);
    setSortColumn(columnKey);
    setRows(newRows);
  };

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

  let tableRowContent;
  if (stateRows.length > 0) {
    tableRowContent = stateRows.map(row => (
      <DynamicTableRow
        key={row.id_deal}
        rowData={row}
        columnData={props.columns}
      />
    ));
  } else {
    tableRowContent = <NoContentRow><td colSpan={props.columns.length}>No items</td></NoContentRow>;
  }
  return (
    <TableWrap>
      <Table>
        <thead>
          <tr>{allColumns}</tr>
        </thead>
        <tbody>{tableRowContent}</tbody>
      </Table>
    </TableWrap>
  );
};

DynamicTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultSortDir: PropTypes.string,
  defaultSortColumn: PropTypes.string,
};

DynamicTable.defaultProps = {
  defaultSortDir: 'asc',
  defaultSortColumn: null,
};

export default DynamicTable;
