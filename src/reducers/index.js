import { combineReducers } from 'redux';
import mapgenReducer from "./mapgen_reducer";
import screenReducer from "./screen_reducer";
import {spritesReducer} from "./sprites_reducer";

const DDFApp = combineReducers({map: mapgenReducer, screen: screenReducer, sprites: spritesReducer});

export default DDFApp;