import { gql } from 'apollo-angular';

export const GET_USER_INFO = gql`
  query Viewer {
    viewer {
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
      repositories(first: $pageSize, orderBy: { field: STARGAZERS, direction: DESC }) {
        totalCount
        nodes {
          description
          id
          name
          stargazerCount
          createdAt
        }
      }
    }
  }
`;
