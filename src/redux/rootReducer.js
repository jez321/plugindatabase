import { combineReducers } from 'redux';
import pluginsReducer from './pluginsReducer';

const rootReducer = combineReducers({
  plugins: pluginsReducer,
});

export default rootReducer;
