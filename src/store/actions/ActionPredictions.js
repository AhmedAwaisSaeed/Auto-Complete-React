import {
  SET_CURRENT_FEED,
  SET_FEEDS,
  GET_PREDICTIONS_FAIL,
  GET_PREDICTIONS_SUCCESS,
} from './actionTypes';
import {get_predictions_api, token} from '../../config/WebServices';
import {simpleApiGetWithParams} from '../../config/SimpleApiCall';

export const _getPredictionsSuccess = predictions => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PREDICTIONS_SUCCESS,
      predictions: predictions,
    });
  };
};

export const _getPredictionsFail = error => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PREDICTIONS_FAIL,
      error: error,
    });
  };
};

export const _getAllPrecitions = payload => {
  const {query} = payload;
  return async (dispatch, getState) => {
    const url = get_predictions_api;

    let params = {
      input: query,
      key: token,
    };

    try {
      let response = await simpleApiGetWithParams({url, params});
      if (response.status === 'OK') {
        console.log('response of predictions==', response);
        const {predictions} = response;
        dispatch(_getPredictionsSuccess(predictions));
      } else {
        dispatch(_getPredictionsFail(response));
      }
    } catch (error) {
      console.log('error response of predictions==', error);
      dispatch(_getPredictionsFail(error));
    }
  };
};
