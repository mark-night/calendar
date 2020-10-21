'use strict';

const boom = require('@hapi/boom');

const getEvents = {
  method: 'GET',
  path: '/api/events',
  options: {
    auth: { mode: 'try' },
  },
  handler: async req => {
    if (!req.auth.isAuthenticated) {
      return boom.unauthorized();
    }
    try {
      const events = req.server.plugins.sql.events;
      const userId = req.auth.credentials.profile.id;
      const res = await events.getEvents(userId);
      return res.rows;
    } catch (error) {
      console.log('Failed getting events: ', error);
    }
  },
};

const addEvent = {
  method: 'POST',
  path: '/api/events',
  options: {
    auth: { mode: 'try' },
  },
  handler: async req => {
    if (!req.auth.isAuthenticated) {
      return boom.unauthorized();
    }
    try {
      const events = req.server.plugins.sql.events;
      const {
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
      } = req.payload;
      const userId = req.auth.credentials.profile.id;
      const res = await events.addEvent(
        userId,
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime
      );
      return res.rows;
    } catch (error) {
      console.log('Failed adding event: ', error);
      return boom.boomify(error);
    }
  },
};

const deleteEvent = {
  method: 'DELETE',
  path: '/api/events/{id}',
  options: {
    auth: { mode: 'try' },
  },
  handler: async (req, h) => {
    if (!req.auth.isAuthenticated) {
      return boom.unauthorized();
    }
    try {
      const events = req.server.plugins.sql.events;
      const id = req.params.id;
      const userId = req.auth.credentials.profile.id;
      const res = await events.deleteEvent(id, userId);
      return res.rowCount === 1 ? h.response().code(204) : boom.notFound();
    } catch (error) {
      console.log('Failed deleting event: ', error);
      return boom.boomify(error);
    }
  },
};

const updateEvent = {
  method: 'PATCH',
  path: '/api/events/{id}',
  options: {
    auth: { mode: 'try' },
  },
  handler: async req => {
    if (!req.auth.isAuthenticated) {
      return boom.unauthorized();
    }
    try {
      const events = req.server.plugins.sql.events;
      const id = req.params.id;
      const {
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime,
      } = req.payload;
      const userId = req.auth.credentials.profile.id;
      const res = await events.updateEvent(
        id,
        userId,
        title,
        description,
        startDate,
        startTime,
        endDate,
        endTime
      );
      return res.rows;
    } catch (error) {
      console.log('Failed updating event: ', error);
      return boom.boomify(error);
    }
  },
};

module.exports = [getEvents, addEvent, deleteEvent, updateEvent];
