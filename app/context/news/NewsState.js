import React, { useReducer } from 'react';
import axios from 'axios';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';
import Config from 'react-native-config';
import * as RNLocalize from 'react-native-localize';
import dayjs from 'dayjs';

import {
  GET_NEWS_HEADLINES,
  GET_NEWS_HEADLINES_SUCCESS,
  GET_NEWS_HEADLINES_ERROR,
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_ERROR,
} from '../types';

const NewsState = props => {
  const initialState = {
    newsHeadline: [],
    loadingNewsHeadline: false,
    news: [],
    loadingNews: false,
    error: false,
  }

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  const getHeadlines = async (country) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        q: 'COVID',
        country,
        apiKey: Config.NEWSAPI_KEY,
      },
    };

    try {
      dispatch({ type: GET_NEWS_HEADLINES });

      const res = await axios.get('https://newsapi.org/v2/top-headlines', config);

      dispatch({
        type: GET_NEWS_HEADLINES_SUCCESS,
        payload: res.data.articles,
      });

    } catch (error) {
      dispatch({
        type: GET_NEWS_HEADLINES_ERROR,
        payload: error.response.data,
      });
    }
  }

  const getNews = async () => {
    const lang = RNLocalize.getLocales()[0];
    const today = dayjs().format('YYYY-MM-DD');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      params: {
        q: 'COVID',
        from: today,
        sortBy: 'publishedAt',
        apiKey: Config.NEWSAPI_KEY,
        pageSize: 10,
        page: 1,
        language: lang ? lang.languageCode : 'en',
      },
    };

    try {
      dispatch({ type: GET_NEWS });

      const res = await axios.get('https://newsapi.org/v2/everything', config);

      dispatch({
        type: GET_NEWS_SUCCESS,
        payload: res.data.articles,
      });

    } catch (error) {
      dispatch({
        type: GET_NEWS_ERROR,
        payload: error.response.data,
      });
    }
  }

  return <NewsContext.Provider
    value={{
      newsHeadline: state.newsHeadline,
      loadingNewsHeadline: state.loadingNewsHeadline,
      news: state.news,
      loadingNews: state.loadingNews,
      error: state.error,
      getHeadlines,
      getNews,
    }}
  >
    {props.children}
  </NewsContext.Provider>;
}

export default NewsState;
