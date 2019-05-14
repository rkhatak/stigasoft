import { applyMiddleware, compose, createStore } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import reducers from '../Reducer/MainReducer';
import sagas from '../Saga/sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState = fromJS({})) {
	
	const middlewares = [ sagaMiddleware ];
	const enhancers = [ applyMiddleware(...middlewares) ];
	const store = createStore(reducers, compose(...enhancers));

	// Extensions
	sagaMiddleware.run(sagas, store.dispatch);
	
	return store;
}

export default configureStore;
