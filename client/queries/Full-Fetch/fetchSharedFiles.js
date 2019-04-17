import gql from 'graphql-tag';

export const fetchSharedFilesQuery = `
  name
  description
  uuid
  id
  creatingUser {
    uuid
    displayName
  }
  campaign {
    uuid
    name
  }
  campaignContestant {
    campaign {
      name
    }
    uuid
  }
  mimetype
  size
  url
  created
`;

export const fetchSharedFiles = gql`
{
  sharedFiles {
  ${fetchSharedFilesQuery}
  }
}
`;
