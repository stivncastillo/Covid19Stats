import {
  GET_GLOBAL_STATS,
  GET_GLOBAL_STATS_SUCCESS,
  GET_GLOBAL_STATS_ERROR,
  GET_COUNTRY_STATS,
  GET_COUNTRY_STATS_SUCCESS,
  GET_COUNTRY_STATS_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    // Global
    case GET_GLOBAL_STATS:
      return {
        ...state,
        loadingGlobalStats: true,
      };
    case GET_GLOBAL_STATS_SUCCESS:
      return {
        ...state,
        globalStats: action.payload,
        loadingGlobalStats: false,
      };
    case GET_GLOBAL_STATS_ERROR:
      return {
        ...state,
        loadingGlobalStats: false,
        error: true,
      };
    // Country
    case GET_COUNTRY_STATS:
      return {
        ...state,
        loadingCountryStats: true,
      };
    case GET_COUNTRY_STATS_SUCCESS:
      return {
        ...state,
        countryStats: action.payload,
        loadingCountryStats: false,
      };
    case GET_COUNTRY_STATS_ERROR:
      return {
        ...state,
        loadingCountryStats: false,
        error: true,
      };
    default:
      return state;
  }
}
