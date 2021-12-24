import gql from 'graphql-tag';

export const GET_TOPICS_QUERY = gql`
  query getTopics($filters: CategoryFilters) {
    categories(filters: $filters) {
      ID
      name
      description
      slug
    }
  }
`;

export const SAVE_CATEGORY_MUTATION = gql`
  mutation saveCategory($category: CategoryInput) {
    upsertCategory(category: $category) {
      ID
      name
      slug
      featureImage
      sequence
    }
  }
`;
