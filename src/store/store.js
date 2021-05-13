import { combineReducers, createStore } from 'redux';
import Reducer from "./mapReducer";


const rootReducer = combineReducers({
    map: Reducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store