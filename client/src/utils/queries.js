import { gql } from '@apollo/client';

export const FIND_USER = gql`
    query findUser {
        findUser {
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