import React, { useReducer } from 'react';
import axios from 'axios';
import CountryContext from './countryContext';
import CountryReducer from './countryReducer';

import {
  SET_LOADING,
  REMOVE_LOADING,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_ERROR,
  SELECT_COUNTRY,
} from '../types';

const CountryState = props => {
  const initialState = {
    countries: [],
    selectedCountry: null,
    loading: false,
    error: false,
  }

  const [state, dispatch] = useReducer(CountryReducer, initialState);

  const getCountries = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    try {
      setLoading();

      const res = await axios.get('https://covid19.mathdro.id/api/countries', config);

      dispatch({
        type: GET_COUNTRIES_SUCCESS,
        payload: res.data,
      });

    } catch (error) {
      dispatch({
        type: GET_COUNTRIES_ERROR,
        payload: error.response.data,
      });
    }
  }

  const selectCountry = (selectedCountry) => {
    dispatch({
      type: SELECT_COUNTRY,
      selectedCountry,
    });
  }

  const setLoading = () => dispatch({ type: SET_LOADING });
  const removeLoading = () => dispatch({ type: REMOVE_LOADING });

  return <CountryContext.Provider
    value={{
      countries: state.countries,
      selectedCountry: state.selectedCountry,
      loading: state.loading,
      error: state.error,
      setLoading,
      removeLoading,
      getCountries,
      selectCountry,
    }}
  >
    {props.children}
  </CountryContext.Provider>;
}

export default CountryState;
