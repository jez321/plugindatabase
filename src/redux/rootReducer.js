import { combineReducers } from "redux";
import myPluginsReducer from "./myPluginsReducer";

const rootReducer = combineReducers({
    myPlugins: myPluginsReducer,
});

export default rootReducer;
