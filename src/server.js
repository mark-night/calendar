'use strict';

const Hapi = require('@hapi/hapi');
const ejs = require('ejs');
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

  // define view engine to use
  // must be set after plugin Vision (which is the template rendering support
  // for Hapi) is registered
  server.views({
    engines: { ejs },
    relativeTo: __dirname,
    path: 'templates',
    layout: true,
  });

  // mount routes
  await server.route(routes);

  return server;
};
