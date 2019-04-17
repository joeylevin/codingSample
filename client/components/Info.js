import React, { Component } from 'react';
import ReactTable from 'react-table';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';


export const Headers = {
  accomplishTarget:           'Accomplish Target',
  anythingElse:               'anythingElse',
  approved:                   'Approved?',
  audiences:                  'Audiences',
  audienceTags:               'Audience Tags',
  automaticEndDate:           'End Date',
  automaticStartDate:         'Start Date',
  campaign:                   'Campaign',
  campaignBrief:              'Campaign Brief',
  campaignBudget:             'Campaign Budget',
  campaignContestant:         'Campaign Contestant',
  campaignContestants:        'Campaign Contestants',
  campaignGoals:              'Campaign Goals',
  campaigns:                  'Campaigns',
  campaignStatus:             'Campaign Status',
  channelAccounts:            'Channel Accounts',
  channelExpertise:           'Channel Expertise',
  channelType:                'Channel Type',
  companies:                  'Companies',
  company:                    'Company',
  compellingFeature:          'compellingFeature',
  competitionBudget:          'Competition Budget',
  competitionDuration:        'Competition Duration',
  contactDetails:             'Contact',
  created:                    'Created',
  creatingUser:               'Creator',
  creativeApproval:           'Creative Approval',
  creativesText:              'Creatives Text',
  describingAdjectives:       'describingAdjectives',
  description:                'Description',
  displayImageUrl:            'Image',
  displayName:                'Name',
  email:                      'Contact',
  emailAddress:               'Email Address',
  employeeCount:              'Employee Count',
  facebookBusinessManagerId:  'Facebook Business Manager ID',
  facebookIntegrationUser:    'Facebook Integration User',
  id:                         'ID',
  industry:                   'Industry',
  initialContestantCount:     'Initial Count',
  integrationSettings:        'Integration Settings',
  languages:                  'Languages',
  locale:                     'Locale',
  locations:                  'Locations',
  marketer:                   'Marketer',
  marketerMatching:           'Marketer Matching',
  marketerCampaignInvitation: 'Marketer Invitation',
  marketers:                  'Marketers',
  marketingLines:             'Marketing Lines',
  mimetype:                   'MimeType',
  mockEntity:                 'Mock?',
  modified:                   'Modified',
  monthlyAdSpend:             'Monthly Ad Spending',
  monthlyAdSpendManaged:      'Monthly Ad Spending',
  name:                       'Name',
  negativeKeywords:           'Negative Keywords',
  ownKeywords:                'Own Keywords',
  performance:                'Performance',
  platforms:                  'Platforms',
  positiveKeywords:           'Positive Keywords',
  primaryObjective:           'Primary Objective',
  sharedFiles:                'Shared Files',
  size:                       'Size',
  stylisticGuidelines:        'stylisticGuidelines',
  targetContestantCount:      'Target Contestant Count',
  targetKPI:                  'Target KPI',
  targetUrl:                  'Target URL',
  timezone:                   'Timezone',
  users:                      'Users',
  userType:                   'User Type',
  uuid:                       'uuid',
};

class InfoItem extends Component {
  getHeaders(id) {
    if (Headers[id] === undefined) {
      return id;
    } else {
      return Headers[id];
    }
  }

  keyGenerator(val) {
    const array = Object.keys(Headers);
    const temp = array.indexOf(val);
    console.log('temp', temp);
    return temp;
  }

  // Make webpage download the csv file
  downloadCSV(csv, name) {
    console.log('downloading', csv);
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = name;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    console.log(downloadLink);
  }

  cleanString(string) {
    const newString = string.replace(/\n/g, '');
    return newString.replace(/,/g, ' ');
  }

//  csv conversion from https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
  createCSV(name) {
    const csv = [];
    const rowH = [];
    const colsH = document.getElementsByClassName('rt-resizable-header-content');
    console.log(colsH);
    for (let j = 0; j < colsH.length; j++) {
      rowH.push(this.cleanString(colsH[j].innerText));
    }
    csv.push(rowH.join(','));

    const dataRows = document.getElementsByClassName('rt-tr-group');
    for (let i = 0; i < dataRows.length; i += 1) {
      const row = [];
      const cols = dataRows[i].getElementsByClassName('rt-td');
      console.log('cols', cols);
      for (let j = 0; j < cols.length; j += 1) {
        row.push(this.cleanString(cols[j].innerText));
      }
      console.log('row', row);
      csv.push(row.join(','));
    }
    console.log('csv', csv);
    // Download CSV file
    this.downloadCSV(csv.join('\n'), name);
  }

  render() {
    console.log('info', this.props);
    return (
      <div>
        <h1>{this.props.name}</h1>
        <DropdownButton title="Hide/Show Columns" id="bg-nested-dropdown">
          {this.props.columns.map((val) => {
            return (
              <form>
                {this.getHeaders([val.accessor])}
                <input
                  type="checkbox"
                  defaultChecked
                  onClick={(e) => {
                    console.log('clicked', e.target, this.props);
                    this.props.checkHidden(e.target.value);
                  }}
                  value={this.getHeaders([val.accessor])}
                >
                </input>
              </form>
            );
          })}
        </DropdownButton>
        <div style={{ textAlign: 'center' }}>
          <br />
          <em>Hold shift when sorting to multi-sort</em>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log('clicked');
              this.createCSV(this.props.name);
            }}
          >Download as CSV
          </button>
        </div>
        <ReactTable
          data={this.props.data}
          columns={this.props.columns}
          showPagination={false}
        />
      </div>
    );
  }
}

export const Info = InfoItem;
