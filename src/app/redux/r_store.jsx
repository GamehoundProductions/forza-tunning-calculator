import {
    combineReducers,
    createStore,
    applyMiddleware,
} from "redux";
import thunkMiddleware from 'redux-thunk'
import GraphReducer from "./tunning/r_tunning.jsx";


const ReduxStore = combineReducers({
    graph: GraphReducer,
})//ReduxStore


export function configureStore() {
    return createStore(
        ReduxStore,
        applyMiddleware(
            thunkMiddleware,
        )
    );
}//configure


export default configureStore;
