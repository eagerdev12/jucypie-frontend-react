import { client } from "../../config/configureClient";
import _ from "underscore";
import {
  GET_ARTICLES_QUERY,
  GET_CAMPAIGN_QUERY_WITH_SPLIT,
} from "../../graphql";
import {
  GET_ALL_ARTICLES_BEGIN,
  GET_ALL_ARTICLES_SUCCESS,
  GET_ALL_ARTICLES_FAILURE,
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

export function getAllArticleList(limit, page, userId) {
  return (dispatch) => {
    dispatch(getAllArticlesBegin());
    return client
      .query({
        query: GET_ARTICLES_QUERY,
        variables: { filters: { page, limit, userId } },
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

const getCampaignData = (client, SplitId, limit, page, userId) => {
  return client
    .query({
      query: GET_CAMPAIGN_QUERY_WITH_SPLIT,
      variables: {
        filters: {
          SplitId: SplitId,
        },
        fetchPolicy: "no-cache",
      },
    })
    .then((campaign) => {

      if(campaign.data.campaign.length==0 || !(campaign.data.campaign[0].ArticleId1 || campaign.data.campaign[0].ArticleId2)){
        return {
          articles: [],
          articlesIds: []
        }
      }
      var articleIds = [];
      articleIds.push(campaign.data.campaign[0].ArticleId1.ID);
      articleIds.push(campaign.data.campaign[0].ArticleId2.ID);
      return client
        .query({
          query: GET_ARTICLES_QUERY,
          variables: { filters: { articleIds, limit, page, userId } },
          fetchPolicy: "no-cache",
        })
        .then((articles) => {
          return {
            articles: articles.data,
            articlesIds: articleIds,
          };
        });
    });
};
export function getAllArticleListWhenUser(
  client,
  SplitId,
  limit,
  page,
  articleId,
  userId,
) {
  return (dispatch) => {
    dispatch(getAllArticlesBegin());
    return client
      .query({
        query: GET_ARTICLES_QUERY,
        variables: { filters: { page, limit } },
        fetchPolicy: "no-cache",
      })
      .then((result) => {
        let mySet = [];
        return getCampaignData(client, SplitId, limit, page)
          .then((campaign) => {
            
            if(  campaign.articles.length==0 ||
              (String(articleId)!=String(campaign.articles.articles[0].slug) && 
              String(articleId)!=String(campaign.articles.articles[1].slug))
              ){
              if (result.data.articles.length !== 0) {
                dispatch(getAllArticlesSuccess(result.data.articles));
              } else {
                dispatch({ type: "IS_MORE_DATA", payload: false });
              }
              return false;
            }
            if (campaign.articles.articles[0].ID == campaign.articlesIds[0]) {
              mySet.push(campaign.articles.articles[0]);
              mySet.push(campaign.articles.articles[1]);
            } else {
              mySet.push(campaign.articles.articles[1]);
              mySet.push(campaign.articles.articles[0]);
            }
            result.data.articles.map((article) => {
              if (_.findWhere(mySet, { ID: article.ID }) == undefined) {
                mySet.push(article);
              }
            });
            if (result.data.articles.length !== 0) {
              dispatch(getAllArticlesSuccess(mySet));
            } else {
              dispatch({ type: "IS_MORE_DATA", payload: false });
            }
          })
          .catch((err) => {
            dispatch(getAllArticlesFailure(err));
          });
      })
      .catch((err) => {
        dispatch(getAllArticlesFailure(err));
      });
  };
}

export default {
  getAllArticleList,
  getAllArticleListWhenUser,
};
