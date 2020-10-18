'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

module.exports = async serverConfig => {
  const server = Hapi.server(serverConfig);

  // save later-needed data to the app
  server.app.config = serverConfig;

  await routes.register(server);

  return server;
};
