import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router';
import * as query from '../queries/mainFetching';

class HomeItem extends Component {
  render() {
    return (
      <div>
        Welcome to the Website!<br />
        <Link
          to={{ pathname: '/Marketers' }}
        >
          Marketers
        </Link>
        <br />
        <Link
          to={{ pathname: '/Users' }}
        >
          Users
        </Link>
        <br />
        <Link
          to={{ pathname: '/ChannelAccounts' }}
        >
          Channel Accounts
        </Link>
        <br />
        <Link
          to={{ pathname: '/SharedFiles' }}
        >
          Shared Files
        </Link>
        <br />
        <Link
          to={{ pathname: '/Companies' }}
        >
          Companies
        </Link>
        <br />
        <Link
          to={{ pathname: '/Campaigns' }}
        >
          Campaigns
        </Link>
        <br />
        <Link
          to={{ pathname: '/CampaignContestants' }}
        >
          Campaign Contestants
        </Link>
        <br />
      </div>
    );
  }
}

export const Home = HomeItem;
