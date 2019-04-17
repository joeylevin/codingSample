import React  from 'react';
import { graphql, compose } from 'react-apollo';

// import 'react-table/react-table.css';
import { fetchSharedFiles } from '../queries/Full-Fetch/fetchSharedFiles';
import { filterSharedFiles } from '../queries/mainFilters';
import { Info } from './Info';
import { Base } from './Base';

class SharedFileItem extends Base {
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
    return this.updateDataHelper(props, props.filterData.sharedFiles, props.fetchData.sharedFiles);
  }

  render() {
    console.log('state', this.state);
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
        id: 'campaign',
      }, {
        id: 'campaignContestant',
      }, {
        id: 'mimetype',
      }, {
        id: 'size',
      }, {
        id: 'created',
      },
    ];

    return (
      <div className="table-wrap">
        <Info
          name="Shared Files"
          data={this.state.data}
          columns={this.addColumnElements(columns, this.state.hidden)}
          checkHidden={this.checkHidden}
        />
      </div>
    );
  }
}

export const SharedFiles = compose(
  graphql(filterSharedFiles,
    {
      name:    'filterData',
      options: (props) => {
        const userID = props.location.state === undefined ? [] : props.location.state.data;
        return { variables: { userID } };
      },
    }
  ),
  graphql(fetchSharedFiles, { name: 'fetchData' }))(SharedFileItem);

