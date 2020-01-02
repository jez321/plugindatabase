import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import DynamicTableRow from './DynamicTableRow/DynamicTableRow';
import {
  HeadCell, Table, TableWrap, NoContentRow,
} from './DynamicTable.styles';

const DynamicTable = (props) => {
  const {
    rows, defaultSortColumn, defaultSortDir, columns, sortChanged, loading,
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
    setRows([...rows]);
  }, [rows, columns, stateSortColumn, sortDir]);
  useEffect(() => {
    setSortDir('desc');
    setSortColumn('added');
    sortChanged('added', 'desc');
  }, []);
  const sortRows = (columnKey) => {
    const revSortDir = sortDir === 'asc' ? 'desc' : 'asc';
    const newSortDir = stateSortColumn === columnKey ? revSortDir : 'asc';
    setSortDir(newSortDir);
    setSortColumn(columnKey);
    sortChanged(columnKey, newSortDir);
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
  if (loading) {
    tableRowContent = (
      <NoContentRow>
        <td
          style={{
            height: '50px', verticalAlign: 'middle', textAlign: 'center', fontSize: '24px',
          }}
          colSpan={props.columns.length}
        >
          <FontAwesomeIcon
            icon={faSpinner}
            spin
          />
        </td>
      </NoContentRow>
    );
  } else if (stateRows.length > 0) {
    tableRowContent = stateRows.map(row => (
      <DynamicTableRow
        key={row.id_deal}
        rowData={row}
        columnData={props.columns}
      />
    ));
  } else {
    tableRowContent = <NoContentRow><td colSpan={props.columns.length}>No deals</td></NoContentRow>;
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
  sortChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

DynamicTable.defaultProps = {
  defaultSortDir: 'asc',
  defaultSortColumn: null,
  loading: false,
};

export default DynamicTable;
