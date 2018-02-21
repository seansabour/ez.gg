import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const configureStore = () => {
    const middlewares = [thunk];

    return createStore(reducer, applyMiddleware(...middlewares));
};

export default configureStore;
