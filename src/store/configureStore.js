import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers/index'
import saga from '../sagas/sagas'

export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware()
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)))
	sagaMiddleware.run(saga)
	return store
} 