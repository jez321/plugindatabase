import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import DynamicTableRow from './DynamicTableRow/DynamicTableRow';
import {
  HeadCell, Table, TableWrap, NoContentRow,
} from './DynamicTable.styles';

export const DynamicTableRaw = ({
  auth, owned, wanted, rows, defaultSortColumn, defaultSortDir, columns, sortChanged, isLoading, showWantedOnly,
}) => {
  const [stateRows, setRows] = useState(rows);
  const [stateSortColumn, setSortColumn] = useState(
    defaultSortColumn !== null
      ? defaultSortColumn
      : columns[0].key,
  );
  const [sortDir, setSortDir] = useState(
    defaultSortDir !== undefined ? defaultSortDir : 'asc',
  );
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    async function checkAuthentication() {
      const at = await auth.isAuthenticated();
      if (at !== authenticated) {
        setAuthenticated(at);
      }
    }
    checkAuthentication();
  }, [auth, authenticated]);
  // update/resort rows when they get changed (by search etc.)
  useEffect(() => {
    setRows([...rows]);
  }, [rows, columns, stateSortColumn, sortDir]);
  useEffect(() => {
    setSortDir('desc');
    setSortColumn('added');
    sortChanged('added', 'desc');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isPluginOwned = pluginId => owned.includes(pluginId);
  const isPluginWanted = pluginId => wanted.includes(pluginId);
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
      <p>
        {col.title}
        {stateSortColumn === col.key ? (
          <FontAwesomeIcon
            icon={sortDir === 'asc' ? faChevronUp : faChevronDown}
          />
        ) : null}
      </p>
    </HeadCell>
  ));

  const noItems = <NoContentRow><td colSpan={columns.length}>No deals</td></NoContentRow>;
  let tableRowContent;
  if (isLoading && rows.length === 0) {
    tableRowContent = (
      <NoContentRow>
        <td
          style={{
            height: '3.125rem', verticalAlign: 'middle', textAlign: 'center', fontSize: '1.5rem',
          }}
          colSpan={columns.length}
        >
          <FontAwesomeIcon
            icon={faSpinner}
            spin
          />
        </td>
      </NoContentRow>
    );
  } else if (stateRows.length > 0) {
    let hasRows = false;
    tableRowContent = stateRows.map((row) => {
      if (!showWantedOnly || isPluginWanted(row.id_plugin)) {
        hasRows = true;
        return (
          <DynamicTableRow
            key={row.id_deal}
            rowData={row}
            columnData={columns}
            owned={isPluginOwned(row.id_plugin)}
            wanted={isPluginWanted(row.id_plugin)}
            showOwnedWanted={authenticated}
          />
        );
      }
      return null;
    });
    if (!hasRows) {
      tableRowContent = noItems;
    }
  } else {
    tableRowContent = noItems;
  }
  return (
    <TableWrap>
      <Table>
        <thead>
          <tr>
            {allColumns}
          </tr>
        </thead>
        <tbody className={isLoading ? 'opacity-5' : ''}>{tableRowContent}</tbody>
      </Table>
    </TableWrap>
  );
};

DynamicTableRaw.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
  owned: PropTypes.arrayOf(PropTypes.number).isRequired,
  wanted: PropTypes.arrayOf(PropTypes.number).isRequired,
  showWantedOnly: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultSortDir: PropTypes.string,
  defaultSortColumn: PropTypes.string,
  sortChanged: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

DynamicTableRaw.defaultProps = {
  defaultSortDir: 'asc',
  defaultSortColumn: null,
  isLoading: false,
  showWantedOnly: false,
};

const mapStateToProps = state => ({
  owned: state.plugins.ownedPlugins,
  wanted: state.plugins.wantedPlugins,
});

export default connect(mapStateToProps)(withAuth(DynamicTableRaw));
