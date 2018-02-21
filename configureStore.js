import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const configureStore = () => {
    const middlewares = [thunk];
    middlewares.push(createLogger());
    return createStore(reducer, applyMiddleware(...middlewares));
};

export default configureStore;
