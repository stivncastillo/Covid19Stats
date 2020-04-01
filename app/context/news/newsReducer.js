import {
  GET_NEWS_HEADLINES,
  GET_NEWS_HEADLINES_SUCCESS,
  GET_NEWS_HEADLINES_ERROR,
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_NEWS_HEADLINES:
      return {
        ...state,
        loadingNewsHeadline: true,
      };
    case GET_NEWS_HEADLINES_SUCCESS:
      return {
        ...state,
        newsHeadline: action.payload,
        loadingNewsHeadline: false,
      };
    case GET_NEWS_HEADLINES_ERROR:
      return {
        ...state,
        loadingNewsHeadline: false,
        error: true,
      };
    // News
    case GET_NEWS:
      return {
        ...state,
        loadingNews: true,
      };
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
        loadingNews: false,
      };
    case GET_NEWS_ERROR:
      return {
        ...state,
        loadingNews: false,
        error: true,
      };
    default:
      return state;
  }
}
