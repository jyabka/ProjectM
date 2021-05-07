import { combineReducers } from 'redux';
import mapgenReducer from "./mapgen_reducer";
import screenReducer from "./screen_reducer";

const DDFApp = combineReducers({mapgenReducer, screenReducer});

export default DDFApp;