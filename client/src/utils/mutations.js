import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                email
                password
                username
                savedBooks {
                    _id
                    authors
                    bookId
                    description
                    image
                    link
                    title
                }
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                password
                savedBooks {
                    _id
                    authors
                    bookId
                    description
                    image
                    link
                    title
                }
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: ID!, $authors: [String]!, $title: String!, $description: String!, $image: String!) {
        saveBook(bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image) {
            _id
            email
            password
            username
            savedBooks {
                _id
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;
