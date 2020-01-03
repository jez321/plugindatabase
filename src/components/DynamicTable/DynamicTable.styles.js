import styled from 'styled-components';

export const HeadCell = styled.th`
  padding: 10px;
  background-color: #333;
  color: white;
  cursor: pointer;
  .fa-chevron-up, .fa-chevron-down {
    position: absolute;
    right:-18px;
    top: 3px;
  }
  span {
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
    padding: 10px;
  }
`;
