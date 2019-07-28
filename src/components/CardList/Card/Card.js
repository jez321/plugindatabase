import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
padding: 10px;
margin-bottom:5px;
background-color: #333;
color:white;
border-radius: 4px;
box-shadow: #aaa 2px 2px 4px;
text-align:left;
section {
  padding: 2px 0 ;
}
a { 
  color: #4aabff;
}
`;
const SplitDiv = styled.div`
display: flex;
justify-content: space-between;
p {
padding:0;
margin:0;
}
`;

const Header = styled.h2`
margin:2px 0;
`;

const Card = (props) => {
  const { data } = props;
  console.log(data)
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
