import { GET_ARTICLES_QUERY } from "../../graphql";
import {
  GET_ALL_ARTICLES_BEGIN,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAILURE,
  PREFETCH_ARTICLES_BEGIN,
  SET_ARTICLE_DETAILS,
  CLEAR_ARTICLES,
} from "../action-types";

export const getAllArticlesBegin = () => ({
  type: GET_ALL_ARTICLES_BEGIN,
});

export const getAllArticlesSuccess = (products) => ({
  type: GET_ALL_ARTICLES_SUCCESS,
  payload: products,
});

export const getAllArticlesFailure = (error) => ({
  type: GET_ALL_ARTICLES_FAILURE,
  payload: error,
});

export const clearArticle = () => ({
  type: CLEAR_ARTICLES,
});

export const prefetchArticlesBegin = () => ({
  type: PREFETCH_ARTICLES_BEGIN,
});

export const prefetchArticles = (client, limit, page, userId) => {
  return (dispatch) => {
    dispatch(prefetchArticlesBegin());
    return client.query({
      query: GET_ARTICLES_QUERY,
      variables: { filters: { page: page + 1, limit } },
    });
  };
};

export function getAllArticleList(client, limit, page, userId) {
  return (dispatch) => {
    dispatch(getAllArticlesBegin());
    return client
      .query({
        query: GET_ARTICLES_QUERY,
        variables: { filters: { page, limit } },
      })
      .then((result) => {
        if (result.data.articles.length !== 0) {
          dispatch(getAllArticlesSuccess(result.data.articles));
        } else {
          dispatch({ type: "IS_MORE_DATA", payload: false });
        }
      })
      .catch((err) => {
        console.log("response error:", err);
        dispatch(getAllArticlesFailure(err));
      });
  };
}

export const getArticleBySlugSuccess = (article) => ({
  type: SET_ARTICLE_DETAILS,
  payload: article,
});

export function getArticleBySlug(client, slug, userID) {
  return (dispatch, getState) => {
    return client
      .query({
        query: GET_ARTICLES_QUERY,
        variables: {
          filters: {
            slug: slug,
            // userId: userID,
            page: 1,
            limit: 5,
          },
        },
      })
      .then((result) => {
        if (result.error) {
          dispatch(getAllArticlesFailure(result.error));
        } else {
          dispatch(getArticleBySlugSuccess(result.data.articles[0]));
        }
      })
      .catch((err) => dispatch(getAllArticlesFailure(err)));
  };
}
