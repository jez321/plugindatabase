
import styled from 'styled-components';

export const Cell = styled.td`
padding: 10px;
.lowest-price {
  color: #00d800;
}
&.name {
  display: flex;
  justify-content: flex-start;
}
`;
export const Row = styled.tr`
border-bottom: solid #eee 1px;
`;
