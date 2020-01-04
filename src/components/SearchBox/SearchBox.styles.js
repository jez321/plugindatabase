
import style from 'styled-components';
import * as SC from '../../constants/Style';

const SearchInput = style.input`
  border-radius: 4px;
  border: solid 1px #ccc;
  font-size: 22px;
  padding: 10px 15px;
  box-sizing: border-box;
  width:400px;
  @media (max-width: ${SC.MOBILE_MAX_WIDTH}px) {
    & {
      width: 100%;
    }
  }
`;
export default SearchInput;
