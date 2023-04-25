import {
  GET_PREDICTIONS_SUCCESS,
  GET_PREDICTIONS_FAIL,
} from '../actions/actionTypes';
import _ from 'lodash';
const initialState = {
  allPredictions: [],
  error: undefined,
};

const PredictionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PREDICTIONS_SUCCESS:
      return {
        ...state,
        allPredictions: _.cloneDeep(action.predictions),
      };
    case GET_PREDICTIONS_FAIL:
      return {
        ...state,
        error: action?.error,
      };
    default:
      return state;
  }
};

export default PredictionsReducer;
