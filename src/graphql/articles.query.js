import gql from "graphql-tag";

export const GET_ARTICLES_QUERY = gql`
  query articles($filters: ArticleFilters) {
    articles(filters: $filters) {
      ID
      author {
        name
        userName
        email
        avatar
      }
      subTitle
      description
      descriptionJson
      sequence
      slug
      createdDate
      title
      featureImage
      readMinutes
      viewCount
      urls
      totalClapCount
      totalArticleCount
      isBookmark
      isFollowed
      isClicked
      isArticleLiked
      internalArticle
      metaRobots
      article_SEO {
        metaTitle
        metaDescription
        conicalUrl
        keyPhrases
      }
    }
  }
`;

export const GET_CAMPAIGN_QUERY_WITH_SPLIT = gql`
  query campaign($filters: CampaignFilters) {
    campaign(filters: $filters) {
      ID
      CampaignName
      ArticleId1 {
        ID
        slug
      }
      ArticleId2 {
        ID
        slug
      }
      createdDate
      Views
      Reactions
      CTR
      Revenue
      SplitId
    }
  }
`;

export const CLAP_ARTICLE_MUTATION = gql`
  mutation updateClapCount($updateClapCount: ArticleRBInput) {
    upsertArticleRating(articleRating: $updateClapCount) {
      ID
      description
      clapCount
      articleID
      status
    }
  }
`;

export const BOOKMARK_ARTICLE_MUTATION = gql`
  mutation updateBookmark($bookmark: ArticleRBInput) {
    upsertArticleBookmark(articleBookmark: $bookmark) {
      ID
      articleID
      status
    }
  }
`;
