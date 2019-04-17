import React from 'react';
import { graphql, compose } from 'react-apollo';

// import 'react-table/react-table.css';
import { fetchCampaignContestants } from '../queries/mainFetching';
import { filterCampaignContestants } from '../queries/mainFilters';
import '../style.css';
import { Info } from './Info';
import { Base } from './Base';

class CampaignContestantsItem extends Base {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = this.updateData(props);
    this.checkHidden = this.checkHidden.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('updating');
    this.setState(this.updateData(nextProps));
  }

  updateData(props) {
    return this.updateDataHelper(props, props.filterData.campaignContestants, props.fetchData.campaignContestants);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    console.log('loaded', this.state);
    const columns = [
      {
        id: 'campaign',
      }, {
        id: 'uuid',
      }, {
        id: 'marketer',
      }, {
        id: 'created',

      }, {
        id: 'modified',

      }, {
        id: 'performance',
      }, {
        id: 'sharedFiles',
      }, {
        id: 'channelAccounts',
      },
    ];

    return (
      <div className="table">
        <Info
          name="Campaign Contestants"
          data={this.state.data}
          columns={this.addColumnElements(columns, this.state.hidden)}
          checkHidden={this.checkHidden}
        />
      </div>
    );
  }
}

export const CampaignContestants = compose(
  graphql(filterCampaignContestants,
    {
      name:    'filterData',
      options: (props) => {
        // console.log(props);
        const userID = props.location.state === undefined ? [] : props.location.state.data;
        return { variables: { userID } };
      },
    },
  ),
  graphql(fetchCampaignContestants, { name: 'fetchData' }))(CampaignContestantsItem);
