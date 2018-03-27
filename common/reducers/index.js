import { combineReducers } from 'redux';
import {
  FETCH_INFO_REQUEST,
  FETCH_INFO_ERROR,
  FETCH_INFO_SUCCESS,
  FETCH_INFO_CACHED,
} from '../actions';

const authorInfo = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INFO_REQUEST:
    case FETCH_INFO_ERROR:
    case FETCH_INFO_CACHED:
      return state;
    case FETCH_INFO_SUCCESS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default combineReducers({
  authorInfo,
});
