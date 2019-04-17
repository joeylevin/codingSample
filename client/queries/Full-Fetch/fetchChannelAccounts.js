import gql from 'graphql-tag';

export const fetchChannelAccountsQuery = `
    uuid
    id
    created
    modified
    name
    description
    creatingUser {
      displayName
      uuid
    }
    channelType
    integrationSettings {
      adAccountText
      adAccountUrl
      adAccountId
    }
    performance {
      channel
    }
`;

export const fetchChannelAccounts = gql`
{
  channelAccounts {
  ${fetchChannelAccountsQuery}
  }
}
`;
