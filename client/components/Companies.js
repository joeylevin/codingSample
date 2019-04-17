import React from 'react';
import { graphql, compose } from 'react-apollo';
import 'react-table/react-table.css';

import { fetchCompanies } from '../queries/mainFetching';
import { filterCompanies } from '../queries/mainFilters';
import { Info } from './Info';
import { Base } from './Base';

class CompaniesItem extends Base {
  constructor(props) {
    super(props);
    console.log(props);
    this.checkHidden = this.checkHidden.bind(this);
    this.state = this.updateData(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('updating');
    console.log(nextProps);
    this.setState(this.updateData(nextProps));
  }

  updateData(props) {
    return this.updateDataHelper(props, props.filterData.companies, props.fetchData.companies);
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
        id: 'id',
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
        Header:  'Company Profile',
        columns: [{
          id: 'employeeCount',
        }, {
          id: 'monthlyAdSpend',
        }, {
          id: 'contactDetails',
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
        id: 'campaigns',
      },
    ];

    return (
      <div className="table-wrap">
        <Info
          name="Companies"
          data={this.state.data}
          columns={this.addColumnElements(columns, this.state.hidden)}
          checkHidden={this.checkHidden}
        />
      </div>
    );
  }
}

export const Companies = compose(
  graphql(filterCompanies,
    {
      name:    'filterData',
      options: (props) => {
        // console.log(props);
        const userID = props.location.state === undefined ? [] : props.location.state.data;
        return { variables: { userID } };
      },
    },
  ),
  graphql(fetchCompanies, { name: 'fetchData' }))(CompaniesItem);
