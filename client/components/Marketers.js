import React from 'react';
import { graphql, compose } from 'react-apollo';
// import 'react-table/react-table.css';
import { fetchMarketers } from '../queries/mainFetching';
import { filterMarketers } from '../queries/mainFilters';
import { Info } from './Info';
import { Base } from './Base';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MarketersItem extends Base {
  constructor(props) {
    super(props);
    console.log('init', props);
    this.checkHidden = this.checkHidden.bind(this);
    this.state = this.updateData(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.updateData(nextProps));
  }

  updateData(props) {
    return this.updateDataHelper(props, props.filterData.marketers, props.fetchData.marketers);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const columns = [
      {
        id: 'displayImageUrl',
      }, {
        id: 'name',
      }, {
        id: 'uuid',
      }, {
        id: 'description',
      }, {
        id: 'mockEntity',
      }, {
        id: 'approved',
      }, {
        id: 'facebookBusinessManagerId',
      }, {
        id: 'facebookIntegrationUser',
      }, {
        Header:  'Marketer Profile',
        columns: [{
          id: 'employeeCount',
        }, {
          id: 'monthlyAdSpendManaged',
        }, {
          id: 'email',
        }, {
          id: 'channelExpertise',
        },
        ],
      }, {
        id: 'created',
      }, {
        id: 'modified',
      }, {
        id: 'performance',
      }, {
        id: 'users',
      }, {
        id: 'channelAccounts',
      }, {
        id: 'campaignContestants',
      },
    ];

    return (
      <div className="table-wrap">
        <Info
          name="Marketers"
          data={this.state.data}
          columns={this.addColumnElements(columns, this.state.hidden)}
          checkHidden={this.checkHidden}
        />
      </div>
    );
  }
}

export const Marketers = compose(
  graphql(filterMarketers,
    {
      name:    'filterData',
      options: (props) => {
        const userID = props.location.state === undefined ? [] : props.location.state.data;
        return { variables: { userID } };
      },
    },
  ),
  graphql(fetchMarketers, { name: 'fetchData' }))(MarketersItem);
