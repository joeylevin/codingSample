import gql from 'graphql-tag';
import { fetchMarketersQuery } from './Full-Fetch/fetchMarketers';

export const findMarketers = gql`
query findMarketers($userID:[Int!])
  {
    users(filter: {
      byIds:$userID
    }) 
    {
      marketers {
      ${fetchMarketersQuery}
      }
    }
  }
`;
