import gql from 'graphql-tag';
import { fetchCompaniesQuery } from '../Full-Fetch/fetchCompanies';

export const filterCompaniesQuery = `
  query filterCompanies($userID:[Int!])
{
  companies(filter: {
  byIds:$userID
})
  {
    ${fetchCompaniesQuery}
  }
}
`;

// export const filterCompanies = gql`
//   ${filterCompaniesQuery}
// `;
