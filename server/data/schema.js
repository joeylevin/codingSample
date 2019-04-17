import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mocks } from './mocks';
import { resolvers } from './resolvers';

const typeDefs = `
#---------------------
# Additional Scalars
#---------------------

scalar Date
scalar Time
scalar DateTime
scalar JSON

#---------------------
# Enumerations
#---------------------

enum ChannelType {
  MOCK
  GOOGLE_ADWORDS
  FACEBOOK_MARKETING
}

enum UserType {
  ADMIN_USER
  SUPPORT_USER
  NORMAL_USER
}

enum KPIType {
  ROI
  CPC
  CPA
  CPM
  Clicks
  Conversions
  ROAS
}

enum EmployeeCount {
  UNKNOWN
  FROM_1_TO_4
  FROM_5_TO_19
  FROM_20_TO_49
  FROM_50_TO_199
  FROM_200_TO_499
  FROM_500_OR_MORE
}

enum AdSpend {
  UNKNOWN
  FROM_0_TO_50000
  FROM_50001_TO_200000
  FROM_200001_TO_500000
  FROM_500001_TO_1000000
  FROM_1000001_OR_MORE
}

enum CampaignInvitationStatus {
  WAITING
  ACCEPTED
  REJECTED
}

enum CampaignStatus {
  PENDING
  SCHEDULED
  ACTIVE
  COMPLETE
  TERMINATED
}

enum MarketerMatchingMethod {
  MANUAL
  AUTOMATIC
}

enum CampaignGoals {
  GENERATE_MORE_TRAFFIC
  GENERATE_MORE_CONVERSIONS
  INCREASE_SEARCH_ENGINE_RANKINGS
  SOCIAL_MEDIA_PRESENCE
  GET_BLOGS_ENDORSEMENT
  ENTER_A_NEW_MARKET
  IMPROVE_BRAND_IMAGE
  INCREASE_BRAND_AWARENESS
  APP_INSTALLS
  LEADS_OR_SIGN_UP
}

enum CampaignCreativeApproval {
  NO_APPROVAL
  REQUIRE_APPROVAL
  AUTOMATIC_APPROVAL
}

enum CampaignIndustries {
  AIRLINES_AND_AVIATION
  APPAREL_AND_FASHION
  ARCHITECTURE_AND_PLANNING
  ARTS_AND_CRAFTS
  AUTOMOTIVE
  AVIATION_AND_AEROSPACE
  BANKING
  BROADCAST_MEDIA
  COMPUTER_GAMES
  COMPUTER_HARDWARE
  COMPUTER_SOFTWARE
  CONSTRUCTION
  CONSUMER_ELECTRONICS
  COSMETICS
  EDUCATION
  ENTERTAINMENT
  FINE_ART
  FOOD_AND_BEVERAGES
  FOOD_PRODUCTION
  FURNITURE
  HEALTH_WELLNESS_AND_FITNESS
  HOSPITALITY
  HUMAN_RESOURCES
  INDIVIDUAL_AND_FAMILY_SERVICES
  INFORMATION_TECHNOLOGY_AND_SERVICES
  INSURANCE
  INTERNET
  LEISURE_TRAVEL_AND_TOURISM
  LUXURY_GOODS_AND_JEWELRY
  MARKETING_AND_ADVERTISING
  MEDICAL_DEVICES
  MOTION_PICTURES_AND_FILM
  MUSEUMS_AND_INSTITUTIONS
  MUSIC
  NONPROFIT_ORGANIZATION_MANAGEMENT
  OIL_AND_ENERGY
  PAPER_AND_FOREST_PRODUCTS
  PUBLISHING
  REAL_ESTATE
  RECREATIONAL_FACILITIES_AND_SERVICES
  RESTAURANTS
  RETAIL
  SPORTING_GOODS
  SPORTS
  SUPERMARKETS
  TELECOMMUNICATIONS
  TEXTILES
  UTILITIES
  VETERINARY
}

#---------------------
# Campaign Limitations
#---------------------

enum CampaignLimitationAgeRange {
  AGE_RANGE_18_24
  AGE_RANGE_25_34
  AGE_RANGE_35_44
  AGE_RANGE_45_54
  AGE_RANGE_55_64
  AGE_RANGE_65_UP
  AGE_RANGE_UNDETERMINED
}

enum CampaignLimitationGender {
  GENDER_MALE
  GENDER_FEMALE
  GENDER_UNDETERMINED
}

enum CampaignLimitationParentalStatus {
  PARENT_PARENT
  PARENT_NOT_A_PARENT
  PARENT_UNDETERMINED
}

enum CampaignLimitationPlatform {
  PLATFORM_Desktop
  PLATFORM_HighEndMobile
  PLATFORM_Tablet
}

enum CampaignLimitationLanguage {
  LANGUAGE_ar
  LANGUAGE_bg
  LANGUAGE_ca
  LANGUAGE_zh_CN
  LANGUAGE_zh_TW
  LANGUAGE_hr
  LANGUAGE_cs
  LANGUAGE_da
  LANGUAGE_nl
  LANGUAGE_en
  LANGUAGE_et
  LANGUAGE_tl
  LANGUAGE_fi
  LANGUAGE_fr
  LANGUAGE_de
  LANGUAGE_el
  LANGUAGE_iw
  LANGUAGE_hi
  LANGUAGE_hu
  LANGUAGE_is
  LANGUAGE_id
  LANGUAGE_it
  LANGUAGE_ja
  LANGUAGE_ko
  LANGUAGE_lv
  LANGUAGE_lt
  LANGUAGE_ms
  LANGUAGE_no
  LANGUAGE_fa
  LANGUAGE_pl
  LANGUAGE_pt
  LANGUAGE_ro
  LANGUAGE_ru
  LANGUAGE_sr
  LANGUAGE_sk
  LANGUAGE_sl
  LANGUAGE_es
  LANGUAGE_sv
  LANGUAGE_th
  LANGUAGE_tr
  LANGUAGE_uk
  LANGUAGE_ur
  LANGUAGE_vi
}

#---------------------
# Helper Types
#---------------------

type GeoLocation {
  lat: Float!
  lng: Float!
}

type PostalAddress {
  street1: String
  street2: String
  city: String
  state: String
  postCode: String
  country: String
}

type ContactDetails {
  postalAddress: PostalAddress!
  geoLocation: GeoLocation
  phoneNumber: String!
  alternativePhoneNumber: String
  emailAddress: String!
  alternativeEmailAddress: String
  websiteAddress: String
  linkedinProfileAddress: String
}

type ChannelExpertise {
  googleAdWords: Boolean!
  googleAdWordsExperience: String
  facebookMarketing: Boolean!
  facebookMarketingExperience: String
}

type MarketerProfile {
  employeeCount: EmployeeCount
  monthlyAdSpendManaged: AdSpend!
  contactDetails: ContactDetails!
  channelExpertise: ChannelExpertise!
}

type CompanyProfile {
  employeeCount: EmployeeCount
  monthlyAdSpend: AdSpend!
  contactDetails: ContactDetails!
}

type ChannelIntegrationSettings {
  adAccountText: String
  adAccountId: String
  adAccountUrl: String
  personalizedTargetUrl: String
}

type ChannelPerformance {
  channel: JSON!
}

type AggregatedPerformance {
  aggregated: JSON!
}

type CampaignAudience {
  ageRanges: [CampaignLimitationAgeRange!]!
  genders: [CampaignLimitationGender!]!
}

type CampaignLimitation {
  locations: [String!]!
  platforms: [CampaignLimitationPlatform!]!
  languages: [CampaignLimitationLanguage!]!
  audiences: [CampaignAudience!]!
}

type CampaignDetails {
  industry: CampaignIndustries!
  campaignGoals: [CampaignGoals!]!
  limitations: [CampaignLimitation!]!
  audienceTags: [String!]!
  negativeKeywords: [String!]!
  positiveKeywords: [String!]!
  ownKeywords: [String!]!
  campaignBrief: String!
  marketingLines: String!
  creativeApproval: CampaignCreativeApproval!
  creativesText: String!
  accomplishTarget: String!
  primaryObjective: String!
  compellingFeature: String!
  describingAdjectives: String!
  stylisticGuidelines: String!
  anythingElse: String!
}

type CampaignIntegrationSettings {
  code: String
  instructions: String
}

type Error {
  code: Int!
  message: String!
}

type EntityOperationResponse {
  success: Boolean!
  result: String!
}

#---------------------
# Main Types
#---------------------

type User {
  uuid: String!
  id: Int!
  emailAddress: String
  userType: UserType
  displayName: String!
  displayImageUrl: String!
  mockEntity: Boolean!
  approved: Boolean!
  timezone: String
  locale: String

  created: DateTime
  modified: DateTime

  marketers(pagination: PaginationRequest, filter: FilterRequest): [Marketer!]
  companies(pagination: PaginationRequest, filter: FilterRequest): [Company!]
  sharedFiles(pagination: PaginationRequest, filter: FilterRequest): [SharedFile!]
}

type ChannelAccount {
  uuid: String!
  id: Int!
  creatingUser: User!
  creatingUserId: Int!
  name: String!
  description: String
  channelType: ChannelType!

  created: DateTime
  modified: DateTime

  integrationSettings: ChannelIntegrationSettings!
  performance: ChannelPerformance!
}

type SharedFile {
  uuid: String!
  id: Int!
  creatingUser: User!
  creatingUserId: Int!
  campaign: Campaign
  campaignId: Int
  campaignContestant: CampaignContestant
  campaignContestantId: Int

  name: String!
  description: String
  mimetype: String!
  size: Int!
  url: String!

  created: DateTime
}

type Company {
  uuid: String!
  id: Int!
  name: String!
  description: String
  displayImageUrl: String!
  mockEntity: Boolean!
  approved: Boolean!

  facebookBusinessManagerId: String

  facebookIntegrationUserId: String
  facebookIntegrationUser: FacebookUser

  companyProfile: CompanyProfile

  created: DateTime
  modified: DateTime

  users(pagination: PaginationRequest, filter: FilterRequest): [User!]
  channelAccounts(pagination: PaginationRequest, filter: FilterRequest): [ChannelAccount!]
  campaigns(pagination: PaginationRequest, filter: FilterRequest): [Campaign!]

  performance: AggregatedPerformance!
}

type Marketer {
  uuid: String!
  id: Int!
  name: String!
  description: String
  displayImageUrl: String!
  mockEntity: Boolean!
  approved: Boolean!

  facebookBusinessManagerId: String

  facebookIntegrationUserId: String
  facebookIntegrationUser: FacebookUser

  marketerProfile: MarketerProfile

  created: DateTime
  modified: DateTime

  users(pagination: PaginationRequest, filter: FilterRequest): [User!]
  channelAccounts(pagination: PaginationRequest, filter: FilterRequest): [ChannelAccount!]
  campaignInvitations(pagination: PaginationRequest, filter: FilterRequest): [CampaignInvitation!]
  campaignContestants(pagination: PaginationRequest, filter: FilterRequest): [CampaignContestant!]

  performance: AggregatedPerformance!
}

type CampaignInvitation {

  uuid: String!

  campaign: Campaign!
  campaignId: Int!
  marketer: Marketer!
  marketerId: Int!

  marketerInvitationStatus: CampaignInvitationStatus!
  companyInvitationStatus: CampaignInvitationStatus!
}

type Campaign {
  uuid: String!
  id: Int!
  company: Company!
  companyId: Int!

  automaticStartDate: DateTime
  automaticEndDate: DateTime
  approved: Boolean!
  campaignStatus: CampaignStatus!

  name: String!
  description: String
  displayImageUrl: String
  mockEntity: Boolean!
  approved: Boolean!

  isPublic: Boolean!
  channelType: ChannelType!
  targetUrl: String!
  competitionDuration: Int!
  initialContestantCount: Int!
  targetContestantCount: Int!
  campaignBudget: Int!
  competitionBudget: Int!
  marketerMatching: MarketerMatchingMethod!
  targetKPI: KPIType!
  targetKPIValue: Float!
  details: CampaignDetails!

  created: DateTime
  modified: DateTime

  marketerCampaignInvitation: CampaignInvitation
  campaignInvitations(pagination: PaginationRequest, filter: FilterRequest): [CampaignInvitation!]
  campaignContestants(pagination: PaginationRequest, filter: FilterRequest): [CampaignContestant!]
  sharedFiles(pagination: PaginationRequest, filter: FilterRequest): [SharedFile!]

  integrationSettings: CampaignIntegrationSettings!
  performance: AggregatedPerformance!

}

type CampaignContestant {
  uuid: String!
  id: Int!
  campaign: Campaign!
  campaignId: Int!
  marketer: Marketer!
  marketerId: Int!

  created: DateTime
  modified: DateTime

  channelAccounts(pagination: PaginationRequest, filter: FilterRequest): [ChannelAccount!]
  sharedFiles(pagination: PaginationRequest, filter: FilterRequest): [SharedFile!]

  performance: AggregatedPerformance!
}

type IdentityDetails {
  userId: Int!
  userType: String!
  actingCompanyId: Int
  actingMarketerId: Int
}

#---------------------
# Facebook API
#---------------------

type FacebookUser {

  uuid: String!
  id: String!
  name: String!
  displayImageUrl: String!
  linkUrl: String!
  gender: String
  email: String
  timezone: String

  administratedBusinessManagers: [FacebookBusinessManager]
  administratedPages:[FacebookPage]
}

type FacebookBusinessManager {

  uuid: String!
  id: String!
  name: String!
  displayImageUrl: String!
  linkUrl: String!
  timezone: String

  ownedPages: [FacebookPage]
}

type FacebookPage {

  uuid: String!
  id: String!
  name: String!
  displayImageUrl: String!
  linkUrl: String!
  owningBusinessManagerId: String
  about: String
  category: String
  websiteUrl: String

  owningBusinessManager: FacebookBusinessManager

}

#---------------------
# Input Types
#---------------------

input PaginationRequest {
  pageSize: Int = 1000
  pageNumber: Int = 0
}

input FilterRequest {
  byIds: [Int!]
  searchByField: String
  searchTerms: String
}

#---------------------
# Root Query and Mutation
#---------------------

type Query {

  # The current user
  viewer: User!

  # The current company (if acting as one)
  actingCompany: Company

  # The current marketer (if acting as one)
  actingMarketer: Marketer

  # The identity details of the current session
  identityDetails: IdentityDetails!

  # View users (just admin)
  users(pagination: PaginationRequest, filter: FilterRequest): [User]

  # View companies (all for admin, just public info for most users)
  companies(pagination: PaginationRequest, filter: FilterRequest): [Company]

  # View a specific company (just public info for normal users, all for admins)
  company(companyId: Int!): Company

  # View marketers (all for admin, just public info for most users)
  marketers(pagination: PaginationRequest, filter: FilterRequest): [Marketer]

  # View a specific marketer (just public info for normal users, all for admins)
  marketer(marketerId: Int!): Marketer

  # View campaigns (just public or invited for normal users, all for admins)
  campaigns(pagination: PaginationRequest, filter: FilterRequest): [Campaign]

  # View a specific campaign (just public or invited for normal users, all for admins)
  campaign(campaignId: Int!): Campaign

  # View specific campaign contestant based on its campaign and marketer ID (private only)
  campaignContestant(campaignId: Int!, marketerId: Int!): CampaignContestant

  # View all campaign contestants (admin only)
  campaignContestants(pagination: PaginationRequest, filter: FilterRequest): [CampaignContestant]

  # View all channel accounts (admin only)
  channelAccounts(pagination: PaginationRequest, filter: FilterRequest): [ChannelAccount]

  # View a shared file (admin only)
  sharedFile(sharedFileId: Int!): SharedFile

  # View all shared files (admin only)
  sharedFiles(pagination: PaginationRequest, filter: FilterRequest): [SharedFile]

}
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });

addMockFunctionsToSchema({ schema, mocks });
