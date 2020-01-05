
import style from 'styled-components';
import * as SC from '../../constants/Style';

const SearchInput = style.input`
  border-radius: 0.25rem;
  border: solid 1px #ccc;
  font-size: 1.5rem;
  padding: 0.625rem 0.9375rem;
  box-sizing: border-box;
  width: 25rem;
  @media (max-width: ${SC.MOBILE_MAX_WIDTH}px) {
    & {
      width: 100%;
    }
  }
`;
export default SearchInput;
