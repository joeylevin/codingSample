import React  from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
// import 'react-table/react-table.css';
import { fetchChannelAccounts } from '../queries/Full-Fetch/fetchChannelAccounts';
import { filterChannelAccounts } from '../queries/mainFilters';
import { Info } from './Info';
import { Base } from './Base';

class ChannelAccountsItem extends Base {
  constructor(props) {
    super(props);
    // console.log(props);
    this.checkHidden = this.checkHidden.bind(this);
    this.state = this.updateData(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('updating');
    this.setState(this.updateData(nextProps));
  }

  updateData(props) {
    return this.updateDataHelper(props, props.filterData.channelAccounts, props.fetchData.channelAccounts);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const columns = [
      {
        id: 'name',
      }, {
        id: 'description',
      }, {
        id: 'uuid',
      }, {
        id: 'id',
      }, {
        id: 'creatingUser',
      }, {
        id: 'channelType',
      }, {
        id: 'created',
      }, {
        id: 'modified',
      }, {
        id: 'integrationSettings',
      }, {
        id: 'performance',
      },
    ];

    return (
      <div className="table-wrap">
        <Info
          name="Channel Accounts"
          data={this.state.data}
          columns={this.addColumnElements(columns, this.state.hidden)}
          checkHidden={this.checkHidden}
        />
      </div>
    );
  }
}

export const ChannelAccounts = compose(
  graphql(filterChannelAccounts,
    {
      name:    'filterData',
      options: (props) => {
        // console.log(props);
        const userID = props.location.state === undefined ? [] : props.location.state.data;
        return { variables: { userID } };
      },
    },
  ),
  graphql(fetchChannelAccounts, { name: 'fetchData' }))(ChannelAccountsItem);
