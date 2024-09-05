import { gql } from '@apollo/client';

export const REPOSITORY_BASE_FIELDS = gql`
  fragment repositoryBaseFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
  }
`;

export const USER_BASE_FIELDS = gql`
  fragment userBaseFields on User {
    id
    username
    createdAt
  }
`;

export const REVIEW_BASE_FIELDS = gql`
  fragment reviewBaseFields on ReviewConnection {
    edges {
      node {
        id
        repositoryId
        repository {
          fullName
        }
        text
        rating
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`;