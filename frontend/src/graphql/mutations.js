import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials)  {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review)  {
      id,
      userId,
      repositoryId,
      text,
      rating,
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(user: $user)  {
    id
    }
  }
`