'use strict';

const db = require('../db');

module.exports = {
  name: 'sql',
  register: async server => {
    const events = await db.events;
    server.expose('events', events);
  },
};
