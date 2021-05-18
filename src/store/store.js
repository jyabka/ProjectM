import { combineReducers, createStore } from 'redux';
import Reducer from "./mapReducer";


const rootReducer = combineReducers({
    map: Reducer,
})

const store = createStore(
    rootReducer
)

export default store