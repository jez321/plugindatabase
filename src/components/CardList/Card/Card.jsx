import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CardWrapper, SplitDiv, Header } from './Card.styles';

const Card = (props) => {
  const {
    data, showOwnedWanted, owned, wanted,
  } = props;
  return (
    <CardWrapper data-test="component-card-wrapper">
      <SplitDiv>
        <p>
          {data.company}
          {' '}
          |
          {' '}
          {data.category}
        </p>
        <p>{new Date(data.added.replace(' ', 'T')).toLocaleDateString()}</p>
      </SplitDiv>
      <Header>
        <a data-test="plugin-link" title="Visit manufacturer's page" target="_blank" rel="noopener noreferrer" href={data.url}>{data.name}</a>
      </Header>
      <section>
        <strong>Price:</strong>
        {' '}
        {`$${data.price}`}
      </section>
      <section>
        <strong>Ends:</strong>
        {' '}
        {data.end_date ? new Date(data.end_date.replace(' ', 'T')).toLocaleDateString() : 'Unknown'}
      </section>
      <section>
        {data.description}
      </section>
      <section className="link-owned-wanted">
        <a target="_blank" rel="noopener noreferrer" href={data.link.url}>{data.link.title}</a>
        {showOwnedWanted ? (
          <div>
            <FontAwesomeIcon title="Owned" className={!owned ? 'opacity-2' : ''} icon={faCheckCircle} />
            &nbsp;
            <FontAwesomeIcon title="Wanted" className={!wanted ? 'opacity-2' : ''} icon={faStar} />
            &nbsp;
          </div>
        ) : null
        }
      </section>
    </CardWrapper>
  );
};

Card.propTypes = {
  owned: PropTypes.bool,
  wanted: PropTypes.bool,
  showOwnedWanted: PropTypes.bool,
  data: PropTypes.shape({
    company: PropTypes.string.isRequired,
    added: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    end_date: PropTypes.string,
    description: PropTypes.string.isRequired,
    link: PropTypes.shape({ url: PropTypes.string.isRequired, title: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

Card.defaultProps = {
  owned: false,
  wanted: false,
  showOwnedWanted: false,
};

export default Card;
