import {
  GET_COUNTRIES,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
  SET_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
    case GET_COUNTRIES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload.countries.filter(item => item.hasOwnProperty('iso3')),
        loading: false,
      };
    case SET_LOADING:
        return {
          ...state,
          loading: true,
        }
    default:
      return state;
  }
}
