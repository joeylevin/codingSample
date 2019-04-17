import gql from 'graphql-tag';
import { fetchCampaignContestantsQuery } from '../Full-Fetch/fetchCampaignContestants';

export const filterCampaignContestantsQuery = `
  query filterCampaignContestants($userID:[Int!])
{
  campaignContestants(filter: {
  byIds:$userID
})
  {
    ${fetchCampaignContestantsQuery}
  }
}
`;

// export const filterCampaignContestants = gql`
//   ${filterCampaignContestantsQuery}
// `;
