import React from 'react';
import PropTypes from 'prop-types';
import { CardWrapper, SplitDiv, Header } from './Card.styles';

const Card = (props) => {
  const { data } = props;
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
      <Header>{data.name}</Header>
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
      <section>
        <a target="_blank" rel="noopener noreferrer" href={data.link.url}>{data.link.title}</a>
      </section>
    </CardWrapper>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.string.isRequired,
    added: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    end_date: PropTypes.string,
    description: PropTypes.string.isRequired,
    link: PropTypes.shape({ url: PropTypes.string.isRequired, title: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default Card;
