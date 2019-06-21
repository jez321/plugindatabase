import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Card = props => {	
  const Card = styled.div`
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
  `
  const SplitDiv = styled.div`
    display: flex;
    justify-content: space-between;
    p {
      padding:0;
      margin:0;
    }
  `

  const Header = styled.h2`
    margin:2px 0;
  `
  return (
    <Card>
      <SplitDiv>
        <p>{props.data.company}</p>
        <p>{props.data.added}</p>
      </SplitDiv>
      <Header>{ props.data.name }</Header>
      <section>
        <strong>Ends:</strong> { props.data.ends }
      </section>
      <section>
       { props.data.details }
      </section>
      <section>
       <a target="_blank" href={ props.data.link.url }>{ props.data.link.text }</a>
      </section>
    </Card>
  )
}

Card.propTypes = {
  columnData: PropTypes.arrayOf(PropTypes.object),
  rowData: PropTypes.object,
  click: PropTypes.func,
}

export default Card;
