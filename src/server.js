'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const plugins = require('./plugins');

module.exports = async config => {
  const server = Hapi.server({ host: config.host, port: config.port });

  // save later-needed data to the server instance
  // server.app is a pre-defined server instance property, which is intended as
  // a slot for exposing runtime data
  server.app.config = config;

  // register plugins (like mounting middlewares in express)
  await server.register(plugins);

  // mount routes
  await server.route(routes);

  return server;
};
