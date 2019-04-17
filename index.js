const app = require('./server/server');
require('babel-core/register');
require('babel-polyfill');

app.listen(4000, () => {
  console.log('Listening');
});
