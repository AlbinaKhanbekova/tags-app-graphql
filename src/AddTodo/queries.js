import gql from 'graphql-tag';

export const ADD_TAG = gql`
    mutation addTag($type: String!, $label: String!) {
        addTag(type: $type, label: $label) {
            id,
            label
        }
    }
`;

export const HELLO_WORD = gql`
    query ping($message: String!) {
        ping(message: $message)
    }
`;

export const GET_TAG = gql`
    query allTags {
        allTags {
            id,
            label
        }
    }
`;