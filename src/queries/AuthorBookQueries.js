import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      pages
      author {
        _id
        firstName
        lastName
        age
      }
      publishedAt
      editorial
      title
      _id
    }
  }
`;

export const GET_AUTHORS_NAME = gql`
  query GetAuthors {
    getAuthors {
      _id
      firstName
      lastName
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($input: BookInput) {
    createBook(input: $input) {
      _id
      title
      pages
      author {
        _id
        firstName
        lastName
        age
      }
      publishedAt
      editorial
    }
  }
`;
