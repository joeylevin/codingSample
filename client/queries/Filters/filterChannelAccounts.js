import gql from 'graphql-tag';
import { fetchChannelAccountsQuery } from '../Full-Fetch/fetchChannelAccounts';

export const filterChannelAccountsQuery = `
  query filterChannelAccounts($userID:[Int!])
{
  channelAccounts(filter: {
  byIds:$userID
})
  {
    ${fetchChannelAccountsQuery}
  }
}
`;
//
// export const filterChannelAccounts = gql`
//   ${fetchChannelAccountsQuery}
// `;
