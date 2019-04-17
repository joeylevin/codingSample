import gql from 'graphql-tag';
import { filterUsersQuery } from './Filters/filterUsers';
import { filterMarketersQuery } from './Filters/filterMarketers';
import { filterChannelAccountsQuery } from './Filters/filterChannelAccounts';
import { filterCompaniesQuery } from './Filters/filterCompanies';
import { filterSharedFilesQuery } from './Filters/filterSharedFiles';
import { filterCampaignsQuery } from './Filters/filterCampaigns';
import { filterCampaignContestantsQuery } from './Filters/filterCampaignContestants';

export const filterUsers = gql`
  ${filterUsersQuery}
`;
export const filterMarketers = gql`
  ${filterMarketersQuery}
`;
export const filterChannelAccounts = gql`
  ${filterChannelAccountsQuery}
`;
export const filterCompanies = gql`
  ${filterCompaniesQuery}
`;
export const filterSharedFiles = gql`
  ${filterSharedFilesQuery}
`;
export const filterCampaigns = gql`
  ${filterCampaignsQuery}
`;
export const filterCampaignContestants = gql`
  ${filterCampaignContestantsQuery}
`;
