import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import toast from '../reducers/toastReducer';
import stream from '../reducers/streamReducer';
import matches from '../reducers/matchesReducer';
import clips from '../reducers/clipsReducer';
import streamers from '../reducers/streamersReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      toast,
      stream,
      matches,
      clips,
      streamers
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
