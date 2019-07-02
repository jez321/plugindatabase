import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cell = styled.td`
padding: 10px;
`;
const Row = styled.tr`
border-bottom: solid #eee 1px;
`;
const DynamicTableRow = (props) => {
  const { columnData } = props;
  const allCells = columnData.map((col) => {
    const data = props.rowData[col.key];
    const { id } = props.rowData;
    if (col.type && col.type === 'link') {
      return (
        <Cell data-test="component-cell" key={`${id}_${col.key}`}>
          <a target="_blank" rel="noopener noreferrer" href={data.url}>{data.text}</a>
        </Cell>
      );
    }
    return <Cell data-test="component-cell" key={`${id}_${col.key}`}>{data}</Cell>;
  });

  return (
    <Row data-test="component-row">
      {allCells}
    </Row>
  );
};

DynamicTableRow.propTypes = {
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    company: PropTypes.string,
    details: PropTypes.string,
    added: PropTypes.string,
    ends: PropTypes.string,
    link: PropTypes.shape({ text: PropTypes.string, url: PropTypes.string }),
  }).isRequired,
};

export default DynamicTableRow;
