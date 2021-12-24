import {
  GET_ALL_ARTICLES_BEGIN,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAILURE,
} from "../action-types";

const initDate = {
  articlesData: [],
  loading: false,
  error: null,
  after: true,
  limit: 5,
  page: 1,
};

export const ArticleReducer = (state = initDate, action) => {
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
            articlesData: [...state.articlesData, ...action.payload],
            loading: false,
            page: state.page + 1,
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
        error: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
