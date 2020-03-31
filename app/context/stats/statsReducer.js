import {
  GET_GLOBAL_STATS,
  GET_GLOBAL_STATS_SUCCESS,
  GET_GLOBAL_STATS_ERROR,
  SET_LOADING,
  REMOVE_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_GLOBAL_STATS:
    case GET_GLOBAL_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_GLOBAL_STATS_SUCCESS:
      return {
        ...state,
        globalStats: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_LOADING:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}
