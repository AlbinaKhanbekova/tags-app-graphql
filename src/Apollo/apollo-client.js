import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-boost';
import resolvers from './resolvers';

const cache = new InMemoryCache();

const typeDefs = `
  type Tag {
    id: Int
    label: String
    type: String
  }
  type Mutation {
    addTag(type: String!, label: String!): Tag
    removeTag(id: Int!): Tag
  }

  type Query {
    allTags: [Tag]
  }
`;


const client = new ApolloClient({
  uri: "http://localhost:3020/graphql",
  clientState: {
    defaults: {
      allTags: []
    },
    resolvers,
    typeDefs
  },
  cache
});

export default client;