import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Cell, Row } from './DynamicTableRow.styles';

const DynamicTableRow = ({
  columnData, rowData, owned, wanted,
}) => {
  const allCells = columnData.map((col) => {
    const data = rowData[col.key];
    const { id, lowestPrice } = rowData;
    if (data === null) { return <Cell data-test="component-cell" key={`${id}_${col.key}`}>Unknown</Cell>; }
    if (col.key === 'name') {
      return (
        <Cell className="name" data-test="component-cell" key={`${id}_${col.key}`}>
          <FontAwesomeIcon title="Owned" className={!owned ? 'semi-transparent' : ''} icon={faCheckCircle} />
          &nbsp;
          <FontAwesomeIcon title="Wanted" className={!wanted ? 'semi-transparent' : ''} icon={faStar} />
          &nbsp;
          <div>
            {data}
          </div>
        </Cell>
      );
    }
    if (col.type && col.type === 'link') {
      return (
        <Cell data-test="component-cell" key={`${id}_${col.key}`}>
          <a target="_blank" rel="noopener noreferrer" href={data.url}>{data.title}</a>
        </Cell>
      );
    }
    if (col.type && col.type === 'date') {
      return (
        <Cell data-test="component-cell" key={`${id}_${col.key}`}>
          {new Date(data.replace(' ', 'T')).toLocaleDateString()}
        </Cell>
      );
    }
    if (col.type && col.type === 'price') {
      return (
        <Cell style={{ textAlign: 'right' }} data-test="component-cell" key={`${id}_${col.key}`}>
          <span className={data === lowestPrice ? 'lowest-price' : ''}>{`$${data}`}</span>
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
    id_deal: PropTypes.number,
    name: PropTypes.string,
    company: PropTypes.string,
    description: PropTypes.string,
    added: PropTypes.string,
    end_date: PropTypes.string,
    link: PropTypes.shape({ title: PropTypes.string, url: PropTypes.string }),
  }).isRequired,
  owned: PropTypes.bool,
  wanted: PropTypes.bool,
};

DynamicTableRow.defaultProps = {
  owned: false,
  wanted: false,
};

export default DynamicTableRow;
