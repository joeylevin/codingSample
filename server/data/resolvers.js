import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

export const resolvers = {
  Date:     GraphQLDate,
  Time:     GraphQLTime,
  DateTime: GraphQLDateTime,
  JSON:     GraphQLJSON,
};
