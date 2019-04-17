import React from 'react';
import { graphql, compose } from 'react-apollo';

import { fetchUsers } from '../queries/Full-Fetch/fetchUsers';
import { filterUsers } from '../queries/mainFilters';
import { Info } from './Info';
import { Base } from './Base';

class UsersItem extends Base {
  constructor(props) {
    super(props);
    console.log('init', props);
    this.checkHidden = this.checkHidden.bind(this);
    this.state = this.updateData(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('updating');
    this.setState(this.updateData(nextProps));
  }

  updateData(props) {
    return this.updateDataHelper(props, props.filterData.users, props.fetchData.users);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const columns = [
      {
        id: 'displayImageUrl',
      }, {
        id: 'displayName',
      }, {
        id: 'uuid',
      }, {
        id: 'id',
      }, {
        id: 'emailAddress',
      }, {
        id: 'userType',
      }, {
        id: 'mockEntity',
      }, {
        id: 'approved',
      }, {
        id: 'timezone',
      }, {
        id: 'locale',
      }, {
        id: 'created',
      }, {
        id: 'modified',
      }, {
        id: 'marketers',
      }, {
        id: 'companies',
      }, {
        id: 'sharedFiles',
      },
    ];

    return (
      <div>
        <Info
          name="Users"
          data={this.state.data}
          columns={this.addColumnElements(columns, this.state.hidden)}
          checkHidden={this.checkHidden}
        />
        );
      </div>
    );
  }
}

export const Users = compose(
  graphql(filterUsers,
    {
      name:    'filterData',
      options: (props) => {
        // console.log(props);
        const userID = props.location.state === undefined ? [] : props.location.state.data;
        return { variables: { userID } };
      },
    },
  ),
  graphql(fetchUsers, { name: 'fetchData' }))(UsersItem);
