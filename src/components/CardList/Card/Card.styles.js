import styled from 'styled-components';

export const CardWrapper = styled.div`
  padding: 0.625rem;
  margin-bottom:0.3125rem;
  background-color: #333;
  color:white;
  border-radius: 0.25rem;
  box-shadow: #aaa 0.125rem 0.125rem 0.25rem;
  text-align:left;
  section {
    padding: 0.125rem 0 ;
  }
  a { 
    color: #4aabff;
  }
  .link-owned-wanted {
    display: flex;
    justify-content: space-between;
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
  margin: 0.125rem 0;
`;
