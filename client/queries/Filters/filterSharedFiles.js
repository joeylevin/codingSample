import gql from 'graphql-tag';
import { fetchSharedFilesQuery } from '../Full-Fetch/fetchSharedFiles';

export const filterSharedFilesQuery = `
  query filterSharedFiles($userID:[Int!])
{
  sharedFiles(filter: {
  byIds:$userID
})
  {
    ${fetchSharedFilesQuery}
  }
}
`;

// export const filterSharedFiles = gql`
//   ${filterSharedFilesQuery}
// `;
