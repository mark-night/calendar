'use strict';

const api = require('./api');
const auth = require('./auth');
const { appURL } = require('../config');

module.exports = [
  ...auth,
  ...api,
  {
    // for homepage
    method: 'GET',
    path: '/',
    handler: async (req, h) =>
      h.view('index', {
        title: 'Personal Calendar',
        message: 'Welcome!',
        appURL,
      }),
    options: {
      auth: { mode: 'try' },
    },
  },
  {
    // serve static files
    method: 'GET',
    path: '/{param*}',
    handler: {
      // any requests to unmatched routes will be served with static files
      // found in 'dist'
      directory: {
        path: 'dist',
      },
    },
    options: { auth: false },
  },
];
