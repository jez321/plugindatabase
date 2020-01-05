import {
  REQUEST_DEALS,
  RECEIVE_DEALS,
} from './actionTypes';

const initialState = {
  isLoading: true,
  deals: [],
};

const dealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DEALS:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_DEALS:
      return {
        ...state,
        deals: action.deals,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default dealsReducer;
