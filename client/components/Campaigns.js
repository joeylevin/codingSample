import React from 'react';
import { graphql, compose } from 'react-apollo';
// import 'react-table/react-table.css';
import { fetchCampaigns } from '../queries/mainFetching';
import { filterCampaigns } from '../queries/mainFilters';
import { Info } from './Info';
import { Base } from './Base';

class CampaignsItem extends Base {
  constructor(props) {
    super(props);
    console.log(props);
    this.checkHidden = this.checkHidden.bind(this);
    this.state = this.updateData(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('updating');
    this.setState(this.updateData(nextProps));
  }

  updateData(props) {
    return this.updateDataHelper(props, props.filterData.campaigns, props.fetchData.campaigns);
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    console.log('loaded', this.state);
    const columns = [
      {
        id: 'displayImageUrl',
      }, {
        id: 'displayName',
      }, {
        id: 'uuid',
      }, {
        id: 'description',
      }, {
        id: 'mockEntity',
      }, {
        id: 'approved',
      }, {
        id: 'company',
      }, {
        id: 'automaticStartDate',
      }, {
        id: 'automaticEndDate',
      }, {
        id: 'campaignStatus',
      }, {
        id: 'created',
      }, {
        id: 'modified',
      }, {
        id: 'channelType',
      }, {
        id: 'targetUrl',
      }, {
        id: 'competitionDuration',
      }, {
        id: 'competitionBudget',
      }, {
        id: 'initialContestantCount',
      }, {
        id: 'targetContestantCount',
      }, {
        id: 'campaignBudget',
      }, {
        id: 'marketerMatching',
      }, {
        id: 'targetKPI',
      }, {
        Header:  'Details',
        columns: [{
          id: 'industry',
        }, {
          Header:  'Limitations',
          columns: [{
            id: 'platforms',
          }, {
            id: 'locations',
          }, {
            id: 'languages',
          }, {
            id: 'audiences',
          }],
        }, {
          id: 'campaignGoals',
        }, {
          id: 'audienceTags',
        }, {
          id: 'negativeKeywords',
        }, {
          id: 'positiveKeywords',
        }, {
          id: 'ownKeywords',
        }, {
          id: 'campaignBrief',
        }, {
          id: 'marketingLines',
        }, {
          id: 'creativeApproval',
        }, {
          id: 'creativesText',
        }, {
          id: 'accomplishTarget',
        }, {
          id: 'primaryObjective',
        }, {
          id: 'compellingFeature',
        }, {
          id: 'describingAdjectives',
        }, {
          id: 'stylisticGuidelines',
        }, {
          id: 'anythingElse',
        },
        ],
      }, {
        id: 'created',
      }, {
        id: 'modified',
      }, {
        id: 'marketerCampaignInvitation',
      }, {
        // accessor: (d) => {
        //   return (d.integrationSettings.instructions);
        // },
        id: 'integrationSettings',
      }, {
        id: 'performance',
      }, {
        id: 'sharedFiles',
      }, {
        id: 'campaignContestants',
      },
    ];

    return (
      <div>
        <Info
          name="Campaigns"
          data={this.state.data}
          columns={this.addColumnElements(columns, this.state.hidden)}
          checkHidden={this.checkHidden}
        />
      </div>
    );
  }
}

export const Campaigns = compose(
  graphql(filterCampaigns,
    {
      name:    'filterData',
      options: (props) => {
        // console.log(props);
        const userID = props.location.state === undefined ? [] : props.location.state.data;
        return { variables: { userID } };
      },
    },
  ),
  graphql(fetchCampaigns, { name: 'fetchData' }))(CampaignsItem);
