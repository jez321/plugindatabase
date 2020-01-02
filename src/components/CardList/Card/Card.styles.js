import styled from 'styled-components';

export const CardWrapper = styled.div`
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
export const SplitDiv = styled.div`
  display: flex;
  justify-content: space-between;
  p {
  padding:0;
  margin:0;
  }
`;

export const Header = styled.h2`
  margin:2px 0;
`;
