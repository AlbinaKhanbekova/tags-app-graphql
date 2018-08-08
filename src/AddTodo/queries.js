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

export const GET_CURRENT_TAG = gql`
    query getCurrentTag {
        currentTag @client {
            label
            type
            labelTitle
            typeTitle
        }
    }
`;

export const UPDATE_CURRENT_TAG =  gql`
    mutation updateCurrentTag($type: String!, $label: String!)  {
        updateCurrentTag(type: $type, label: $label) @client
    }
`;
export const RESET_CURRENT_TAG =  gql`
    mutation resetCurrentTag {
        resetCurrentTag @client
    }
`;