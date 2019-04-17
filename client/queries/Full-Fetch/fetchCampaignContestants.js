import gql from 'graphql-tag';

export const fetchCampaignContestantsQuery = `
    campaign {
      name
      uuid
    }
    uuid
    id
    marketer {
      name
      uuid
    }
    created
    modified
    performance {
      aggregated
    }
    channelAccounts {
      uuid
      name
    }
    sharedFiles {
      uuid
      name
    }
`;


export const fetchCampaignContestants = gql`
{
  campaignContestants {
  ${fetchCampaignContestantsQuery}
  }
}
`;
