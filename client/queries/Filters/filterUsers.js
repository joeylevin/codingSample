import gql from 'graphql-tag';
import { fetchUsersQuery } from '../Full-Fetch/fetchUsers';

export const filterUsersQuery = `
  query filterUsers($userID:[Int!])
{
  users(filter: {
  byIds:$userID
})
  {
    ${fetchUsersQuery}
  }
}
`;

// export const filterUsers = gql`
//   ${filterUsersQuery}
// `;
