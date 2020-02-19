import { gql } from "apollo-boost";

export const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;
