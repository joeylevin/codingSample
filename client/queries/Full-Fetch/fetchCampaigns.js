import gql from 'graphql-tag';

export const fetchCampaignsQuery = `
    name
    displayImageUrl
    uuid
    id
    description
    mockEntity
    company {
      name
      uuid
    }
    automaticStartDate
    automaticEndDate
    approved
    campaignStatus
    created
    modified
    isPublic
    channelType
    targetUrl
    competitionDuration
    competitionBudget
    initialContestantCount
    targetContestantCount
    campaignBudget
    marketerMatching
    targetKPI
    targetKPIValue
    details {
      limitations {
        platforms
        locations
        languages
        audiences {
          ageRanges
          genders
        }
      }
      audienceTags
      negativeKeywords
      positiveKeywords
      ownKeywords
      campaignBrief
      marketingLines
      creativeApproval
      creativesText
      accomplishTarget
      primaryObjective
      compellingFeature
      describingAdjectives
      stylisticGuidelines
      anythingElse
      campaignGoals
    }
    created
    modified
    marketerCampaignInvitation {
      marketer {
        name
        uuid
      }
    }
    integrationSettings {
      instructions
    }
    performance {
      aggregated
    }
    sharedFiles {
      uuid
      name
    }
    campaignContestants {
      uuid
      campaign {
        name
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
