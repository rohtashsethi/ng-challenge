import { gql } from 'apollo-angular';

export const GET_USER_INFO = gql`
  query ($login: String!) {
    user(login: $login) {
      name
      login
      location
      bio
      avatarUrl
    }
  }
`;

export const GET_REPOS = gql`
  query ($login: String!, $pageSize: Int!) {
    user(login: $login) {
      login
      name
      repositories(first: $pageSize) {
        totalCount
        nodes {
          description
          id
          name
          createdAt
        }
      }
    }
  }
`;
