
import styled from 'styled-components';

export const DealsSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.625rem;
`;

export const ShowWantedButton = styled.button`
  margin-left: 1.25rem;
  border: none;
  color: #333;
  border-radius: 0.25rem;
  padding: 0.625rem 0.9375rem;
  cursor: pointer;
  flex: 0 0 auto;
  &.active {
    background: #0868AE;
    color: white;
  }
`;
