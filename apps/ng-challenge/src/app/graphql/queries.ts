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
  query Viewer ($pageSize: Int!) {
    viewer {
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

export const GET_REPOS_CURSOR = gql`
  query Viewer ($limit: Int, $cursor: String) {
    viewer {
      repositories(first: $limit, after: $cursor, orderBy: { field: STARGAZERS, direction: DESC }) {
        edges {
          node {
            description
            id
            name
            stargazerCount
            createdAt
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;