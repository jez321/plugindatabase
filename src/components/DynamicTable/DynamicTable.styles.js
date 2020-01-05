import styled from 'styled-components';

export const HeadCell = styled.th`
  padding: 0.625rem;
  background-color: #333;
  color: white;
  cursor: pointer;
  .fa-chevron-up, .fa-chevron-down {
    position: absolute;
    right: 0;
    top: 0.1875rem;
  }
  p {
    padding: 0;
    margin: 0;
    position: relative;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  thead {
    box-shadow: #aaa 1px 1px 2px
  }
`;
export const TableWrap = styled.div`
  margin: auto;
`;

export const NoContentRow = styled.tr`
  td {
    text-align:center;
    padding: 0.625rem;
  }
`;
