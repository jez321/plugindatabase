import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = (props) => {
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

  const { data } = props;
  return (
    <CardWrapper>
      <SplitDiv>
        <p>{data.company}</p>
        <p>{data.added}</p>
      </SplitDiv>
      <Header>{data.name}</Header>
      <section>
        <strong>Ends:</strong>
        {' '}
        {data.ends}
      </section>
      <section>
        {data.details}
      </section>
      <section>
        <a target="_blank" rel="noopener noreferrer" href={data.link.url}>{data.link.text}</a>
      </section>
    </CardWrapper>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.string,
    added: PropTypes.string,
    name: PropTypes.string,
    ends: PropTypes.string,
    details: PropTypes.string,
    link: PropTypes.shape({ url: PropTypes.string, link: PropTypes.string }),
  }).isRequired,
};

export default Card;
