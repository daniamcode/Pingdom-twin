import rootReducer from "../redux/reducers/rootReducer";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}
