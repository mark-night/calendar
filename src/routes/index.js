'use strict';

module.exports.register = async server => {
  server.route({
    method: 'GET',
    path: '/',
    handler: async (req, h) => 'Welcome to Hapi Server!',
  });
};
