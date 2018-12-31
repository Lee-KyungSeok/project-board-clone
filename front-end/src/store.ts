import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const middleware = [thunk];

const initialState = {};

const configureStore = () => {
    const storeCreated = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );

    // epic 이 있다면 여기서 진행

    return storeCreated;
};

const store = configureStore();

export default store;

