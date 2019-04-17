import gql from 'graphql-tag';

export const fetchCompaniesQuery = `
  name
  displayImageUrl
  uuid
  id
  description
  mockEntity
  approved
  facebookBusinessManagerId
  facebookIntegrationUser {
    name
    uuid
  }
  companyProfile {
    employeeCount
    monthlyAdSpend
    contactDetails {
      emailAddress
    }
  }
  created
  modified
  performance {
    aggregated
  }
  users {
    uuid
    displayName
  }
  campaigns {
    uuid
    name
  }
  channelAccounts {
    name
    uuid
  }
`;

export const fetchCompanies = gql`
{
  companies {
  ${fetchCompaniesQuery}
  }
}
`;
