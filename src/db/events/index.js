'use strict';

const { loadSqlQueries } = require('../utils');

const register = async query => {
  const queries = await loadSqlQueries('events');

  const getEvents = async userId => await query(queries.getEvents, [userId]);

  const addEvent = async (
    userId,
    title,
    description,
    startDate,
    startTime,
    endDate,
    endTime
  ) =>
    await query(queries.addEvent, [
      userId,
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
    ]);

  const updateEvent = async (
    id,
    userId,
    title,
    description,
    startDate,
    startTime,
    endDate,
    endTime
  ) =>
    await query(queries.updateEvent, [
      id,
      userId,
      title,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
    ]);

  const deleteEvent = async (id, userId) =>
    await query(queries.deleteEvent, [id, userId]);

  return { getEvents, addEvent, updateEvent, deleteEvent };
};

module.exports = { register };

/* NOTICE FOR WRITING SQL TEXT
SQL is case insensitive, unlike standard SQL, which converts names to uppercase,
PostgreSQL always converts names to lowercase. To keep uppercase in a name, the
name needed to be quoted with double quotes.
In short, either always double quote names (recommended), or never double quote
them (that is, names are same after lowercased).
NOTICE:
pgAdmin always quote names for identifiers created with it, either via GUI menu
commands or via it's query tool.
*/
