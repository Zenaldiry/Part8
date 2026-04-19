import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;
export const GET_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      author
    }
  }
`;
