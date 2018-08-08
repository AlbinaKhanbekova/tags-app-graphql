import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-boost';
import resolvers from './resolvers';
import defaults from './defaults';

const cache = new InMemoryCache();

const typeDefs = `
  type Tag {
    id: Int
    label: String
    type: String
  }

  type TagForm {
    label: String
    type: String
    labelTitle: String
    typeTitle: String
  }

  type Mutation {
    addTag(type: String!, label: String!): Tag
    removeTag(id: Int!): Tag
    updateCurrentTag(type: String!, label: String!)
    resetCurrentTag
  }

  type Query {
    allTags: [Tag]
    currentTag: TagForm
  }
`;


const client = new ApolloClient({
  uri: "http://localhost:3020/graphql",
  clientState: {
    defaults,
    resolvers,
    typeDefs
  },
  cache
});

export default client;