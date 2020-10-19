'use strict';

const { Pool } = require('pg');
const { sqlConfig } = require('../config');
const events = require('./events');

let pool = null;
const createPool = () => {
  if (!pool) {
    pool = new Pool(sqlConfig);
    pool.on('error', (error, client) => {
      console.log('Unexpected error on idle client.\n', {
        client: client.name || client,
        error,
      });
    });
    console.log('Pool is ready.');
  } else {
    console.log('Reusing existing pool.');
  }
};
createPool();

const closePool = async (recreate = false) => {
  try {
    await pool.end();
    pool = null;
    console.log('Pool closed successfully.');
  } catch (err) {
    console.log('Unexpected error on closing pool.', err);
    // console.log('Terminating node process.');
    // process.exit(-1);
  }
  if (recreate) createPool();
};

const query = async (text, params) => {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Queried ${res.rowCount} rows in ${duration}ms.`);
    return res;
  } catch (error) {
    console.log('Error executing query.', { text, error });
  }
};

const getClient = async () => {
  try {
    const client = await pool.connect();
    // Track the client, if it doesn't return back (release) after 5
    // seconds, release it to prevent leak.
    // https://node-postgres.com/guides/project-structure
    const query = client.query;
    const release = client.release;
    const timeout = setTimeout(() => {
      console.log(
        `A client has been checked out for more than 5 seconds! The last query executed: ${client.lastQuery}`
      );
      client.release();
      console.log('Released the client from server side.');
    }, 5000);
    client.query = (...args) => {
      // record "last" query
      client.lastQuery = args;
      return query.apply(client, args);
    };
    client.release = () => {
      // cleanup on client release
      clearTimeout(timeout);
      client.query = query;
      client.release = release;
      return release.apply(client);
    };
    return client;
  } catch (error) {
    console.log('Error getting client from pool.', error);
  }
};

module.exports = {
  events: events.register(query),
};
