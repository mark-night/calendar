'use strict';

const config = require('./config');
const server = require('./server');

const startServer = async () => {
  try {
    const app = await server({ host: config.host, port: config.port });
    await app.start();
    console.log(`Server running at http://${config.host}:${config.port}`);
  } catch (err) {
    console.log('Startup error: ', err);
  }
};

startServer();
