import gql from 'graphql-tag';

export const fetchUsersQuery = `
    uuid
    id
    displayName
    emailAddress
    displayImageUrl
    approved
    userType
    mockEntity
    approved
    timezone
    locale
    created
    modified
    marketers {
      name
      uuid
    }
    companies {
      name
      uuid
    }
    sharedFiles {
      name
      uuid
    }
`;

export const fetchUsers = gql`
{
  users {
  ${fetchUsersQuery}
  }
}
`;
