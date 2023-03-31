import { gql } from '@apollo/client';

export const FIND_USER = gql`
    query FindUser($userId: ID!) {
        findUser(userId: $userId) {
            _id
            username
            email
            password
            savedBooks {
                _id
                title
                authors
                bookId
                description
                image
                link
            }
        }
    }
`;