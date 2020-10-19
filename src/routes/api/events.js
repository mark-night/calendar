'use strict';

module.exports = {
  method: 'GET',
  path: '/api/events',
  handler: async req => {
    try {
      const events = req.server.plugins.sql.events;
      const userId = 'user1234';
      const res = await events.getEvents(userId);
      return res.rows;
    } catch (error) {
      console.log('Failed fetching from /api/events', error);
    }
  },
};
