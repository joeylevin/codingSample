import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
// import 'react-table/react-table.css';
import App from './components/App';

import { Users } from './components/Users';
import { ChannelAccounts } from './components/ChannelAccounts';
import { Marketers } from './components/Marketers';
import { SharedFiles } from './components/SharedFile';
import { Campaigns } from './components/Campaigns';
import { Companies } from './components/Companies';
import { CampaignContestants } from './components/CampaignContestants';

import { Home } from './components/Home';


const client = new ApolloClient({
  dataIdFromObject: (o) => {
    return (o.id);
  },
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/Home" component={Home} />
          <Route path="/Users" component={Users} />
          <Route path="/ChannelAccounts" component={ChannelAccounts} />
          <Route path="/Marketers" component={Marketers} />
          <Route path="/SharedFiles" component={SharedFiles} />
          <Route path="/Campaigns" component={Campaigns} />
          <Route path="/Companies" component={Companies} />
          <Route path="/CampaignContestants" component={CampaignContestants} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
