import { combineReducers, createStore } from 'redux';
import Reducer from "./gameReducer";


const rootReducer = combineReducers({
    map: Reducer,
})

const store = createStore(
    rootReducer
)

export default store