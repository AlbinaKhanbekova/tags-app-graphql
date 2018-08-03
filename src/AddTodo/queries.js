import gql from 'graphql-tag';

export const ADD_TAG = gql`
    mutation addTag($type: String!, $label: String!) {
        addTag(type: $type, label: $label) @client {
            id
        }
    }
`;
export const REMOVE_TAG = gql`
    mutation removeTag($id: Int!) {
        removeTag(id: $id) @client
    }
`;

export const HELLO_WORD = gql`
    query ping($message: String!) {
        ping(message: $message)
    }
`;

export const GET_TAG = gql`
    query allTags {
        allTags @client {
            id,
            label,
            type
        }
    }
`;