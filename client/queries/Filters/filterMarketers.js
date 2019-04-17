import gql from 'graphql-tag';
import { fetchMarketersQuery } from '../Full-Fetch/fetchMarketers';

export const filterMarketersQuery = `
  query filterMarketers($userID:[Int!])
{
  marketers(filter: {
  byIds:$userID
})
  {
    ${fetchMarketersQuery}
  }
}
`;

// export const filterMarketers = gql`
//   ${filterMarketersQuery}
// `;
