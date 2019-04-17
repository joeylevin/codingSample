import { schema } from './data/schema';
import { mockServer } from 'graphql-tools';

const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');


const app = express();

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
