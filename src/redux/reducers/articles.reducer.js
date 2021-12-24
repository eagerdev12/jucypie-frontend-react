import {
  GET_ALL_ARTICLES_BEGIN,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAILURE,
  SET_ARTICLE_DETAILS,
  PREFETCH_ARTICLES_BEGIN,
  CLEAR_ARTICLES,
} from '../action-types';

const initialState = {
  articles: [],
  story: {},
  loading: false,
  prefetching: false,
  error: null,
  after: true,
  limit: 5,
  page: 1,
};

export const AllArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES_BEGIN: {
      return state.after
        ? {
            ...state,
            loading: true,
            error: null,
          }
        : {
            ...state,
            loading: false,
          };
    }

    case GET_ALL_ARTICLES_SUCCESS: {
      return state.loading
        ? {
            ...state,
            articles: [...state.articles, ...action.payload],
            loading: false,
            page: state.page + 1,
            prefetching: false,
          }
        : {
            ...state,
            loading: false,
          };
    }

    case GET_ALL_ARTICLES_FAILURE: {
      return {
        ...state,
        loading: false,
        prefetching: false,
        error: action.payload,
      };
    }

    case SET_ARTICLE_DETAILS: {
      return {
        ...state,
        story: action.payload,
      };
    }

    case 'IS_MORE_DATA': {
      return { ...state, after: action.payload, loading: false };
    }

    case CLEAR_ARTICLES: {
      return {
        ...state,
        story: {},
        articles: [],
        loading: false,
        error: null,
        after: true,
        page: 0,
      };
    }

    case PREFETCH_ARTICLES_BEGIN: {
      return {
        ...state,
        prefetching: true,
      };
    }

    default:
      return state;
  }
};
