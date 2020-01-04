
import styled from 'styled-components';

export const DealsSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ShowWantedButton = styled.button`
  margin-left:40px;
  border: none;
  color: #333;
  border-radius:4px;
  padding: 10px 15px;
  cursor: pointer;
  &.active {
    background: #0868AE;
    color: white;
  }
`;
