import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
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

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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

