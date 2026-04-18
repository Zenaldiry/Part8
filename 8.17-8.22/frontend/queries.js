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
  query ($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
