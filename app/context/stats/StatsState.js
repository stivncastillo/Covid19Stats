import React, { useReducer } from 'react';
import axios from 'axios';
import StatsContext from './statsContext';
import StatsReducer from './statsReducer';

import {
  GET_GLOBAL_STATS,
  GET_GLOBAL_STATS_SUCCESS,
  GET_GLOBAL_STATS_ERROR,
  GET_COUNTRY_STATS,
  GET_COUNTRY_STATS_SUCCESS,
  GET_COUNTRY_STATS_ERROR,
  GET_COUNTRY_CHART_STATS,
  GET_COUNTRY_CHART_STATS_SUCCESS,
  GET_COUNTRY_CHART_STATS_ERROR,
} from '../types';

const StatsState = props => {
  const initialState = {
    globalStats: {},
    loadingGlobalStats: false,
    countryStats: {},
    loadingCountryStats: false,
    countryChartStats: {
      labels: [],
      datasets: [],
    },
    loadingCountryChartStats: false,
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
      dispatch({ type: GET_GLOBAL_STATS });

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
      dispatch({ type: GET_COUNTRY_STATS });

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

  const getCountryChartStats = async (country) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    try {
      dispatch({ type: GET_COUNTRY_CHART_STATS });

      const res = await axios.get(`https://corona.lmao.ninja/v2/historical/${country}`, config);

      const cases = formatData(res.data.timeline.cases, 'cases');
      // const deaths = formatData(res.data.timeline.deaths, 'deaths');
      // const recovered = formatData(res.data.timeline.recovered, 'recovered');

      dispatch({
        type: GET_COUNTRY_CHART_STATS_SUCCESS,
        payload: {
          labels: cases.labels,
          datasets: [
            {...cases.data},
            // {...deaths.data},
            // {...recovered.data},
          ],
        },
      });

    } catch (error) {
      dispatch({
        type: GET_COUNTRY_CHART_STATS_ERROR,
        payload: error.response.data,
      });
    }
  }

  const formatData = (object, name) => {
    const sliced = Object.keys(object)
      .reverse()
      // .slice(0, 7)
      .reduce((result, key) => {
        if (object[key] !== 0) {
          result[key] = object[key];
        }
        return result;
      }, {});

    const color = name === 'cases'
      ? (opacity = 1) => `rgba(200, 176, 63, ${opacity})`
      : name === 'deaths'
        ? (opacity = 1) => `rgba(255, 86, 86, ${opacity})`
        : (opacity = 1) => `rgba(58, 208, 147, ${opacity})`;

    let labels = [];
    let data = {data: [], color};

    Object.keys(sliced).reverse().map((item, index) => {
      labels[index] = item;
      data.data[index] = sliced[item];
    })

    return {labels, data};
  }

  return <StatsContext.Provider
    value={{
      globalStats: state.globalStats,
      loadingGlobalStats: state.loadingGlobalStats,
      countryStats: state.countryStats,
      loadingCountryStats: state.loadingCountryStats,
      countryChartStats: state.countryChartStats,
      loadingCountryChartStats: state.loadingCountryChartStats,
      error: state.error,
      getGlobalStats,
      getCountryStats,
      getCountryChartStats,
    }}
  >
    {props.children}
  </StatsContext.Provider>;
}

export default StatsState;
