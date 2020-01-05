import { combineReducers } from 'redux';
import pluginsReducer from './pluginsReducer';
import dealsReducer from './dealsReducer';

const rootReducer = combineReducers({
  plugins: pluginsReducer,
  deals: dealsReducer,
});

export default rootReducer;
