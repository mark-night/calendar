'use strict';

const boom = require('@hapi/boom');

const login = {
  method: 'GET',
  path: '/login',
  handler: req => {
    if (!req.auth.isAuthenticated) {
      return `Authentication failed due to ${req.auth.error.message}`;
    }
  },
};

const oAuthCallback = {
  method: 'GET',
  path: '/auth/callback',
  handler: (req, h) => {
    if (!req.auth.isAuthenticated) {
      throw boom.unauthorized(
        `Authentication failed: ${req.auth.error.message}`
      );
    }
    // set session cookie if authenticated
    req.cookieAuth.set(req.auth.credentials);
    return h.redirect('/');
  },
  options: { auth: 'okta' },
};

const logout = {
  method: 'GET',
  path: '/logout',
  handler: (req, h) => {
    try {
      if (req.auth.isAuthenticated) {
        req.cookieAuth.clear();
      }
      return h.redirect('/');
    } catch (error) {
      console.log(error);
    }
  },
  options: {
    auth: { mode: 'try' },
  },
};

module.exports = [login, oAuthCallback, logout];
