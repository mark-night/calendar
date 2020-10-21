'use strict';

const inert = require('@hapi/inert');
const vision = require('@hapi/vision');

const sql = require('./sql');
const auth = require('./auth');

module.exports = [auth, inert, vision, sql];
