'use strict';

const bell = require('@hapi/bell'); // oAuth plugin
const cookie = require('@hapi/cookie'); // session cookie plugin

// intend to indicate if served over SSL, assuming true if in production mode
const isSecure = process.env.NODE_ENV === 'production';

module.exports = {
  name: 'auth',
  register: async server => {
    await server.register([bell, cookie]);
    const config = server.app.config;

    // auth strategy to use session contained authentication
    server.auth.strategy(
      'session', // strategy name
      'cookie', // scheme name
      {
        cookie: {
          name: 'okta-oauth',
          path: '/',
          password: config.cookieSecret,
          isSecure,
        },
        redirectTo: '/auth/callback',
      }
    );

    // strategy to use okta provided authentication
    server.auth.strategy('okta', 'bell', {
      provider: 'okta',
      config: { uri: config.okta.url },
      password: config.cookieSecret,
      isSecure,
      location: config.url,
      clientId: config.okta.clientId,
      clientSecret: config.okta.clientSecret,
    });

    // default to use session strategy (assuming logged in and check in
    // session cookie for authentication)
    server.auth.default('session');

    server.ext('onPreResponse', (req, h) => {
      if (req.response.variety === 'view') {
        // check authentication status and save info to request, to make
        // authentication info available in server side rendered views
        req.response.source.context.auth = req.auth.isAuthenticated
          ? {
              isAuthenticated: true,
              isAnonymous: false,
              email: req.auth.artifacts.profile.email,
              nickName: req.auth.artifacts.profile.nickName,
            }
          : {
              isAuthenticated: false,
              isAnonymous: true,
              email: '',
              nickName: '',
            };
      }
      return h.continue;
    });
  },
};
