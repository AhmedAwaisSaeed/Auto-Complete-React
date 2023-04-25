import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import PredictionsReducer from './reducers/PredictionsReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  PredictionsReducer: PredictionsReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
