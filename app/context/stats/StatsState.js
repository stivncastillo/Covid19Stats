import React, { useReducer } from 'react';
import axios from 'axios';
import StatsContext from './statsContext';
import StatsReducer from './statsReducer';

import {
  SET_LOADING,
  REMOVE_LOADING,
  GET_GLOBAL_STATS_SUCCESS,
  GET_GLOBAL_STATS_ERROR,
  GET_COUNTRY_STATS_SUCCESS,
  GET_COUNTRY_STATS_ERROR,
} from '../types';

const StatsState = props => {
  const initialState = {
    globalStats: {},
    countryStats: {},
    loading: false,
    error: false,
  }

  const [state, dispatch] = useReducer(StatsReducer, initialState);

  const getGlobalStats = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    try {
      setLoading();

      const res = await axios.get('https://corona.lmao.ninja/all', config);

      dispatch({
        type: GET_GLOBAL_STATS_SUCCESS,
        payload: res.data,
      });

    } catch (error) {
      dispatch({
        type: GET_GLOBAL_STATS_ERROR,
        payload: error.response.data,
      });
    }
  }

  const getCountryStats = async (country) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    try {
      setLoading();

      const res = await axios.get(`https://corona.lmao.ninja/countries/${country}`, config);

      dispatch({
        type: GET_COUNTRY_STATS_SUCCESS,
        payload: res.data,
      });

    } catch (error) {
      dispatch({
        type: GET_COUNTRY_STATS_ERROR,
        payload: error.response.data,
      });
    }
  }

  const setLoading = () => dispatch({ type: SET_LOADING });
  const removeLoading = () => dispatch({ type: REMOVE_LOADING });

  return <StatsContext.Provider
    value={{
      globalStats: state.globalStats,
      countryStats: state.countryStats,
      loading: state.loading,
      error: state.error,
      setLoading,
      removeLoading,
      getGlobalStats,
      getCountryStats,
    }}
  >
    {props.children}
  </StatsContext.Provider>;
}

export default StatsState;
