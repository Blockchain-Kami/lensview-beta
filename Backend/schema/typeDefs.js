const { gql } = require('apollo-server-express')

const typeDefs = gql`
    
    type Publication {
        publicationID: String!
    }
    
    # Queries
    type Query {
        getUrlAt(id: Int!): String!,
        getPublicationsForUrl(url: String!): [String]!
    }
    
    type Mutation {
        addPublicationTo(url: String!, publicationId: String!): Boolean 
        createNewProfile(handle: String!): Boolean
    }

`;

module.exports = {typeDefs}