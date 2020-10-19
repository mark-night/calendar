'use strict';

const api = require('./api');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: async (req, h) => 'Welcome to Hapi Server!',
  },
  ...api,
];
