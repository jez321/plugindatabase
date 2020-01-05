
import styled from 'styled-components';

export const DealsSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ShowWantedButton = styled.button`
  margin-left:20px;
  border: none;
  color: #333;
  border-radius:4px;
  padding: 10px 15px;
  cursor: pointer;
  flex: 0 0 auto;
  &.active {
    background: #0868AE;
    color: white;
  }
`;
