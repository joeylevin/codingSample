import gql from 'graphql-tag';

export const fetchMarketersQuery = `
    displayImageUrl
    name
    uuid
    id
    description
    mockEntity
    approved
    facebookBusinessManagerId
    facebookIntegrationUser {
      name
      linkUrl
    }
    marketerProfile {
      contactDetails {
        emailAddress
        phoneNumber
        websiteAddress
        linkedinProfileAddress
        postalAddress {
          street1
          street2
          city
          state
          postCode
          country
        }
      }
      employeeCount
      monthlyAdSpendManaged
      channelExpertise {
        googleAdWords
        googleAdWordsExperience
        facebookMarketing
        facebookMarketingExperience
      }
      
    }
    created
    modified
    performance {
      aggregated
    }
    users {
      displayName
      uuid
    }
    campaignContestants {
      uuid
      marketer{
        name
      }
    }
    channelAccounts {
      name
      uuid
    }
`;

export const fetchMarketers = gql`
{
  marketers {
  ${fetchMarketersQuery}
  }
}
`;
