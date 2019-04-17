import gql from 'graphql-tag';
import { fetchUsersQuery } from './Full-Fetch/fetchUsers';
import { fetchMarketersQuery } from './Full-Fetch/fetchMarketers';
import { fetchChannelAccountsQuery } from './Full-Fetch/fetchChannelAccounts';
import { fetchCompaniesQuery } from './Full-Fetch/fetchCompanies';
import { fetchSharedFilesQuery } from './Full-Fetch/fetchSharedFiles';
import { fetchCampaignsQuery } from './Full-Fetch/fetchCampaigns';
import { fetchCampaignContestantsQuery } from './Full-Fetch/fetchCampaignContestants';

export const fetchUsers = gql`
{
  users {
  ${fetchUsersQuery}
  }
}
`;
export const fetchMarketers = gql`
{
  marketers {
  ${fetchMarketersQuery}
  }
}
`;
export const fetchChannelAccounts = gql`
{
  channelAccounts {
  ${fetchChannelAccountsQuery}
  }
}
`;
export const fetchCompanies = gql`
{
  companies {
  ${fetchCompaniesQuery}
  }
}
`;
export const fetchSharedFiles = gql`
{
  sharedFiles {
  ${fetchSharedFilesQuery}
  }
}
`;
export const fetchCampaigns = gql`
{
  campaigns {
  ${fetchCampaignsQuery}
  }
}
`;
export const fetchCampaignContestants = gql`
{
  campaignContestants {
  ${fetchCampaignContestantsQuery}
  }
}
`;
