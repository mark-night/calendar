const dotenv = require('dotenv');
dotenv.config();

const {
  HOST,
  PORT,
  HOST_URL,
  DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_URL,
  COOKIE_SECRET,
  OKTA_ORG_URL,
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,
} = process.env;

module.exports = {
  host: HOST,
  port: PORT,
  url: HOST_URL,
  cookieSecret: COOKIE_SECRET,
  sqlConfig: {
    host: DB_HOST,
    port: DB_PORT,
    database: DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  okta: {
    url: OKTA_ORG_URL,
    clientId: OKTA_CLIENT_ID,
    clientSecret: OKTA_CLIENT_SECRET,
  },
};
