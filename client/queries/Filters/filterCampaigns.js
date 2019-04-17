import gql from 'graphql-tag';
import { fetchCampaignsQuery } from '../Full-Fetch/fetchCampaigns';

export const filterCampaignsQuery = `
  query filterCampaigns($userID:[Int!])
{
  campaigns(filter: {
  byIds:$userID
})
  {
    ${fetchCampaignsQuery}
  }
}
`;

// export const filterCampaigns = gql`
//   ${filterCampaignsQuery}
// `;
