import casual from 'casual';
import moment from 'moment';
import { MockList } from 'graphql-tools';
import * as consts from './Constants';

moment().format();

export const mocks = {
  // Scalars:
  DateTime: () => {
    return new Date(casual.moment);
  },
  Date:     () => {
    return new Date(casual.date('YYYY-MM-DD'));
  },
  Time:     () => {
    return new Date(casual.time('HH:mm:ss'));
  },
  JSON:     () => {
    return {
      userId: 1,
      id:     1,
      title:  'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:   'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas tot',
    };
  },

  // Enums:
  userType:                         () => {
    return casual.random_element(consts.UserType);
  },
  ChannelType:                      () => {
    return casual.random_element(consts.ChannelType);
  },
  KPIType:                          () => {
    return casual.random_element(consts.KPIType);
  },
  EmployeeCount:                    () => {
    return casual.random_element(consts.EmployeeCount);
  },
  AdSpend:                          () => {
    return casual.random_element(consts.AdSpend);
  },
  CampaignInvitationStatus:         () => {
    return casual.random_element(consts.CampaignInvitationStatus);
  },
  CampaignStatus:                   () => {
    return casual.random_element(consts.CampaignStatus);
  },
  MarketerMatchingMethod:           () => {
    return casual.random_element(consts.MarketerMatchingMethod);
  },
  CampaignGoals:                    () => {
    return casual.random_element(consts.CampaignGoals);
  },
  CampaignCreativeApproval:         () => {
    return casual.random_element(consts.CampaignCreativeApproval);
  },
  CampaignIndustries:               () => {
    return casual.random_element(consts.CampaignIndustries);
  },
  CampaignLimitationAgeRange:       () => {
    return casual.random_element(consts.CampaignLimitationAgeRange);
  },
  CampaignLimitationGender:         () => {
    return casual.random_element(consts.CampaignLimitationGender);
  },
  CampaignLimitationParentalStatus: () => {
    return casual.random_element(consts.CampaignLimitationParentalStatus);
  },
  CampaignLimitationPlatform:       () => {
    return casual.random_element(consts.CampaignLimitationPlatform);
  },
  CampaignLimitationLanguage:       () => {
    return casual.random_element(consts.CampaignLimitationLanguage);
  },

  // Helpers
  Geolocation: () => {
    return ({
      lat: casual.latitude,
      lng: casual.longitude,
    });
  },

  PostalAddress: () => {
    return ({
      street1:  casual.street,
      street2:  casual.street,
      city:     casual.city,
      state:    casual.state,
      postCode: casual.zip,
      country:  casual.country,
    });
  },

  ContactDetails: () => {
    return ({
      phoneNumber:             casual.numerify('###-###-####'),
      alternativePhoneNumber:  casual.numerify('###-###-####'),
      emailAddress:            casual.email,
      alternativeEmailAddress: casual.email,
      websiteAddress:          casual.url,
      linkedinProfileAddress:  casual.url,
    });
  },

  ChannelExpertise: () => {
    return ({
      googleAdWords:               casual.boolean,
      googleAdWordsExperience:     casual.string,
      facebookMarketing:           casual.boolean,
      facebookMarketingExperience: casual.string,
    });
  },

  ChannelIntegrationSettings: () => {
    return ({
      adAccountText:         casual.string,
      adAccountId:           casual.numerify('#######'),
      adAccountUrl:          casual.url,
      personalizedTargetUrl: casual.url,
    });
  },

  CampaignIntegrationSettings: () => {
    return ({
      code:         casual.string,
      instructions: casual.string,
    });
  },

  Error: () => {
    return ({
      code:    casual.integer(0, 1000),
      message: casual.string,
    });
  },

  EntityOperationResponse: () => {
    return ({
      success: casual.boolean,
      result:  casual.string,
    });
  },

  User:           () => {
    return ({
      uuid:            casual.numerify('#######'),
      id:              casual.integer(0, 1000),
      emailAddress:    casual.email,
      displayName:     casual.username,
      displayImageUrl: 'http://lorempixel.com/400/200/',
      mockEntity:      casual.boolean,
      approved:        casual.boolean,
      timezone:        casual.timezone,
      locale:          casual.locale,
      marketers:       () => {
        return new MockList([1, 4]);
      },
      companies:       () => {
        return new MockList([1, 2]);
      },
      sharedFiles:     () => {
        return new MockList([1, 5]);
      },
    });
  },
  ChannelAccount: () => {
    return ({
      uuid:           casual.numerify('#######'),
      id:             casual.integer(0, 1000),
      // creatingUser:   () => {
      //   return new MockList(1);
      // },
      creatingUserId: casual.integer(0, 1000),
      name:           casual.name,
      description:    casual.description,
    });
  },

  SharedFile: () => {
    return ({
      uuid:                 casual.numerify('#######'),
      id:                   casual.integer(0, 1000),
      creatingUserId:       casual.integer(0, 1000),
      campaignId:           casual.integer(0, 1000),
      campaignContestantId: casual.integer(0, 1000),
      name:                 `${casual.title}.${casual.file_extension}`,
      description:          casual.description,
      mimetype:             casual.string,
      size:                 casual.integer(0, 10),
      url:                  casual.url,
    });
  },

  Company:  () => {
    return ({
      uuid:                      casual.numerify('#######'),
      id:                        casual.integer(0, 1000),
      name:                      casual.name,
      description:               casual.description,
      displayImageUrl:           'http://lorempixel.com/400/200/',
      mockEntity:                casual.boolean,
      approved:                  casual.boolean,
      facebookBusinessManagerId: casual.numerify('#######'),
      facebookIntegrationUserId: casual.numerify('#######'),
      users:                     () => {
        return new MockList([1, 4]);
      },
      channelAccounts:           () => {
        return new MockList([1, 2]);
      },
      campaigns:                 () => {
        return new MockList([1, 5]);
      },

    });
  },
  Marketer: () => {
    return ({
      uuid:                      casual.numerify('#######'),
      id:                        casual.integer(0, 1000),
      name:                      casual.name,
      description:               casual.description,
      displayImageUrl:           'http://lorempixel.com/400/200/',
      mockEntity:                casual.boolean,
      approved:                  casual.boolean,
      facebookBusinessManagerId: casual.numerify('#######'),
      facebookIntegrationUserId: casual.numerify('#######'),
      users:                     () => {
        return new MockList([1, 4]);
      },
      channelAccounts:           () => {
        return new MockList([1, 2]);
      },
      campaignInvitations:       () => {
        return new MockList([1, 5]);
      },
      campaignContestants:       () => {
        return new MockList([1, 5]);
      },

    });
  },

  campaignInvitation: () => {
    return ({
      uuid:       casual.numerify('#######'),
      campaignId: casual.integer(0, 1000),
      marketerId: casual.integer(0, 1000),
    });
  },
  Campaign:           () => {
    return ({
      uuid:                   casual.numerify('#######'),
      id:                     casual.integer(0, 1000),
      companyId:              casual.integer(0, 1000),
      approved:               casual.boolean,
      name:                   casual.name,
      description:            casual.description,
      displayImageUrl:        'http://lorempixel.com/400/200/',
      mockEntity:             casual.boolean,
      isPublic:               casual.boolean,
      targetUrl:              casual.url,
      competitionDuration:    casual.integer(0, 1000),
      initialContestantCount: casual.integer(0, 1000),
      targetContestantCount:  casual.integer(0, 1000),
      campaignBudget:         casual.integer(100, 100000),
      competitionBudget:      casual.integer(100, 100000),
      targetKPIValue:         casual.double(0, 100),
      users:                  () => {
        return new MockList([1, 4]);
      },
      channelAccounts:        () => {
        return new MockList([1, 2]);
      },
      campaignInvitations:    () => {
        return new MockList([1, 5]);
      },
      campaignContestants:    () => {
        return new MockList([1, 5]);
      },
    });
  },

  CampaignContestant: () => {
    return ({
      uuid:            casual.numerify('#######'),
      id:              casual.integer(0, 1000),
      campaignId:      casual.integer(0, 1000),
      marketerId:      casual.integer(0, 1000),
      channelAccounts: () => {
        return new MockList([1, 5]);
      },
      sharedFiles:     () => {
        return new MockList([1, 3]);
      },
    });
  },

  IdentityDetails: () => {
    return ({
      userId:           casual.integer(0, 1000),
      userType:         casual.string,
      actingCompanyId:  casual.integer(0, 1000),
      actingMarketerId: casual.integer(0, 1000),
    });
  },

  // Facebook
  FacebookUser: () => {
    return ({

      uuid:            casual.integer(0, 1000),
      id:              casual.numerify('#######'),
      name:            casual.name,
      displayImageUrl: 'http://lorempixel.com/400/200/',
      linkUrl:         casual.url,
      gender:          casual.string,
      email:           casual.email,
      timezone:        casual.timezone,
    });
  },

  FacebookBusinessManager: () => {
    return ({

      uuid:            casual.integer(0, 1000),
      id:              casual.numerify('#######'),
      name:            casual.name,
      displayImageUrl: 'http://lorempixel.com/400/200/',
      linkUrl:         casual.url,
      timezone:        casual.timezone,
    });
  },

  FacebookPage:   () => {
    return ({

      uuid:                    casual.integer(0, 1000),
      id:                      casual.numerify('#######'),
      name:                    casual.name,
      displayImageUrl:         'http://lorempixel.com/400/200/',
      linkUrl:                 casual.url,
      owningBusinessManagerId: casual.numerify('#######'),
      about:                   casual.description,
      category:                casual.string,
      websiteUrl:              casual.url,
    });
  },
  viewer:         () => {
    return ({
      User: () => {
        return new MockList(1);
      },
    });
  },
  actingCompany:  () => {
    return ({
      Company: () => {
        return new MockList(1);
      },
    });
  },
  actingMarketer: () => {
    return ({
      Marketer: () => {
        return new MockList(1);
      },
    });
  },
  users:          ({ filterRequest }) => {
    return new MockList(filterRequest.byIds.length);
  },
};
