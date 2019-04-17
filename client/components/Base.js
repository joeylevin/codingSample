import React, { Component } from 'react';
import { Link } from 'react-router';
import Avatar from '@material-ui/core/Avatar';

import { Headers } from './Info';

class BaseItem extends Component {
  // Static Functions
  // Take in a set of data and output the Names that correspond to that data
  // This is used to generate a list that appears where there a links to another page
  constructor(props) {
    super(props);
    console.log(props);
    this.state = this.updateData(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('updating');
    this.setState(this.updateData(nextProps));
  }
  getNames(d) {
    const cellValues = (d.value.length === undefined ? [d.value] : d.value);
    console.log('getting names', d, cellValues);
    let names = '';
    for (let i = 0; i < cellValues.length; i += 1) {
      if (i !== 0) {
        names += '\n ';
      }
      const curVal = cellValues[i];
      // console.log('curval', curVal);
      if (curVal.displayName !== undefined) {
        names += curVal.displayName;
      } else if (curVal.name !== undefined) {
        names += curVal.name;
      } else if (curVal.marketer !== undefined) {
        names += curVal.marketer.name;
      } else if (curVal.campaign !== undefined) {
        names += curVal.campaign.name;
      } else {
        names += 'unknown name';
      }
    }
    return names;
  }
  // Create array of all the ids you are going to use to filter in the next page
  getValues(d) {
    const cellValues = d.value;
    const vars = [];
    if (cellValues.length === undefined) {
      return cellValues.uuid;
    }
    for (let i = 0; i < cellValues.length; i += 1) {
      vars.push(cellValues[i].uuid);
    }
    return vars;
  }
  getHeaders(id) {
    // id 1st element, header 2nd element
    if (Headers[id] === undefined) {
      return id;
    } else {
      return Headers[id];
    }
  }

// Convert FROM things to more user readable
  removeFrom(data) {
    console.log("testing", data);
    if (data === 'UNKNOWN') {
      return (<div>Unknown</div>);
    }
    const newData = data.substring(5, data.lenghth);
    const fromIndex = newData.indexOf('_TO_');
    if (fromIndex === -1) {
      const orIndex = newData.indexOf('_OR_');
      return (<div>{newData.substring(0, orIndex)}</div>);
    }
    return (<div>{newData.substring(0, fromIndex)} to {newData.substring(fromIndex + 4, newData.lenghth)}</div>);
  }

  // Convert from boolean to Yes/no
  truthCheck(data) {
    if (data.value) {
      return (
        <div>Yes</div>
      );
    } else {
      return (
        <div>No</div>
      );
    }
  }

  // Convert Admin constants to readable text
  convertUser(data) {
    switch (data.value) {
      case 'ADMIN_USER':
        return (
          <div>Admin</div>
        );
      case 'SUPPORT_USER':
        return (
          <div>Support</div>
        );
      case 'NORMAL_USER':
        return (
          <div>Normal</div>
        );
      default:
        return (
          <div>Other</div>
        );
    }
  }

  // Convert date to user's time and readable
  convertDate(oldDate) {
    const date = new Date(oldDate);
    return (
      <div>{date.toLocaleDateString()}
        <br />
        {date.toLocaleTimeString()}
      </div>
    );
  }

  updateDataHelper(props, filterData, fetchData) {
    let data = [];
    let loading = false;
    if (props.filterData.variables.userID[0] !== undefined) {
      // If previous screen passed a list of data to search for, filter that out
      console.log('filter', props);
      data = filterData;
      loading = props.filterData.loading;
    } else {
      // Search for all data
      console.log('regular', props);
      data = fetchData;
      loading = props.fetchData.loading;
    }
    console.log('updated', data, loading);
    return { data, loading, hidden: [] };
  }

  createPathname(string) {
    switch (string) {
      case 'Company':
        return 'Companies';
      case 'SharedFile':
        return 'SharedFiles';
      case 'User':
      case 'Creator':
        return 'Users';
      case 'ChannelAccount':
        return 'ChannelAccounts';
      case 'Campaign':
        return 'Campaigns';
      case 'CampaignContestant':
        return 'CampaignContestants';
      case 'MarketerCampaignInvitation':
      case 'Marketer':
        return 'Marketers';
      default:
        return string.replace(/ /g, '');
    }
  }

  contains(array, string) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === this.getHeaders([string])) {
        return true;
      }
    }
    return false;
  }

  checkHidden(val) {
    // console.log('checking hidden', this.state.hidden, val);
    if (this.state.hidden.includes(val)) {
      this.removeHidden(val);
    } else {
      this.addHidden(val);
    }
  }

  // add element to hidden state
  addHidden(val) {
    this.setState({ hidden: [...this.state.hidden, val] });
  }

  // Remove element from hidden state
  removeHidden(val) {
    // console.log('hiding', this);
    this.setState({ hidden: this.remove(this.state.hidden, val) });
  }

  // remove the string from the array
  remove(array, string) {
    const ret = [];
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] !== string) {
        ret.push(array[i]);
      }
    }
    // console.log('removed', ret);
    return ret;
  }

  searchFor(filter, row) {
    let term = row[filter.id];
    if (Number.isInteger(term)) {
      term = row[filter.id].toString();
    }
    return term.search(filter.value) > -1;
  }

  // Use filter to check if the current row matches
  booleanFilter(filter, row) {
    if (filter.value === 'All') {
      return true;
    } else {
      return filter.value === row[filter.id].toString();
    }
  }

  // Cells
  // Dropdown for Mock/Approved Boolean
  booleanFilterCell(type, filter, onChange) {
    let title = '';
    if (type === 'mockEntity') {
      title = 'Mock';
    } else {
      title = 'Approved';
    }
    const opposite = { Mock: 'Real', Approved: 'Not Approved' };
    // console.log('selecting', opposite[title]);
    return (
      <select
        onChange={(event) => {
          onChange(event.target.value);
        }}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="All" />
        <option value="true">{title}</option>
        <option value="false">{opposite[title]}</option>
      </select>
    );
  }

  //Cell with a link to another page
  linkCell(d, name) {
    const vars = this.getValues(d);
    const names = this.getNames(d);
    // console.log('linking', d, vars, names, name);
    if (d.value === undefined) {
      return (
        <div>No {name}</div>
      );
    } else {
      return (
        <div>
          <Link
            to={{ pathname: `/${this.createPathname(name)}`, state: { data: vars, fullData: false } }}
            onClick={() => {
              console.log('clicked', this.state);
            }}
          >
            {names}
          </Link>
        </div>
      );
    }
  }

  //cell with an avatar image
  imageCell(val) {
    return (
      <div>
        <Avatar src={val} />
      </div>
    );
  }

  //Add the column elements
  addColumnElements(columns, hidden) {
    console.log('adding');
    const returnColumns = columns;
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i].Header !== undefined) {
        console.log('adding internal 1', columns[i]);
        returnColumns[i].columns = this.addColumnElements(columns[i].columns, hidden);
        console.log('adding internal 2', returnColumns[i]);
      } else {
        console.log('adding', i, columns[i]);
        returnColumns[i] = this.addColumnElementsHelper(columns[i], hidden);
        // console.log('adding col', i, returnColumns[i]);
      }
    }
    console.log('finished', returnColumns);
    return returnColumns;
  }

  addColumnElementsHelper(column, hidden) {
    const id = column.id;
    let ret = {};
    ret = {
      ...column,
      show:   !this.contains(hidden, id),
      Header: this.getHeaders([id]),
    };

    switch (id) {
      case 'displayImageUrl':
        ret = {
          ...ret,
          Cell:      (d) => {
            return this.imageCell(d.value);
          },
          className: 'image',
        };
        break;
      case 'name':
        ret = {
          ...ret,
          Cell: (d) => {
            return (
              <div>
                <a href={d.original.url}>
                  {d.value}
                </a>
              </div>
            );
          },
        };
        break;
      case 'displayName':
      case 'uuid':
      case 'id':
      case 'description':
        ret = {
          ...ret,
          filterMethod: (filter, row) => {
            return this.searchFor(filter, row);
          },
          filterable:   true,
        };
        break;
      case 'userType':
        ret = {
          ...ret,
          Cell: (d) => {
            return this.convertUser(d);
          },
        };
        break;
      case 'mockEntity':
      case 'approved':
        ret = {
          ...ret,
          Cell:         (d) => {
            return this.truthCheck(d);
          },
          filterMethod: (filter, row) => {
            return this.booleanFilter(filter, row);
          },
          filterable:   true,
          Filter:       ({ filter, onChange }) => {
            return this.booleanFilterCell(column.id, filter, onChange);
          },
        };
        break;
      case 'created':
      case 'modified':
      case 'automaticStartDate':
      case 'automaticEndDate':
        ret = {
          ...ret,
          Cell: (d) => {
            return this.convertDate(d.value);
          },
        };
        break;
      case 'marketers':
      case 'creatingUser':
      case 'companies':
      case 'company':
      case 'sharedFiles':
      case 'users':
      case 'channelAccounts':
      case 'campaign':
      case 'campaigns':
      case 'campaignContestant':
      case 'campaignContestants':
      case 'marketerCampaignInvitation':
      case 'marketer':
        ret = {
          ...ret,
          Cell: (d) => {
            return this.linkCell(d, this.getHeaders([id]));
          },
        };
        break;
      case 'facebookIntegrationUser':
        ret = {
          ...ret,
          Cell: (d) => {
            const user = d.value;
            if (user !== undefined) {
              return (
                <div>
                  <a href={user.linkUrl}>
                    {user.name}
                  </a>
                </div>
              );
            } else {
              return (<div />);
            }
          },
        };
        break;
      case 'performance':
        ret = {
          ...ret,
          accessor: (d) => {
            return (JSON.stringify(d.performance.aggregated));
          },
        };
        break;
      case 'employeeCount':
      case 'monthlyAdSpendManaged':
      case 'monthlyAdSpend':
        ret = {
          ...ret,
          Cell:     (d) => {
            return this.removeFrom(d.value);
          },
          accessor: (d) => {
            if (d.marketerProfile !== undefined) {
              return d.marketerProfile[id];
            } else {
              return d.companyProfile[id];
            }
          },
        };
        break;
      case 'email':
        ret = {
          ...ret,
          accessor: (d) => {
            if (d.marketerProfile !== undefined) {
              return d.marketerProfile.contactDetails.emailAddress;
            } else {
              return d.companyProfile.contactDetails.emailAddress;
            }
          },
        };
        break;
      case 'channelExpertise':
        ret = {
          ...ret,
          accessor: (d) => {
            return d.marketerProfile.channelExpertise.googleAdWords;
          },
        };
        break;
      case 'integrationSettings':
        ret = {
          ...ret,
          accessor: (d) => {
            const val = d.integrationSettings;
            return ([val.adAccountText, val.adAccountUrl, val.adAccountId]);
          },
          Cell:     (d) => {
            return (
              <div>
                {d.value[2]}:<br />
                <a href={d.value[1]}>
                  {d.value[0]}
                </a>
              </div>
            );
          },
        };
        break;
      case 'industry':
      case 'audienceTags':
      case 'negativeKeywords':
      case 'positiveKeywords':
      case 'ownKeywords':
      case 'campaignBrief':
      case 'marketingLines':
      case 'creativeApproval':
      case 'creativesText':
      case 'accomplishTarget':
      case 'primaryObjective':
      case 'compellingFeature':
      case 'describingAdjectives':
      case 'stylisticGuidelines':
      case 'anythingElse':
        ret = {
          ...ret,
          accessor: (d) => {
            return (d.details[id]);
          },
        };
        break;
      case 'platforms':
      case 'locations':
      case 'languages':
        ret = {
          ...ret,
          accessor: (d) => {
            return (d.details.limitations[id]);
          },
        };
        break;
      case 'audiences':
        ret = {
          ...ret,
          accessor: (d) => {
            return (`${d.details.limitations.audiences.ageRanges}, ${d.details.limitations.audiences.genders}`);
          },
        };
        break;
      case 'campaignGoals':
        ret = {
          ...ret,
          accessor: (d) => {
            return (d.details.campaignGoals[0]);
          },
        };
        break;
      default:
        break;
    }
    if (ret.accessor === undefined) {
      ret = {
        ...ret,
        accessor: id,
      };
    }
    return ret;
  }
}

export const Base = BaseItem;
